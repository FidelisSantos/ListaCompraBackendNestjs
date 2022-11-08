export class ViewUser {
  id: string;
  username: string;
  token: string;
  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }
}
