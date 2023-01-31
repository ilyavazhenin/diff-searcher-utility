import _ from 'lodash';

const makePlainOutput = (array, keyPath = []) => {
  const lineElements = array.filter((object) => {
    if (!(object.conclusion === 'no change' && !_.isArray(object.newValue))) return true;
    return false;
  })
    .map((object) => {
      const prevValue = (typeof object.prevValue === 'string')
        ? `'${object.prevValue}'`
        : object.prevValue; // check if we need single quotes for value

      const newValue = (typeof object.newValue === 'string')
        ? `'${object.newValue}'`
        : object.newValue;

      const accumPath = _.concat(keyPath, object.keyName);
      const makeLeftPartOfLine = () => `Property '${accumPath.join('.')}' was`;

      if (object.conclusion === 'updated') {
        return `${makeLeftPartOfLine()} updated. From ${_.isObjectLike(prevValue)
          ? '[complex value]'
          : ''.concat(`${prevValue}`)} to ${_.isObjectLike(newValue)
          ? '[complex value]'
          : ''.concat(`${newValue}`)}`;
      }

      if (object.conclusion === 'added') {
        return `${makeLeftPartOfLine()} added with value: ${_.isObjectLike(newValue)
          ? '[complex value]'
          : ''.concat(`${newValue}`)}`;
      }

      if (object.conclusion === 'nested') {
        return `${makePlainOutput(newValue, accumPath)}`;
      }

      if (object.conclusion === 'no change' && _.isObjectLike(newValue)) {
        return `${makeLeftPartOfLine().concat(`${newValue}`)}`;
      }

      // all other cases left (when a key was removed):
      return `${makeLeftPartOfLine()} removed`;
    });

  return [
    ...lineElements,
  ].join('\n');
};

export default makePlainOutput;
