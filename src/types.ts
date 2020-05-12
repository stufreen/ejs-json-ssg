export interface Arguments {
  c?: string;
  config?: string;
}

export interface Config {
  templateDir: string;
  outputDir: string;
  contentDir: string;
  defaultLanguage: string;
}

export interface Field {
  type: string;
  value: Fields | string | number | boolean | null;
}

export type Fields = {
  [key: string]: Field;
};

export interface SiteNode {
  slug: string;
  template: string;
  visible?: boolean;
  meta?: {
    [key: string]: string;
  };
  fields?: {
    [key: string]: Field;
  };
  children?: SiteNode[];
}
