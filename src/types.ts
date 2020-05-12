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
