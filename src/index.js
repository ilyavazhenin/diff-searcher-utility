/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import parseFiles from './parser.js';

const makeOutputString = (arrayOfChanges) => {
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

  const outputArray = [
    '{',
    ...formattedArray,
  ];
  console.log(outputArray.join('\n'), 'OUTPUTSTRING'); // TODO: remove in production
  return outputArray.join('\n');
};

const compare = (filePath1, filePath2) => {
  const [object1, object2] = parseFiles(filePath1, filePath2);

  const recursiveCompare = (obj1, obj2, depth = 0) => {
    const arrayKeys1 = _.sortBy(Object.keys(obj1), [0]);
    const arrayKeys2 = _.sortBy(Object.keys(obj2), [0]);
    const tempArray = [];

    for (const key of arrayKeys1) {
      if (arrayKeys2.includes(key)) {
        if (!_.isObject(obj1[key]) || !_.isObject(obj2[key])) {
          if (obj2[key] === obj1[key]) {
            tempArray.push([key, obj1[key], '    ', depth]);
          }

          if (obj2[key] !== obj1[key]) {
            if (!_.isObject(obj1[key])) {
              tempArray.push([key, obj1[key], '  - ', depth]);
            }

            if (_.isObject(obj1[key])) {
              tempArray.push([key, recursiveCompare(obj1[key], obj1[key], depth + 1), '  - ', depth]);
            }

            if (!_.isObject(obj2[key])) {
              tempArray.push([key, obj2[key], '  + ', depth]);
            }

            if (_.isObject(obj2[key])) {
              tempArray.push([key, recursiveCompare(obj2[key], obj2[key], depth + 1), '  - ', depth]);
            }
          }
        }

        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
          const currentDepth = depth + 1;
          tempArray.push([key, recursiveCompare(obj1[key], obj2[key], currentDepth), '    ', depth]);
        }
      } else {
        if (!_.isObject(obj1[key])) {
          tempArray.push([key, _.cloneDeep(obj1[key]), '  - ', depth]);
        }

        if (_.isObject(obj1[key])) {
          tempArray.push([key, recursiveCompare(obj1[key], obj1[key], depth + 1), '  - ', depth]);
        }
      }
    }

    for (const key of arrayKeys2) {
      if (!arrayKeys1.includes(key)) {
        if (!_.isObject(obj2[key])) {
          tempArray.push([key, obj2[key], '  + ', depth]);
        }

        if (_.isObject(obj2[key])) {
          tempArray.push([key, recursiveCompare(obj2[key], obj2[key], depth + 1), '  + ', depth]);
        }
      }
    }

    const sortedChanges = _.sortBy(tempArray, [0]);
    return makeOutputString(sortedChanges);
  };

  return recursiveCompare(object1, object2);
};

export default compare;
