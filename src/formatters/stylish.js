import _ from 'lodash';

const makeStylishOutput = (array) => {
  const lineElements = [];
  const spaces = '    ';
  let sign = '';

  array.forEach((object) => {
    const makeLeftPartOfLine = () => `${spaces.repeat(object.depth)}${sign}${object.keyName}`;
    const endingPartOfLine = `${spaces.repeat(object.depth + 1)}}`;

    if (object.conclusion === 'updated') {
      sign = '  - ';
      lineElements.push(`${makeLeftPartOfLine()}: ${_.isArray(object.prevValue)
        ? makeStylishOutput(object.prevValue).slice(0, -1).concat(endingPartOfLine)
        : object.prevValue}`);

      sign = '  + ';
      lineElements.push(`${makeLeftPartOfLine()}: ${_.isArray(object.newValue)
        ? makeStylishOutput(object.newValue).slice(0, -1).concat(endingPartOfLine)
        : object.newValue}`);
    }

    if (object.conclusion === 'removed') {
      sign = '  - ';
      lineElements.push(`${makeLeftPartOfLine()}: ${_.isArray(object.prevValue)
        ? makeStylishOutput(object.prevValue).slice(0, -1).concat(endingPartOfLine)
        : object.prevValue}`);
    }

    if (object.conclusion === 'added') {
      sign = '  + ';
      lineElements.push(`${makeLeftPartOfLine()}: ${_.isArray(object.newValue)
        ? makeStylishOutput(object.newValue).slice(0, -1).concat(endingPartOfLine)
        : object.newValue}`);
    }

    if (object.conclusion === 'no change') {
      sign = '    ';
      lineElements.push(`${makeLeftPartOfLine()}: ${_.isArray(object.newValue)
        ? makeStylishOutput(object.newValue).slice(0, -1).concat(endingPartOfLine)
        : object.newValue}`);
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
