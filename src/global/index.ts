import { DataConnection, Peer } from "peerjs";
import { nanoid } from 'nanoid';
import multiavatar from '@multiavatar/multiavatar/esm'
import {getDeviceId} from '@plugins'
import {DB, type Profile} from './db'
import { error } from "console";

class Global extends DB {
  static instance: Global;
  #peer?: Peer;
  #profile?: MaybeNull<{p2pId: string; avatar: string}>;
  #peerMap: {[key: string]: {
    state: 'offline'|'active',
    conn: DataConnection
  }}
  constructor() {
    super();

    this.#peerMap = {};
    this.#getPeer();
  }

  async getProfile(): Promise<Profile> {
    if (this.#profile) return this.#profile;
    const p2pId = localStorage.getItem('p2pId')
    if (!p2pId) {
      const p2pId = nanoid(8);
      const svgCode = multiavatar(p2pId);
      const avatar = `data:image/svg+xml;utf8,${encodeURIComponent(svgCode)}`;
      this.#profile = {
        avatar,
        p2pId,
      }
      localStorage.setItem('p2pId', p2pId);
      this.profile.save(this.#profile);
      return this.#profile
    }
    const {docs} = await this.profile.find({
      selector: {p2pId},
      fields: ['p2pId', 'avatar']
    })
    this.#profile = docs?.[0]
    if (this.#profile) return this.#profile;
    const svgCode = multiavatar(p2pId);
    const avatar = `data:image/svg+xml;utf8,${encodeURIComponent(svgCode)}`;
    this.#profile = {
      avatar,
      p2pId,
    }
    this.profile.save(this.#profile);
    return this.#profile
  }

  async connect(id: string) {
    const profile = await this.getProfile();
    const conn = this.#peer?.connect(id, {metadata: {
      message: "",
      profile
    }})
    console.log('line 59', conn)
    if (!conn) return;
    this.#peerMap[id] = {conn, state: 'offline'};
    this.#connEventListener(id);
    return conn;
  }

  async #getPeer() {
    const profile = await this.getProfile()
    this.#peer = new Peer(profile.p2pId);
    this.#peerEventListener()
  }

  async getChatList({limit = 20, skip = 0 } = {}) {
    const {docs} = await this.profile.find({
      selector: [],
      limit,
      skip
    })
    return docs;
  }

  #getConn(id: string) {
    return this.#peerMap[id]?.conn
  }

  send(data: object, id: string) {
    const conn = this.#getConn(id);
    console.log("conn:", conn);
    conn.send(data)
  }

  async #handleConnEvent(conn: DataConnection) {
    const {message, profile} = conn.metadata;
    this.#peerMap[profile.p2pId] = {conn, state: 'offline'};
    this.#connEventListener(profile.p2pId);
    const {docs} = await this.profile.find({
      selector: [{p2pId: profile.p2pId}],
      fields: ['p2pId', 'avatar']
    })
    if (!docs[0]) {
      this.profile.save({avatar: profile.avatar, p2pId: profile.p2pId});
    }
  }

  #connEventListener(id: string) {
    const conn = this.#getConn(id);
    conn.on('open', () => {
      this.#peerMap[id].state = 'active';
    })
    conn.on('data', (data) => {
      console.log(conn, data)
    })
    conn.on('error', (error) => {
      console.log("error:", error);
    }),
    conn.on('close', () => {
      this.#peerMap[id].state = 'offline';
    })
  }

  #peerEventListener() {
    this.#peer?.on('open', (id) => {
      console.log('p2p id', id)
    })
    this.#peer?.on("connection", this.#handleConnEvent.bind(this));
    this.#peer?.on("error", (error) => {
      console.log("error:", error.type, '---', error.name, '---', error.message);
    })
    this.#peer?.on("disconnected", (id) => {
      console.log("disconnected:", id);
    })
    this.#peer?.on("close", () => {
      console.log("close:");
    })
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Global();
    }
    return this.instance;
  }
}

export default Global.getInstance();