export interface Comment {
  id?: string;
  user?: number;
  fact?: number;
  text?: string;
  created?: any;
  updated?: any;
}
export interface Resume {
  id?: string;
  user?: number;
  text?: string;
}
export interface MainResume extends Resume {
  main_topic_id?: string;
  main_topic_name?: string;
  source?: string;
  status?: string;
}
export interface FactResume extends Resume {
  fact_id?: string;
  fact_id_name?: string;
  source?: string;
  status?: string;
}

export interface Item {
  id?: any;
  label?: any;
  value?: any;
}

export interface Img {
  base64?: string;
  id?: string;
  value?: string;
  created?: string;
  publication_date?: string;
}

export interface DBToken {
  refresh: string;
  access: string;
}
export interface IUser {
  id?: any;
  email?: any;
}
