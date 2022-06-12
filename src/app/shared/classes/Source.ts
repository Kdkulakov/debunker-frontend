export class Source{
  id?: string;
  name: string;
  url: string;
  type_class: string;
  score: string;
  created: any;
  updated: any;
  is_deleted: any;

  constructor() {
    this.id = "";
    this.name = "";
    this.url = "";
    this.type_class = "";
    this.score = "";
    this.created = "";
    this.updated = "";
    this.is_deleted = "";
    return this;
  }
}
