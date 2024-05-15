import PouchDB from 'pouchdb'
import delta from 'delta-pouch';
import find from 'pouchdb-find';

PouchDB.plugin(find);
PouchDB.plugin(delta);

export type Me = {
  p2pId: string;
  avatar: string;
}

export type Profile = Me;

export class DB {
  constructor() {
    this.#createIndex();
  }
  #createIndex() {
    this.profile.createIndex({
      index: {
        fields: ['p2pId']
      }
    })
  }
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
}