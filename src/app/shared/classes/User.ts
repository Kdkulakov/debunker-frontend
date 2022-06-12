export class User{
  username: string;
  password: string;
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;

  constructor() {
    this.id = "1";
    this.username = "";
    this.password = "";
    this.email = "";
    this.first_name = "";
    this.last_name = "";
    return this;
  }
}
