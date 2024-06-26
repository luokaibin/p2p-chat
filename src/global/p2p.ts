import Peer, { DataConnection } from "peerjs";
import { ChatList } from "./chatList";
import dayjs from 'dayjs';
import { Message } from "./db";
import CustomError, { ErrorType } from "./error";

export class P2P extends ChatList {
  #peer?: Peer;
  #peerMap: {[key: string]: DataConnection}
  constructor() {
    super();
    this.#peerMap = {};
  }
  protected async init() {
    await super.init()
    const {profile} = this.user;
    if (!profile?.p2pId) return;
    this.#peer = new Peer(profile.p2pId);
    this.#peerEventListener();
  }

  async connect(id: string) {
    const {profile} = this.user;
    const conn = this.#peer?.connect(id, {metadata: {
      message: "",
      profile
    }})
    if (!conn) return;
    this.#peerMap[id] = conn;
    this.#connEventListener(id);
    if (!this.chatMap[id]) {
      super.save({p2pId: id, avatar: this.genSquareAvatar(id)});
    }
    
    return conn;
  }

  #reconnect() {
    this.chatList.chatList?.forEach(item => {
      if (item.p2pId) {
        this.connect(item?.p2pId);
      }
    })
  }

  #getConn(id: string) {
    return this.#peerMap[id]
  }

  async send(data: Pick<Message, 'type'|'value'|'ext'>, id: string) {
    const conn = this.#getConn(id);
    if (!conn.open) return this.emit('error', new CustomError(ErrorType.SEND_FAILED, 'This person is not online and you cannot send a message to him'));
    conn.send(data)
    const doc = {
      p2pId: id,
      senderP2pId: this.user.profile.p2pId,
      type: data.type,
      value: data.value,
      ext: data.ext,
      createAt: dayjs().valueOf()
    }
    const res = await this.message.post(doc)
    this.update(id, {latest: doc})
    this.emit(id, {
      _id: res.id,
      _rev: res.rev,
      ...doc
    })

    return {
      _id: res.id,
      _rev: res.rev
    }
  }

  async #handleConnEvent(conn: DataConnection) {
    const {profile} = conn.metadata;
    this.#peerMap[profile.p2pId] = conn;
    this.#connEventListener(profile.p2pId);

    if (!this.chatMap[profile.p2pId]) {
      super.save({avatar: profile.avatar, p2pId: profile.p2pId});
    }
  }

  #connEventListener(id: string) {
    const conn = this.#getConn(id);
    conn.on('open', () => {
      super.update(id, {state: 'online', lastConnectTime: dayjs().valueOf()})
    })
    conn.on('data', async (data) => {
      const message = data as Pick<Message, 'type'|'value'|'ext'>;
      const doc = {
        p2pId: id,
        senderP2pId: id,
        type: message.type,
        value: message.value,
        ext: message.ext,
        createAt: dayjs().valueOf()
      }
      if (doc.type === 'photo') {
        const picBlob = new Blob([doc.value], { type: 'application/octet-stream' })
        doc.value = picBlob;
      }
      const res = await this.message.post(doc)
      this.emit(id, {
        _rev: res.rev,
        _id: res.id,
        ...doc
      })
      const subscribers = this.getEventSubscribers(id);
      const unread = subscribers?.length > 0 ? 0 : (this.chatMap[id]?.unread || 0) + 1;
      await this.update(id, {latest: doc, unread});

    })
    conn.on('error', (error) => {
      console.log("error:", error);
      super.update(id, {state: 'offline'})
    }),
    conn.on('close', () => {
      super.update(id, {state: 'offline'})
    })
  }

  #peerEventListener() {
    this.#peer?.on('open', () => {
      this.updateUserState('online')
      this.#reconnect()
    })
    this.#peer?.on("connection", this.#handleConnEvent.bind(this));
    this.#peer?.on("error", (error) => {
      console.log("error:", error.type, '---', error.name, '---', error.message);
    })
    this.#peer?.on("disconnected", () => {
      this.updateUserState('offline')
    })
    this.#peer?.on("close", () => {
      this.updateUserState('offline')
    })
  }
}