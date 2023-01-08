/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import parseFiles from './parser.js';
import makeStylishOutput from './formatters/stylish.js';
import makePlainOutput from './formatters/plain.js';
import makeJSONOutput from './formatters/json.js';

const compare = (filePath1, filePath2) => {
  const [object1, object2] = parseFiles(filePath1, filePath2);
  const recursiveCompare = (obj1, obj2, keyPath = '', depth = 0) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    const arrayOfChanges = [];

    keys1.forEach((key) => {
      const newKeyPath = `${keyPath}.${key}`;

      if (keys2.includes(key)) {
        // if keys are the same and not objects at the same time:
        if (obj1[key] === obj2[key]
          && (!_.isPlainObject(obj1[key]) || !_.isPlainObject(obj2[key]))) {
          const object = {
            keyName: `${key}`,
            keyPath: newKeyPath.slice(1),
            newValue: obj1[key],
            conclusion: 'no change',
            depth,
          };
          arrayOfChanges.push(object);
        }

        // if keys differ:
        if (obj1[key] !== obj2[key]
          && (!_.isPlainObject(obj1[key]) || !_.isPlainObject(obj2[key]))) {
          const object = {
            keyName: `${key}`,
            keyPath: newKeyPath.slice(1),

            prevValue: _.isPlainObject(obj1[key]) // go recursive if key is an object
              ? recursiveCompare(obj1[key], obj1[key], newKeyPath, depth + 1)
              : obj1[key],
            newValue: _.isPlainObject(obj2[key])
              ? recursiveCompare(obj2[key], obj2[key], newKeyPath, depth + 1)
              : obj2[key],

            conclusion: 'updated',
            depth,
          };
          arrayOfChanges.push(object);
        }

        // if keys both are objects, we go recursive into deep to get nested values:
        if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
          const object = {
            keyName: `${key}`,
            keyPath: newKeyPath.slice(1),
            newValue: recursiveCompare(obj1[key], obj2[key], newKeyPath, depth + 1),
            conclusion: 'no change',
            depth,
          };
          arrayOfChanges.push(object);
        }
      }

      // checking keys that exist only in first file:
      if (!keys2.includes(key)) {
        const object = {
          keyName: `${key}`,
          keyPath: newKeyPath.slice(1),
          prevValue: _.isPlainObject(obj1[key])
            ? recursiveCompare(obj1[key], obj1[key], newKeyPath, depth + 1)
            : obj1[key],

          conclusion: 'removed',
          depth,
        };
        arrayOfChanges.push(object);
      }
    });

    // checking keys that exist only in second file:
    keys2.forEach((key) => {
      const newKeyPath = `${keyPath}.${key}`;

      if (!keys1.includes(key)) {
        const object = {
          keyName: `${key}`,
          keyPath: newKeyPath.slice(1),
          newValue: _.isPlainObject(obj2[key])
            ? recursiveCompare(obj2[key], obj2[key], newKeyPath, depth + 1)
            : obj2[key],

          conclusion: 'added',
          depth,
        };
        arrayOfChanges.push(object);
      }
    });
    // console.log(_.sortBy(arrayOfChanges, ['keyName'])); TODO: uncomment to see object structure
    return _.sortBy(arrayOfChanges, ['keyName']);
  };

  return recursiveCompare(object1, object2);
};

const showDiff = (path1, path2, format = 'stylish') => {
  if (format === 'stylish') return makeStylishOutput(compare(path1, path2), format);
  if (format === 'plain') return makePlainOutput(compare(path1, path2), format);
  if (format === 'json') return makeJSONOutput(compare(path1, path2), format);
  throw new Error('\nUnknown format, available formats: stylish (default), plain, json.\n');
};

export default showDiff;
