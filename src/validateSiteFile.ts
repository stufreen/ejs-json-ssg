/* eslint-disable @typescript-eslint/no-explicit-any */
import { SiteNode } from './types';

export const isString = (value: any): boolean =>
  typeof value === 'string' || value instanceof String;

export function isFieldObject(maybeFieldObject: any): boolean {
  if (typeof maybeFieldObject !== 'object' || maybeFieldObject === null) {
    throw new Error();
  }

  return true;
}

export function isMetaObject(maybeMetaObject: any): boolean {
  if (
    typeof maybeMetaObject !== 'object' ||
    maybeMetaObject === null ||
    Array.isArray(maybeMetaObject)
  ) {
    throw new Error();
  }

  const allStrings = Object.keys(maybeMetaObject).every((key) => {
    return isString(maybeMetaObject[key]);
  });

  if (!allStrings) {
    throw new Error();
  }

  return true;
}

export function isSiteNode(maybeNode: any): maybeNode is SiteNode {
  if (!isString(maybeNode.slug)) {
    throw new Error(
      `Invalid site node ${JSON.stringify(
        maybeNode
      )}: required property "slug" must be a string.`
    );
  }

  if (!maybeNode.template) {
    throw new Error(
      `Invalid site node "${maybeNode.slug}": missing "template".`
    );
  }

  if (!isString(maybeNode.template)) {
    throw new Error(
      `Invalid site node "${maybeNode.slug}": "template" must be a string.`
    );
  }

  if (
    typeof maybeNode.visible !== 'undefined' &&
    typeof maybeNode.visible !== 'boolean'
  ) {
    throw new Error(
      `Invalid site node "${maybeNode.slug}": "visible" may only be boolean or undefined.`
    );
  }

  if (typeof maybeNode.meta === 'undefined') {
    throw new Error(
      `Invalid site node "${maybeNode.slug}": "meta" must be an object where the values are strings.`
    );
  }

  if (!isMetaObject(maybeNode.meta)) {
    throw new Error(
      `Invalid site node "${maybeNode.slug}": "meta" must be an object where the values are strings.`
    );
  }

  if (typeof maybeNode.fields === 'undefined') {
    throw new Error(
      `Invalid site node "${maybeNode.slug}": "fields" must be an object where the values are Fields.`
    );
  }

  if (!isMetaObject(maybeNode.fields)) {
    throw new Error(
      `Invalid site node "${maybeNode.slug}": "fields" must be an object where the values are Fields.`
    );
  }

  if (!Array.isArray(maybeNode.children)) {
    throw new Error(
      `Invalid site node "${maybeNode.slug}": "children" must be an array of site nodes.`
    );
  }

  if (
    typeof maybeNode.children !== 'undefined' &&
    Array.isArray(maybeNode.children) &&
    !maybeNode.children.every(isSiteNode)
  ) {
    throw new Error(
      `Invalid site node "${maybeNode.slug}": "children" must be an array of site nodes.`
    );
  }

  return true;
}
