import { proxy } from "valtio";
import { Profile } from "./profile";
import { Profile as IProfile, Message, profileSchema } from './db'
import { IDbId, IState } from "./type";
// Chat does not save unread message counts, the initial unread count is retrieved from the message list.
export type IChat = IDbId<IProfile>;
type IChatValue = IChat & IState & {
  errorMessage: string;
  latest: Pick<Message, 'ext'|'p2pId'|'senderP2pId'|'type'|'value'|'createAt'>;
}
interface IData {
  chatList: Array<Partial<IChat>>;
  chatMap: {
    [key: string]: Partial<IChatValue>;
  }
}

export class ChatList extends Profile {
  #data: IData;
  constructor() {
    super();
    this.#data = proxy({
      chatList: [],
      chatMap: {},
    });
  }
  protected async init() {
    await super.init()
    const {docs} = await this.profile.find({
      selector: {},
      fields: ["avatar","p2pId", "unread", "_id", "_rev", "lastConnectTime"]
    })
    this.#data.chatList = docs;
    this.#data.chatMap = this.#data.chatList.reduce<IData['chatMap']>((prev, curr) => {
      if (!curr.p2pId) return prev;
      prev[curr.p2pId] = curr;
      return prev;
    }, {})
    this.#initlatest()
  }
  async #initlatest() {
    this.#data.chatList.forEach(async (chat) => {
      const {docs} = await this.message.find({
        selector: {
          p2pId: chat.p2pId,
          createAt: {'$exists': true}
        },
        limit: 1,
        sort: [{createAt: 'desc'}]
      })
      const latest = docs[0]
      this.#data.chatMap[chat.p2pId as string].latest = latest
    })
  }
  protected async save(params: IProfile) {
    if (this.#data.chatMap[params.p2pId]) return;
    try {
      const data = await profileSchema.validate(params)
      const res = await this.profile.post(data);
      const chat = {
        ...data,
        _id: res.id,
        _rev: res.rev
      }
      this.#data.chatList.unshift(chat)
      this.#data.chatMap[params.p2pId] = chat;
    } catch (error) {
      console.log("error:", error);
    }
  }
  protected async update(p2pId: string, params: Partial<IChatValue>) {
    // TODO: It is best to add data validation here.
    if (!this.#data.chatMap[p2pId]) return;
    const oldData = this.#data.chatMap[p2pId];
    this.#data.chatMap[p2pId] = {
      ...oldData,
      ...params,
    };
    if (params.lastConnectTime || typeof params.unread === 'number') {
      const {id, rev} = await this.profile.put({
        _id: oldData._id,
        _rev: oldData._rev,
        lastConnectTime: oldData.lastConnectTime || params.lastConnectTime,
        p2pId: p2pId,
        avatar: oldData.avatar || this.genSquareAvatar(p2pId),
        unread: typeof params.unread === 'number' ? params.unread : oldData.unread
      })
      this.#data.chatMap[p2pId]._id = id,
      this.#data.chatMap[p2pId]._rev = rev;
    }
  }
  async markAsRead(p2pId: string) {
    await this.update(p2pId, {unread: 0})
  }
  get chatList() {
    return this.#data
  }
  get chatMap() {
    return this.#data.chatMap;
  }
}