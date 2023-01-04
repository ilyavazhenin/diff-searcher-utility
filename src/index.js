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
    const keys1 = _.sortBy(Object.keys(obj1), [0]);
    const keys2 = _.sortBy(Object.keys(obj2), [0]);

    const arrayOfChanges = [];

    keys1.forEach((key) => {
      if (keys2.includes(key)) {
        if (obj1[key] === obj2[key]
          && (!_.isPlainObject(obj1[key]) || !_.isPlainObject(obj2[key]))) {
          const object = {
            prevValue: obj1[key],
            newValue: obj2[key],
            keyName: `${key}`,
            keyPath: `${keyPath}.${key}`.slice(1),
            conclusion: 'no change',
            depth,
          };
          arrayOfChanges.push(object);
        }

        if (obj1[key] !== obj2[key]
          && (!_.isPlainObject(obj1[key]) || !_.isPlainObject(obj2[key]))) {
          const object = {
            prevValue: _.isPlainObject(obj1[key]) ? recursiveCompare(obj1[key], obj1[key], `${keyPath}.${key}`, depth + 1) : obj1[key],
            newValue: _.isPlainObject(obj2[key]) ? recursiveCompare(obj2[key], obj2[key], `${keyPath}.${key}`, depth + 1) : obj2[key],
            keyName: `${key}`,
            keyPath: `${keyPath}.${key}`.slice(1),
            conclusion: 'updated',
            depth,
          };
          arrayOfChanges.push(object);
        }

        if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
          const object = {
            prevValue: recursiveCompare(obj1[key], obj2[key], `${keyPath}.${key}`, depth + 1),
            newValue: recursiveCompare(obj1[key], obj2[key], `${keyPath}.${key}`, depth + 1),
            keyName: `${key}`,
            keyPath: `${keyPath}.${key}`.slice(1),
            conclusion: 'no change',
            depth,
          };
          arrayOfChanges.push(object);
        }
      }

      if (!keys2.includes(key)) {
        const object = {
          prevValue: _.isPlainObject(obj1[key]) ? recursiveCompare(obj1[key], obj1[key], `${keyPath}.${key}`, depth + 1) : obj1[key],
          keyName: `${key}`,
          keyPath: `${keyPath}.${key}`.slice(1),
          conclusion: 'removed',
          depth,
        };
        arrayOfChanges.push(object);
      }
    });

    keys2.forEach((key) => {
      if (!keys1.includes(key)) {
        const object = {
          newValue: _.isPlainObject(obj2[key]) ? recursiveCompare(obj2[key], obj2[key], `${keyPath}.${key}`, depth + 1) : obj2[key],
          keyName: `${key}`,
          keyPath: `${keyPath}.${key}`.slice(1),
          conclusion: 'added',
          depth,
        };
        arrayOfChanges.push(object);
      }
    });
    return _.sortBy(arrayOfChanges, ['keyName']);
  };

  return recursiveCompare(object1, object2);
};

const showDiff = (path1, path2, format) => {
  if (format === 'stylish') return makeStylishOutput(compare(path1, path2), format);
  if (format === 'plain') return makePlainOutput(compare(path1, path2), format);
  if (format === 'json') return makeJSONOutput(compare(path1, path2), format);
  throw new Error('\nUnknown format, available formats: stylish (default), plain, json.\n');
};
export default showDiff;
