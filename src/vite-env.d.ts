/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="pouchdb-core" />

declare namespace PouchDB {
  interface Database<Content extends {} = {}> {
    save(params: any): Promise<any>;
}
}

declare module "delta-pouch" {
  const plugin: PouchDB.Plugin;
  export = plugin;
}