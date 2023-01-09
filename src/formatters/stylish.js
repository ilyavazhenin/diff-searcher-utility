import _ from 'lodash';

const makeStylishOutput = (array) => {
  const spaces = '    ';
  const minusSign = '  - ';
  const plusSign = '  + ';

  const lineElements = array.map((object) => {
    const makeLeftPartOfLine = (sign) => `${spaces.repeat(object.depth)}${sign}${object.keyName}`;
    const endingPartOfLine = `${spaces.repeat(object.depth + 1)}}`;

    if (object.conclusion === 'updated') {
      return [
        `${makeLeftPartOfLine(minusSign)}: ${_.isArray(object.prevValue)
          ? makeStylishOutput(object.prevValue).slice(0, -1).concat(endingPartOfLine)
          : object.prevValue}`,

        `${makeLeftPartOfLine(plusSign)}: ${_.isArray(object.newValue)
          ? makeStylishOutput(object.newValue).slice(0, -1).concat(endingPartOfLine)
          : object.newValue}`,
      ];
    }

    if (object.conclusion === 'removed') {
      return `${makeLeftPartOfLine(minusSign)}: ${_.isArray(object.prevValue)
        ? makeStylishOutput(object.prevValue).slice(0, -1).concat(endingPartOfLine)
        : object.prevValue}`;
    }

    if (object.conclusion === 'added') {
      return `${makeLeftPartOfLine(plusSign)}: ${_.isArray(object.newValue)
        ? makeStylishOutput(object.newValue).slice(0, -1).concat(endingPartOfLine)
        : object.newValue}`;
    }

    // other cases when object.conclusion === 'no changes':
    return `${makeLeftPartOfLine(spaces)}: ${_.isArray(object.newValue)
      ? makeStylishOutput(object.newValue).slice(0, -1).concat(endingPartOfLine)
      : object.newValue}`;
  });

  const outputArray = [
    '{',
    ..._.flattenDeep(lineElements),
    '}',
  ];
  return outputArray.join('\n');
};

export default makeStylishOutput;
