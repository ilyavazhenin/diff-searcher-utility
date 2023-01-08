import _ from 'lodash';

const makePlainOutput = (array) => {
  const lineElements = [];

  array.forEach((object) => {
    const prevValue = (typeof object.prevValue === 'string')
      ? `'${object.prevValue}'`
      : object.prevValue; // check if we need single quotes for value

    const newValue = (typeof object.newValue === 'string')
      ? `'${object.newValue}'`
      : object.newValue; // check if we need single quotes for value

    const makeLeftPartOfLine = () => `Property '${object.keyPath}' was`;

    if (object.conclusion === 'updated') {
      lineElements.push(`${makeLeftPartOfLine()} updated. From ${_.isArray(prevValue)
        ? '[complex value]'
        : ''.concat(`${prevValue}`)} to ${_.isArray(newValue)
        ? '[complex value]'
        : ''.concat(`${newValue}`)}`);
    }

    if (object.conclusion === 'removed') {
      lineElements.push(`${makeLeftPartOfLine()} removed`);
    }

    if (object.conclusion === 'added') {
      lineElements.push(`${makeLeftPartOfLine()} added with value: ${_.isArray(newValue)
        ? '[complex value]'
        : ''.concat(`${newValue}`)}`);
    }

    if (object.conclusion === 'no change' && _.isArray(newValue)) {
      lineElements.push(`${_.isArray(newValue)
        ? makePlainOutput(newValue)
        : makeLeftPartOfLine().concat(`${newValue}`)}`);
    }
  });

  const outputArray = [
    ...lineElements,
  ];
  return outputArray.join('\n');
};

export default makePlainOutput;
