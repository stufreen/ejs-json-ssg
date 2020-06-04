/* eslint-disable @typescript-eslint/no-use-before-define */
import objectPath from 'object-path';
import { SiteNodeWithPath } from './types';

type JsonPrimitive = number | string | JsonArray | JsonObject;

type JsonArray = Array<JsonPrimitive>;

type JsonObject = { [key: string]: JsonPrimitive };

type Json = JsonObject;

export const localizeString = (
  translationKey: string,
  translationTree: Json
): string => {
  return objectPath.get(translationTree, translationKey) || translationKey;
};

export function localizeArray(
  input: Array<JsonPrimitive>,
  translationTree: Json
): Array<JsonPrimitive> {
  return input.map((item) => localizeUnknown(item, translationTree));
}

export function localizeObject(
  input: JsonObject,
  translationTree: Json
): JsonObject {
  const output: JsonObject = {};
  Object.keys(input).forEach((key: string) => {
    output[key] = localizeUnknown(input[key], translationTree);
  });
  return output;
}

export function localizeUnknown(
  input: JsonPrimitive,
  translationTree: Json
): JsonPrimitive {
  if (typeof input === 'string') {
    return localizeString(input, translationTree);
  } else if (Array.isArray(input)) {
    return localizeArray(input, translationTree);
  } else if (typeof input === 'object') {
    return localizeObject(input, translationTree);
  }
  return input;
}

export const localizeSiteNode = (
  siteNode: SiteNodeWithPath,
  translationTree: Json
): SiteNodeWithPath => {
  return {
    ...siteNode,
    slug: localizeString(siteNode.slug, translationTree),
    meta: localizeObject(siteNode.meta, translationTree) as {
      [key: string]: string;
    },
    fields: localizeObject(siteNode.fields, translationTree),
  };
};
