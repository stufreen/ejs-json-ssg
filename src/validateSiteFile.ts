/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, SiteNode } from './types';

const isString = (value: any): boolean =>
  typeof value === 'string' || value instanceof String;

function isFieldObject(maybeFieldObject: any): boolean {
  if (typeof maybeFieldObject !== 'object' || maybeFieldObject === null) {
    return false;
  }

  Object.keys(maybeFieldObject).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (!isField(maybeFieldObject[key])) {
      return false;
    }
  });

  return true;
}

function isMetaObject(maybeMetaObject: any): boolean {
  if (typeof maybeMetaObject !== 'object' || maybeMetaObject === null) {
    return false;
  }

  Object.keys(maybeMetaObject).forEach((key) => {
    if (!isString(maybeMetaObject[key])) {
      return false;
    }
  });

  return true;
}

function isField(maybeField: any): maybeField is Field {
  if (!maybeField.id) {
    throw new Error('Invalid field: missing "id"');
  }

  if (!isString(maybeField.id)) {
    throw new Error('Invalid field: "id" must be a string');
  }

  if (!maybeField.type) {
    throw new Error('Invalid field: missing "type"');
  }

  if (!isString(maybeField.type)) {
    throw new Error('Invalid field: "type" must be a string');
  }

  if (typeof maybeField.value === 'undefined') {
    throw new Error('Invalid field: "value" is not defined');
  }

  if (
    typeof maybeField.value !== 'boolean' &&
    typeof maybeField.value !== 'number' &&
    maybeField !== null &&
    !isString(maybeField.value) &&
    !isFieldObject(maybeField.value)
  ) {
    throw new Error(
      'Invalid field: "value" can be a boolean, number, string, null or array of fields'
    );
  }

  return true;
}

function isSiteNode(maybeNode: any): maybeNode is SiteNode {
  if (!maybeNode.slug) {
    throw new Error('Invalid site node: missing "slug"');
  }

  if (!isString(maybeNode.slug)) {
    throw new Error('Invalid site node: "slug" must be a string');
  }

  if (!maybeNode.template) {
    throw new Error('Invalid site node: missing "template"');
  }

  if (!isString(maybeNode.template)) {
    throw new Error('Invalid site node: "template" must be a string');
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
