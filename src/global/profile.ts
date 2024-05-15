import { proxy } from 'valtio';
import {DB, type Me} from './db';
import { IState } from './type';
import { nanoid } from 'nanoid';
import multiavatar from '@multiavatar/multiavatar';

interface IData {
  profile: Partial<Me & IState>;
}
export class Profile extends DB {
  #data: IData;
  constructor() {
    super()
    this.#data = proxy({
      profile: {},
    });
  }

  genSquareAvatar(key: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(multiavatar(key), "application/xml")
    doc.querySelector('svg path')?.setAttribute('d', "M0 0,231 0L231 231L0 231Z");
    const svgCode = doc.querySelector('svg')?.outerHTML;
    const avatar = `data:image/svg+xml;utf8,${encodeURIComponent(svgCode || '')}`;
    return avatar;
  }

  protected async init() {
    const {docs} = await this.me.find({
      selector: {},
      fields: ['p2pId', 'avatar']
    })
    if (docs[0]) {
      this.#data.profile = docs[0];
      return;
    }
    const p2pId = nanoid(8);
    const avatar = this.genSquareAvatar(p2pId)
    const profile = {p2pId, avatar}
    this.#data.profile = profile
    this.me.save(profile)
  }
  updateUserState(state: IState['state']) {
    this.#data.profile.state = state;
  }
  get user() {
    return this.#data;
  }
}