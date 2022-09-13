export namespace User {
  export class Login {
    static readonly type = "[User] Login";
    constructor(public payload :boolean) {}
  }
}