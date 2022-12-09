/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

const makeOutputString = (arrayOfChanges) => {
  const formattedArray = arrayOfChanges.map((elem) => {
    const [key, value, sign] = elem;
    return `${sign}${key}: ${value}`;
  });
  formattedArray.unshift('{');
  formattedArray.push('}');
  const outputString = formattedArray.join('\n');
  console.log(outputString);
  return outputString;
};

const compare = (obj1, obj2) => {
  const arrayKeys1 = Object.keys(obj1);
  console.log(arrayKeys1); // to do: remove in production
  const arrayKeys2 = Object.keys(obj2);
  console.log(arrayKeys2); // to do: remove in production
  const tempArray = [];

  for (const key of arrayKeys1) {
    if (arrayKeys2.includes(key)) {
      if (obj2[key] === obj1[key]) tempArray.push([key, obj1[key], '    ']);

      if (obj2[key] !== obj1[key]) {
        tempArray.push([key, obj1[key], '  - ']);
        tempArray.push([key, obj2[key], '  + ']);
      }
    } else tempArray.push([key, obj1[key], '  - ']);
  }

  for (const key of arrayKeys2) {
    if (!arrayKeys1.includes(key)) tempArray.push([key, obj2[key], '  + ']);
  }

  const sortedChanges = _.sortBy(tempArray, [0]);
  return makeOutputString(sortedChanges);
};

export default compare;
