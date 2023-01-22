import _ from 'lodash';

const recursiveCompare = (obj1, obj2, keyPath = '', depth = 0) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const unitedUniqueKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unitedUniqueKeys);

  const arrayOfDiff = sortedKeys.map((key) => {
    const newKeyPath = `${keyPath}.${key}`;

    if (!keys2.includes(key)) {
      return {
        keyName: `${key}`,
        keyPath: newKeyPath.slice(1),
        prevValue: _.isPlainObject(obj1[key]) // go recursive if key is an object
          ? recursiveCompare(obj1[key], obj1[key], newKeyPath, depth + 1)
          : obj1[key],

        conclusion: 'removed',
        depth,
      };
    }

    if (!keys1.includes(key)) {
      return {
        keyName: `${key}`,
        keyPath: newKeyPath.slice(1),
        newValue: _.isPlainObject(obj2[key])
          ? recursiveCompare(obj2[key], obj2[key], newKeyPath, depth + 1)
          : obj2[key],

        conclusion: 'added',
        depth,
      };
    }

    if (obj1[key] === obj2[key]
      && (!_.isPlainObject(obj1[key]) || !_.isPlainObject(obj2[key]))) {
      return {
        keyName: `${key}`,
        keyPath: newKeyPath.slice(1),
        newValue: obj1[key],
        conclusion: 'no change',
        depth,
      };
    }

    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        keyName: `${key}`,
        keyPath: newKeyPath.slice(1),
        newValue: recursiveCompare(obj1[key], obj2[key], newKeyPath, depth + 1),
        conclusion: 'nested',
        depth,
      };
    }

    // when values of keys are not equal:
    return {
      keyName: `${key}`,
      keyPath: newKeyPath.slice(1),

      prevValue: _.isPlainObject(obj1[key])
        ? recursiveCompare(obj1[key], obj1[key], newKeyPath, depth + 1)
        : obj1[key],
      newValue: _.isPlainObject(obj2[key])
        ? recursiveCompare(obj2[key], obj2[key], newKeyPath, depth + 1)
        : obj2[key],

      conclusion: 'updated',
      depth,
    };
  });
  // TODO: uncomment to see object structure"
  // console.log(arrayOfDiff);
  return arrayOfDiff;
};

export default recursiveCompare;
