/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, SiteNode } from './types';

export const isString = (value: any): boolean =>
  typeof value === 'string' || value instanceof String;

export function isFieldObject(maybeFieldObject: any): boolean {
  if (typeof maybeFieldObject !== 'object' || maybeFieldObject === null) {
    return false;
  }

  return Object.keys(maybeFieldObject).every((key) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return isField(maybeFieldObject[key]);
  });
}

export function isMetaObject(maybeMetaObject: any): boolean {
  if (typeof maybeMetaObject !== 'object' || maybeMetaObject === null) {
    return false;
  }

  return Object.keys(maybeMetaObject).every((key) => {
    return isString(maybeMetaObject[key]);
  });
}

export function isField(maybeField: any): maybeField is Field {
  if (!maybeField.type) {
    // throw new Error('Invalid field: missing "type"');
    return false;
  }

  if (!isString(maybeField.type)) {
    // throw new Error('Invalid field: "type" must be a string');
    return false;
  }

  if (typeof maybeField.value === 'undefined') {
    // throw new Error('Invalid field: "value" is not defined');
    return false;
  }

  if (
    typeof maybeField.value !== 'boolean' &&
    typeof maybeField.value !== 'number' &&
    maybeField !== null &&
    !isString(maybeField.value) &&
    !isFieldObject(maybeField.value)
  ) {
    // throw new Error(
    //   'Invalid field: "value" can be a boolean, number, string, null or array of fields'
    // );
    return false;
  }

  return true;
}

export function isSiteNode(maybeNode: any): maybeNode is SiteNode {
  if (!maybeNode.slug) {
    // throw new Error('Invalid site node: missing "slug"');
    return false;
  }

  if (!isString(maybeNode.slug)) {
    // throw new Error('Invalid site node: "slug" must be a string');
    return false;
  }

  if (!maybeNode.template) {
    // throw new Error('Invalid site node: missing "template"');
    return false;
  }

  if (!isString(maybeNode.template)) {
    // throw new Error('Invalid site node: "template" must be a string');
    return false;
  }

  if (
    typeof maybeNode.meta !== 'undefined' &&
    typeof maybeNode.visible !== 'boolean'
  ) {
    throw new Error(
      'Invalid site node: "visible" may only be boolean or undefined'
    );
  }

  if (typeof maybeNode.meta !== 'undefined' && !isMetaObject(maybeNode.meta)) {
    throw new Error(
      'Invalid site node: "meta" may only be an object where the values are strings'
    );
  }

  if (
    typeof maybeNode.fields !== 'undefined' &&
    !isMetaObject(maybeNode.fields)
  ) {
    throw new Error(
      'Invalid site node: "fields" may only be an object where the values are Fields'
    );
  }

  if (
    typeof maybeNode.children !== 'undefined' &&
    !Array.isArray(maybeNode.children)
  ) {
    throw new Error(
      'Invalid site node: "children" may only be an array of site nodes'
    );
  }

  if (
    typeof maybeNode.children !== 'undefined' &&
    Array.isArray(maybeNode.children)
  ) {
    maybeNode.children.forEach((maybeSiteNode: any) => {
      if (isSiteNode(maybeSiteNode)) {
        throw new Error(
          'Invalid site node: "children" may only be an array of site nodes'
        );
      }
    });
  }

  return true;
}

const validateSiteFile = (root: any, templateDir: string): root is SiteNode => {
  return isSiteNode(root);
};

export default validateSiteFile;
