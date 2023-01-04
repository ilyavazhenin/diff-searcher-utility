import _ from 'lodash';

const makePlainOutput = (array) => {
  const lineElements = [];

  array.forEach((object) => {
    const prevValue = (typeof object.prevValue === 'boolean' || typeof object.prevValue === 'object') ? object.prevValue : `'${object.prevValue}'`;
    const newValue = (typeof object.newValue === 'boolean' || typeof object.newValue === 'object') ? object.newValue : `'${object.newValue}'`;

    const makeLineElem = () => `Property '${object.keyPath}' was`;

    if (object.conclusion === 'updated') {
      lineElements.push(`${makeLineElem()} updated. From ${_.isArray(prevValue) ? '[complex value]' : ''.concat(`${prevValue}`)} to ${_.isArray(newValue) ? '[complex value]' : ''.concat(`${newValue}`)}`);
    }

    if (object.conclusion === 'removed') {
      lineElements.push(`${makeLineElem()} removed`);
    }

    if (object.conclusion === 'added') {
      lineElements.push(`${makeLineElem()} added with value: ${_.isArray(newValue) ? '[complex value]' : ''.concat(`${newValue}`)}`);
    }

    if (object.conclusion === 'no change' && _.isArray(newValue)) {
      lineElements.push(`${_.isArray(newValue) ? makePlainOutput(newValue) : makeLineElem().concat(`${newValue}`)}`);
    }
  });

  const outputArray = [
    ...lineElements,
  ];
  return outputArray.join('\n');
};

export default makePlainOutput;
