#!/usr/bin/env node
import { Command } from 'commander';
import showDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  // .action(showDiff);
  .action(() => {
    showDiff(program.args[0], program.args[1], program.opts().format);
  });

program.parse();
