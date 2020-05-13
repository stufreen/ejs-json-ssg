/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, SiteNode } from './types';
import logger from './logger';

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
    logger.warn('Invalid field: missing "type"');
    return false;
  }

  if (!isString(maybeField.type)) {
    logger.warn('Invalid field: "type" must be a string');
    return false;
  }

  if (typeof maybeField.value === 'undefined') {
    logger.warn('Invalid field: "value" is not defined');
    return false;
  }

  if (
    typeof maybeField.value !== 'boolean' &&
    typeof maybeField.value !== 'number' &&
    maybeField !== null &&
    !isString(maybeField.value) &&
    !isFieldObject(maybeField.value)
  ) {
    logger.warn(
      'Invalid field: "value" can be a boolean, number, string, null or array of fields'
    );
    return false;
  }

  return true;
}

export function isSiteNode(maybeNode: any): maybeNode is SiteNode {
  if (!isString(maybeNode.slug)) {
    logger.warn('Invalid site node: "slug" must be a string');
    return false;
  }

  if (!maybeNode.template) {
    logger.warn('Invalid site node: missing "template"');
    return false;
  }

  if (!isString(maybeNode.template)) {
    logger.warn('Invalid site node: "template" must be a string');
    return false;
  }

  if (
    typeof maybeNode.meta !== 'undefined' &&
    typeof maybeNode.visible !== 'boolean'
  ) {
    logger.warn(
      'Invalid site node: "visible" may only be boolean or undefined'
    );
    return false;
  }

  if (typeof maybeNode.meta !== 'undefined' && !isMetaObject(maybeNode.meta)) {
    logger.warn(
      'Invalid site node: "meta" may only be an object where the values are strings'
    );
    return false;
  }

  if (
    typeof maybeNode.fields !== 'undefined' &&
    !isMetaObject(maybeNode.fields)
  ) {
    logger.warn(
      'Invalid site node: "fields" may only be an object where the values are Fields'
    );
    return false;
  }

  if (
    typeof maybeNode.children !== 'undefined' &&
    !Array.isArray(maybeNode.children)
  ) {
    logger.warn(
      'Invalid site node: "children" may only be an array of site nodes'
    );
    return false;
  }

  if (
    typeof maybeNode.children !== 'undefined' &&
    Array.isArray(maybeNode.children) &&
    !maybeNode.children.every(isSiteNode)
  ) {
    logger.warn(
      'Invalid site node: "children" may only be an array of site nodes'
    );
    return false;
  }

  return true;
}
