import _ from 'lodash';

const makeStylishOutput = (array) => {
  const lineElements = [];
  const spaces = '    ';
  let sign = '';

  array.forEach((object) => {
    const makeLineElem = () => `${spaces.repeat(object.depth)}${sign}${object.keyName}`;

    if (object.conclusion === 'updated') {
      sign = '  - ';
      lineElements.push(`${makeLineElem()}: ${_.isArray(object.prevValue) ? makeStylishOutput(object.prevValue).slice(0, -1).concat(`${spaces.repeat(object.depth + 1)}}`) : object.prevValue}`);
      sign = '  + ';
      lineElements.push(`${makeLineElem()}: ${_.isArray(object.newValue) ? makeStylishOutput(object.newValue).slice(0, -1).concat(`${spaces.repeat(object.depth + 1)}}`) : object.newValue}`);
    }

    if (object.conclusion === 'removed') {
      sign = '  - ';
      lineElements.push(`${makeLineElem()}: ${_.isArray(object.prevValue) ? makeStylishOutput(object.prevValue).slice(0, -1).concat(`${spaces.repeat(object.depth + 1)}}`) : object.prevValue}`);
    }

    if (object.conclusion === 'added') {
      sign = '  + ';
      lineElements.push(`${makeLineElem()}: ${_.isArray(object.newValue) ? makeStylishOutput(object.newValue).slice(0, -1).concat(`${spaces.repeat(object.depth + 1)}}`) : object.newValue}`);
    }

    if (object.conclusion === 'no change') {
      sign = '    ';
      lineElements.push(`${makeLineElem()}: ${_.isArray(object.newValue) ? makeStylishOutput(object.newValue).slice(0, -1).concat(`${spaces.repeat(object.depth + 1)}}`) : object.newValue}`);
    }
  });

  const outputArray = [
    '{',
    ...lineElements,
    '}',
  ];
  return outputArray.join('\n');
};

export default makeStylishOutput;
