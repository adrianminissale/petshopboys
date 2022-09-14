export namespace Pets {
  export class Search {
    static readonly type = "[Pets] Search";
    constructor(public payload: []) {}
  }
  export class Status {
    static readonly type = "[Pets] Status";
    constructor(public payload: string) {}
  }
}