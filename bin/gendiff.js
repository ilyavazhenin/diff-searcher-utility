#!/usr/bin/env node
import { Command } from 'commander';
import _ from 'lodash';
import fs from 'fs';

const program = new Command();

const showDiff = (path1, path2) => {
  console.log('\npath1 and path2 here and their contents:\n');
  const file1Obj = JSON.parse(fs.readFileSync(path1));
  const file2Obj = JSON.parse(fs.readFileSync(path2));
  console.log(path1, '\n', file1Obj, '\n\n', path2, '\n', file2Obj);
};


program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action(showDiff);

program.parse();
