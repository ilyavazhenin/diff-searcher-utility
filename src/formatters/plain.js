import _ from 'lodash';

const makePlainOutput = (array) => {
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

      const makeLeftPartOfLine = () => `Property '${object.keyPath}' was`;

      if (object.conclusion === 'updated') {
        return `${makeLeftPartOfLine()} updated. From ${_.isArray(prevValue)
          ? '[complex value]'
          : ''.concat(`${prevValue}`)} to ${_.isArray(newValue)
          ? '[complex value]'
          : ''.concat(`${newValue}`)}`;
      }

      if (object.conclusion === 'added') {
        return `${makeLeftPartOfLine()} added with value: ${_.isArray(newValue)
          ? '[complex value]'
          : ''.concat(`${newValue}`)}`;
      }

      if (object.conclusion === 'nested') {
        return `${makePlainOutput(newValue)}`;
      }

      if (object.conclusion === 'no change' && _.isArray(newValue)) {
        return `${makeLeftPartOfLine().concat(`${newValue}`)}`;
      }

      // all other cases left (when a key was removed):
      return `${makeLeftPartOfLine()} removed`;
    });

  const outputArray = [
    ...lineElements,
  ];

  return outputArray.join('\n');
};

export default makePlainOutput;
