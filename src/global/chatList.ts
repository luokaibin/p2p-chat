import { proxy } from "valtio";
import { Profile } from "./profile";
import { Profile as IProfile } from './db'
import { IDbId, IState } from "./type";

interface IData {
  chatList: Array<Partial<IProfile & IState & IDbId>>
}

export class ChatList extends Profile {
  #data: IData;
  constructor() {
    super();
    this.#data = proxy({
      chatList: [],
    });
  }
  protected async init() {
    await super.init()
    const {docs} = await this.profile.find({
      selector: {},
      fields: ["avatar","p2pId", "_id"]
    })
    this.#data.chatList = docs;
  }
  get chatList() {
    return this.#data
  }
}