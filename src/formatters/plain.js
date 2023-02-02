import _ from 'lodash';
import { makeComplexValueStrIfNeeded, makeQuotesIfNeeded, isChanged } from './formatter-utils.js';

const makePlainOutput = (array, keyPath = []) => {
  const lineElements = array.filter((object) => isChanged(object))
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

      return `${makeLeftPartOfLine()} removed`;
    });

  return [
    ...lineElements,
  ].join('\n');
};

export default makePlainOutput;
