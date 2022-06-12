export class Pic {

  base64?: string;
  id?: string;
  value?: string;
  created?: string;
  ppublication_date?: string;

  constructor() {
    this.id = "";
    this.base64 = "";
    this.ppublication_date = "";
    this.created = "";
    return this;
  }
}
