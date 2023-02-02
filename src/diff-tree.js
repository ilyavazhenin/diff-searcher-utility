import _ from 'lodash';

const makeDiffTree = (objectData1, objectData2) => {
  const recursiveCompare = (obj1, obj2) => {
    const unitedUniqueKeys = _.union(Object.keys(obj1), Object.keys(obj2));
    const sortedKeys = _.sortBy(unitedUniqueKeys);

    return sortedKeys.map((key) => {
      if (!_.has(obj2, key)) return { keyName: `${key}`, prevValue: obj1[key], conclusion: 'removed' };
      if (!_.has(obj1, key)) return { keyName: `${key}`, newValue: obj2[key], conclusion: 'added' };
      if (obj1[key] === obj2[key]) return { keyName: `${key}`, newValue: obj1[key], conclusion: 'no change' };

      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        return { keyName: `${key}`, newValue: recursiveCompare(obj1[key], obj2[key]), conclusion: 'nested' };
      }

      return {
        keyName: `${key}`,
        prevValue: obj1[key],
        newValue: obj2[key],
        conclusion: 'updated',
      };
    });
  };

  return recursiveCompare(objectData1, objectData2);
};

export default makeDiffTree;
