#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import { Command } from 'commander';
import _ from 'lodash';
import fs from 'fs';
// todo: add path and process.cwd

const program = new Command();

const showDiff = (path1, path2) => {
  console.log('\npath1 and path2 here and their contents:\n');
  const fileData1 = JSON.parse(fs.readFileSync(path1));
  const fileData2 = JSON.parse(fs.readFileSync(path2));
  console.log(path1, '\n', fileData1, '\n\n', path2, '\n', fileData2);

  const compare = (obj1, obj2) => {
    const arrayKeys1 = Object.keys(obj1);
    const arrayKeys2 = Object.keys(obj2);
    const uniqueKeysFrom1 = _.difference(arrayKeys1, arrayKeys2);
    const result = {};

    // todo: расписать все в нормальные условия по ифам/свитчам, и возможно в один цикл.
    for (let key of uniqueKeysFrom1) {
      const keyValue = obj1[key];
      key = `  - ${key}`;
      result[key] = keyValue;
    }

    for (const key of arrayKeys1) {
      if (arrayKeys2.includes(key) && obj2[key] === obj1[key]) {
        const formattedKey = `    ${key}`;
        result[formattedKey] = obj1[key];
      }
    }

    for (const key of arrayKeys1) {
      if (arrayKeys2.includes(key) && obj2[key] !== obj1[key]) {
        let formattedKey = `  - ${key}`;
        result[formattedKey] = obj1[key];
        formattedKey = `  + ${key}`;
        result[formattedKey] = obj2[key];
      }
    }

    //  уникальные из второго массива, которых нет в первом
    for (const key of arrayKeys2) {
      if (!arrayKeys1.includes(key)) {
        const formattedKey = `  + ${key}`;
        result[formattedKey] = obj2[key];
      }
    }

    console.log('result:\n', result);
    console.log('============');
    console.log('{');
    for (const key in result) {
      if (key) console.log(`${key}: ${result[key]}`);
    }
    console.log('}');
    return result;
  };

  compare(fileData1, fileData2);
  // todo: не забыть отсортировать в конце вывод через sortBy из лодаша
  // todo: сделать вывод из цикла for in в консоль лог нормальный, а не через кучу мутаций.
  // То етсь елси поппадает под условие (нет в файле, есть в файле, разные значения и т д.
  // Возможно!! то сразу выводим в консоль лог
  // а еще лучше собрать структуру данных где есть ключ: + - = и значение keysign: {key: value})
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action(showDiff);

program.parse();
