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
  title?: string;
  id: string;
  type: string;
  value: Field[] | string | number | boolean | null;
}

export interface SiteNode {
  slug: string;
  template: string;
  visible?: boolean;
  meta?: {
    [key: string]: string;
  };
  fields?: Field[];
  children?: SiteNode[];
}
