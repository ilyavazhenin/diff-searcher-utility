/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import parseFiles from './parser.js';
import makeOutputString from './formatter.js';

const compare = (filePath1, filePath2, format) => {
  // TODO: remove logs:
  console.log(filePath1, filePath2, format, 'all the args i got from input');
  const [object1, object2] = parseFiles(filePath1, filePath2);
  const recursiveCompare = (obj1, obj2, depth = 0) => {
    const arrayKeys1 = _.sortBy(Object.keys(obj1), [0]);
    const arrayKeys2 = _.sortBy(Object.keys(obj2), [0]);
    const tempArray = [];

    for (const key of arrayKeys1) {
      if (arrayKeys2.includes(key)) {
        // if they are NOT two objects at the same time:
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

        // if they ARE objects at the same time:
        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
          const currentDepth = depth + 1;
          tempArray.push([key, recursiveCompare(obj1[key], obj2[key], currentDepth), '    ', depth]);
        }
      } else { // if KEY isn't included in 2nd arr:
        if (!_.isObject(obj1[key])) {
          tempArray.push([key, obj1[key], '  - ', depth]);
        }

        if (_.isObject(obj1[key])) {
          tempArray.push([key, recursiveCompare(obj1[key], obj1[key], depth + 1), '  - ', depth]);
        }
      }
    }
    // check for unique keys that are ONLY in 2nd array:
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
    return makeOutputString(sortedChanges, format);
  };

  return recursiveCompare(object1, object2);
};

export default compare;
