import { Field, SiteNode } from './types';

const isString = (value: any): boolean =>
  typeof value === 'string' || value instanceof String;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    !isField(maybeField.value) // TO DO: Check if Field array, not single field
  ) {
    throw new Error(
      'Invalid field: "value" can be a boolean, number, string, null or array of fields'
    );
  }

  return true;
}

function isSiteNode(maybeNode: any): maybeNode is SiteNode {
  return true; // TO DO: Add type checks
}

const validateSiteFile = (root: any, templateDir: string): root is SiteNode => {
  return false;
};

export default validateSiteFile;
