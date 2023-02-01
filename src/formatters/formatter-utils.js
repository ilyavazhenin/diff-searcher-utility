import _ from 'lodash';

const makeQuotesIfNeeded = (value) => {
  const formattedValue = typeof value === 'string' ? `'${value}'` : value;
  return formattedValue;
};

const makeComplexValueStrIfNeeded = (value) => {
  const formattedValue = _.isObjectLike(value) ? '[complex value]' : ''.concat(`${value}`);
  return formattedValue;
};

export { makeQuotesIfNeeded, makeComplexValueStrIfNeeded };
