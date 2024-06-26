import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import { object, string, number } from 'yup';
import { PubSub } from './pubsub';

PouchDB.plugin(find);

export type Me = {
  p2pId: string;
  avatar: string;
}

export type Profile = Me & {
  lastConnectTime?: number;
  remark?: string;
  unread?: number;
};

export type Message = {
  type: 'text'|'photo';
  value: string|Blob;
  p2pId: string;
  ext?: string;
  senderP2pId?: string;
  createAt: number;
}

export const profileSchema = object().shape({
  p2pId: string().required(),
  avatar: string().required(),
  lastConnectTime: number(),
}).noUnknown();

export class DB extends PubSub {
  constructor() {
    super()
  }
  protected async init() {
    await Promise.all([
      this.profile.createIndex({
        index: {
          fields: ['p2pId']
        }
      }),
      this.message.createIndex({
        index: {
          fields: ['p2pId']
        }
      }),
      this.message.createIndex({
        index: {
          fields: ['type']
        }
      }),
      this.message.createIndex({
        index: {
          fields: ['createAt']
        }
      })
    ])
  }
  /** The profile is a list of all connected users. */
  get profile() {
    return new PouchDB<Profile>('Profile', {
      revs_limit: 5,
    })
  }
  get me() {
    return new PouchDB<Profile>('Me', {
      revs_limit: 5,
    })
  }
  get message() {
    return new PouchDB<Message>('Message', {
      revs_limit: 5,
    })
  }
}