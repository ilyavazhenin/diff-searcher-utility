#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import { Command } from 'commander';
import _ from 'lodash';
import fs from 'fs';
// todo: add path and process.cwd

const program = new Command();

const showDiff = (path1, path2) => {
  const fileData1 = JSON.parse(fs.readFileSync(path1));
  const fileData2 = JSON.parse(fs.readFileSync(path2));

  const compare = (obj1, obj2) => {
    const arrayKeys1 = Object.keys(fileData1);
    const arrayKeys2 = Object.keys(fileData2);
    const uniqueKeysFrom1 = _.difference(arrayKeys1, arrayKeys2);
    const result = [];

    for (const key of uniqueKeysFrom1) {
      const sign = '  - ';
      result.push([key, obj1[key], sign]);
    }

    for (const key of arrayKeys1) {
      if (arrayKeys2.includes(key)) {
        if (obj2[key] === obj1[key]) {
          const sign = '    ';
          result.push([key, obj1[key], sign]);
        }

        if (obj2[key] !== obj1[key]) {
          let sign = '  - ';
          result.push([key, obj1[key], sign]);
          sign = '  + ';
          result.push([key, obj2[key], sign]);
        }
      }
    }

    for (const key of arrayKeys2) {
      if (!arrayKeys1.includes(key)) {
        const sign = '  + ';
        result.push([key, obj2[key], sign]);
      }
    }

    const sortedResult = _.sortBy(result, [0]);

    const resultArray = sortedResult.map((elem) => {
      const [key, value, sign] = elem;
      return `${sign}${key}: ${value}`;
    });
    resultArray.unshift('{');
    resultArray.push('}');
    const outputString = resultArray.join('\n');
    console.log(result);
    console.log(outputString);
    return outputString;
  };

  compare(fileData1, fileData2);
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action(showDiff);

program.parse();
