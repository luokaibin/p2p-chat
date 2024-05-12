import { Peer } from "peerjs";
import { nanoid } from 'nanoid';
import multiavatar from '@multiavatar/multiavatar/esm'
import {getDeviceId} from '@plugins'
import {DB} from './db'

class Global extends DB {
  static instance: Global;
  #peer?: Peer;
  constructor() {
    super();
    this.#getPeer();
  }

  async getProfile() {
    const deviceId = await getDeviceId()
    const {docs} = await this.profile.find({
      selector: {deviceId},
    })
    let profile: {avatar: string; userId: string; deviceId: string} = docs?.[0]
    if (profile) return profile;
    const svgCode = multiavatar(deviceId);
    const avatar = `data:image/svg+xml;utf8,${encodeURIComponent(svgCode)}`;
    const id = nanoid(8)
    profile = {
      avatar,
      userId: id,
      deviceId,
    }
    await this.profile.save(profile);
    return profile
  }

  async #getPeer() {
    const deviceId = await getDeviceId()
    const {docs} = await this.profile.find({
      selector: {deviceId},
    })
    const profile = docs?.[0]
    if (profile) {
      this.#peer = new Peer(profile.userId);
      return
    }
    const id = nanoid(8)
    this.#peer = new Peer(id);
  }
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new Global();
    }
    return this.instance;
  }
}

export default Global.getInstance();