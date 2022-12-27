import _ from 'lodash';

// TODO: Separate formatters onto two modules!

const makeOutput = (array, format) => {
  const lineElements = [];
  if (format === 'stylish') {
    const spaces = '    ';
    let sign = '';

    array.forEach((object) => {
      const makeLineElem = () => `${spaces.repeat(object.depth)}${sign}${object.keyPath}`;

      if (object.conclusion === 'updated') {
        sign = '  - ';
        lineElements.push(`${makeLineElem()}: ${_.isArray(object.prevValue) ? makeOutput(object.prevValue, format).slice(0, -1).concat(`${spaces.repeat(object.depth + 1)}}`) : object.prevValue}`);
        sign = '  + ';
        lineElements.push(`${makeLineElem()}: ${_.isArray(object.newValue) ? makeOutput(object.newValue, format).slice(0, -1).concat(`${spaces.repeat(object.depth + 1)}}`) : object.newValue}`);
      }

      if (object.conclusion === 'removed') {
        sign = '  - ';
        lineElements.push(`${makeLineElem()}: ${_.isArray(object.prevValue) ? makeOutput(object.prevValue, format).slice(0, -1).concat(`${spaces.repeat(object.depth + 1)}}`) : object.prevValue}`);
      }

      if (object.conclusion === 'added') {
        sign = '  + ';
        lineElements.push(`${makeLineElem()}: ${_.isArray(object.newValue) ? makeOutput(object.newValue, format).slice(0, -1).concat(`${spaces.repeat(object.depth + 1)}}`) : object.newValue}`);
      }

      if (object.conclusion === 'no change') {
        sign = '    ';
        lineElements.push(`${makeLineElem()}: ${_.isArray(object.newValue) ? makeOutput(object.newValue, format).slice(0, -1).concat(`${spaces.repeat(object.depth + 1)}}`) : object.newValue}`);
      }
    });

    const outputArray = [
      '{',
      ...lineElements,
      '}',
    ];
    return outputArray.join('\n');
  }

  if (format === 'plain') {
    array.forEach((object) => {
      const prevValue = (typeof object.prevValue === 'boolean' || typeof object.prevValue === 'object') ? object.prevValue : `'${object.prevValue}'`;
      const newValue = (typeof object.newValue === 'boolean' || typeof object.newValue === 'object') ? object.newValue : `'${object.newValue}'`;

      const makeLineElem = () => `Property '${object.parentKey}' was`;

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
        lineElements.push(`${_.isArray(newValue) ? makeOutput(newValue, format) : makeLineElem().concat(`${newValue}`)}`);
      }
    });
  }
  const outputArray = [
    ...lineElements,
  ];
  return outputArray.join('\n');
};

export default makeOutput;
