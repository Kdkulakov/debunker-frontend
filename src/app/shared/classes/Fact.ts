export class Fact {

  id?: string;
  name: string;
  text: string;
  status: string;
  created: any;
  updated: any;
  ppublication_date: any;
  main_topic: any;
  orthography: any;
  tonality: any;
  toxicity: any;
  source_score: any;
  is_deleted: any;
  url: string;
  user: any;
  source: any;
  images_items?:  any[];

  constructor() {
    this.id = "";
    this.name = "";
    this.text = "";
    this.status = "";
    this.url = "";
    this.main_topic = undefined;
    this.is_deleted = undefined;
    this.user = undefined;
    this.source = undefined;
    this.created = undefined;
    this.ppublication_date = undefined;
    this.updated = undefined;
    this.images_items=[];
    this.orthography = undefined;
    this.tonality = undefined;
    this.toxicity = undefined;
    this.source_score = undefined;
    return this;
  }
}
