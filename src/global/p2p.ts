import Peer, { DataConnection } from "peerjs";
import { ChatList } from "./chatList";
import { IState } from "./type";

export class P2P extends ChatList {
  #peer?: Peer;
  #peerMap: {[key: string]: {
    state: IState['state'],
    conn: DataConnection
  }}
  constructor() {
    super();
    this.#peerMap = {};
  }
  protected async init() {
    await super.init()
    const {profile} = this.user;
    if (!profile?.p2pId) return;
    this.#peer = new Peer(profile.p2pId);
    this.#peerEventListener()
  }

  async connect(id: string) {
    const {profile} = this.user;
    const conn = this.#peer?.connect(id, {metadata: {
      message: "",
      profile
    }})
    if (!conn) return;
    this.#peerMap[id] = {conn, state: 'offline'};
    this.#connEventListener(id);
    return conn;
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
      this.#peerMap[id].state = 'online';
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
      this.updateUserState('online')
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


}