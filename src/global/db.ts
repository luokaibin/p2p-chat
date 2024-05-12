import PouchDB from 'pouchdb'
import delta from 'delta-pouch';
import find from 'pouchdb-find';

PouchDB.plugin(find);
PouchDB.plugin(delta);

export class DB {
  constructor() {
    this.#createIndex();
  }
  #createIndex() {
    this.profile.createIndex({
      index: {
        fields: ['deviceId', 'userId']
      }
    })
  }
  get profile() {
    return new PouchDB<{userId: string; deviceId: string; avatar: string;}>('Profile', {
      revs_limit: 5,
    })
  }
}