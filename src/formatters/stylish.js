import _ from 'lodash';

const spaces = 4;

const makeLeftSpaces = (depth) => ' '.repeat(depth * spaces - 2);

const getValueString = (value, depth) => {
  const recursive = (iterValue, iterDepth) => {
    if (!_.isObject(iterValue)) {
      return iterValue;
    }
    const iterData = Object.entries(iterValue);
    const output = iterData.map(([iterDataKey, iterDataValue]) => {
      if (!_.isObject(iterDataValue)) {
        return `${' '.repeat(spaces * (iterDepth + 1))}${iterDataKey}: ${iterDataValue}`;
      }
      return `${' '.repeat(spaces * (iterDepth + 1))}${iterDataKey}: ${recursive(iterDataValue, iterDepth + 1)}`;
    });
    return `{\n${output.join('\n')}\n${' '.repeat(spaces * iterDepth)}}`;
  };

  return recursive(value, depth);
};

const makeStylishOutput = (array) => {
  const makeLine = (differencesData, depth = 1) => {
    const outputLines = differencesData.flatMap(({
      keyName,
      conclusion,
      newValue,
      prevValue,
    }) => {
      switch (conclusion) {
        case 'nested':
          return `${makeLeftSpaces(depth)}  ${keyName}: ${makeLine(newValue, depth + 1, spaces)}`;
        case 'added':
          return `${makeLeftSpaces(depth)}+ ${keyName}: ${getValueString(newValue, depth, spaces)}`;
        case 'removed':
          return `${makeLeftSpaces(depth)}- ${keyName}: ${getValueString(prevValue, depth, spaces)}`;
        case 'no change':
          return `${makeLeftSpaces(depth)}  ${keyName}: ${getValueString(newValue, depth, spaces)}`;
        case 'updated':
          return `${makeLeftSpaces(depth)}- ${keyName}: ${getValueString(prevValue, depth, spaces)}\n`
            .concat(`${makeLeftSpaces(depth)}+ ${keyName}: ${getValueString(newValue, depth, spaces)}`);
        default:
          throw new Error(`This type of change can't be parsed: ${conclusion}`);
      }
    });

    return `{\n${outputLines.join('\n')}\n${' '.repeat(depth * spaces - 4)}}`;
  };

  return makeLine(array);
};

export default makeStylishOutput;
