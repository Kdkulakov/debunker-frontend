import {Fact} from "./Fact";

export class MainTopic {
  id: string;
  user?: any;
  name?: string;
  url?: string;
  text?: string;
  images_list?:  any[];
  source?: any;
  status?: string;
  created?: any;
  updated?: any;
  is_deleted?:any;
  fact_list?: Fact[];
  facts_items?: Fact[];
  images_items?:  string[];
  constructor() {
    this.id = "";
    this.user = "";
    this.name = "";
    this.url = "";
    this.text = "";
    this.images_list = [];
    this.source = "";
    this.status = "0";
    this.fact_list = [];
    this.created = new Date();
    this.updated = new Date();
    this.is_deleted = "undefined";
    this.facts_items=[];
    this.images_items=[];
    return this;
  }
}
