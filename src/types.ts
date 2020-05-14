export interface Arguments {
  c?: string;
  config?: string;
}

export interface Config {
  templateDir: string;
  outputDir: string;
  contentDir: string;
  defaultLocale: string;
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
  meta: {
    [key: string]: string;
  };
  fields: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  children: SiteNode[];
  locales?: string[];
  excludeLocales?: string[];
}

export interface SiteNodeWithPath extends SiteNode {
  path: string;
  children: SiteNodeWithPath[];
}
