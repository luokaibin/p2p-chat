export type IState = {state: 'offline'|'online'};
export type IDbId<T> = T & {_id: string, _rev: string};