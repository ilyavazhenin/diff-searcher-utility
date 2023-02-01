import _ from 'lodash';
import { makeComplexValueStrIfNeeded, makeQuotesIfNeeded } from './formatter-utils.js';

const makePlainOutput = (array, keyPath = []) => {
  const lineElements = array.filter((object) => !(object.conclusion === 'no change' && !_.isArray(object.newValue)))
    .map((object) => {
      const prevValue = makeQuotesIfNeeded(object.prevValue);
      const newValue = makeQuotesIfNeeded(object.newValue);

      const accumPath = _.concat(keyPath, object.keyName);
      const makeLeftPartOfLine = () => `Property '${accumPath.join('.')}' was`;

      if (object.conclusion === 'updated') {
        return `${makeLeftPartOfLine()} updated. From ${makeComplexValueStrIfNeeded(prevValue)} to ${makeComplexValueStrIfNeeded(newValue)}`;
      }

      if (object.conclusion === 'added') {
        return `${makeLeftPartOfLine()} added with value: ${makeComplexValueStrIfNeeded(newValue)}`;
      }

      if (object.conclusion === 'nested') {
        return `${makePlainOutput(newValue, accumPath)}`;
      }

      // all other cases left (when a key was removed):
      return `${makeLeftPartOfLine()} removed`;
    });

  return [
    ...lineElements,
  ].join('\n');
};

export default makePlainOutput;
