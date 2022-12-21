const makeStylishOutput = (arrayOfChanges, format) => {
  let outputArray = [];
  console.log(format, 'format in formatter to check'); // TODO: remove logs
  if (format === 'stylish') {
    const spaces = '    ';
    const formattedArray = arrayOfChanges.map((elem) => {
      const [key, value, sign, depth] = elem;
      const newElem = `${spaces.repeat(depth)}${sign}${key}: ${value}`;

      if (newElem.includes('{')) {
        return `${newElem.slice(0, -2)}\n${spaces.repeat(depth + 1)}}`;
      }
      return newElem;
    });

    formattedArray.push('}');

    outputArray = [
      '{',
      ...formattedArray,
    ];
  }
  console.log(outputArray.join('\n'), 'FINAL OUTPUT');
  return outputArray.join('\n');
};

export default makeStylishOutput;
