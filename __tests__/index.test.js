import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import showDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (folderName, fileName) => path.join(__dirname, '..', '__fixtures__', folderName, fileName);
const readFile = (folderName, filename) => readFileSync(getFixturePath(folderName, filename), 'utf-8');

test.each([
  ['nested-file1.json', 'nested-file2.json', 'stylish', 'nested-stylish.txt'],
  ['nested-yaml1.yaml', 'nested-yaml2.yaml', 'stylish', 'nested-stylish.txt'],
  ['nested-file1.json', 'nested-file2.json', 'plain', 'nested-plain.txt'],
  ['nested-yaml1.yaml', 'nested-yaml2.yaml', 'plain', 'nested-plain.txt'],
  ['nested-file1.json', 'nested-file2.json', 'json', 'nested-json.json'],
  ['nested-yaml1.yaml', 'nested-yaml2.yaml', 'json', 'nested-json.json'],
  ['file1-empty.json', 'file2.json', 'stylish', 'empty-file.txt'],
])('Comparing "%s" and "%s" with "%s" formatter equals to "%s"', (fName1, fName2, frmt, expected) => {
  const result = readFile('results', expected);
  const file1 = getFixturePath('test-data', fName1);
  const file2 = getFixturePath('test-data', fName2);
  expect(showDiff(file1, file2, frmt)).toBe(result);
});

test('Wrong formatter', () => {
  const file1 = getFixturePath('test-data', 'nested-file1.json');
  const file2 = getFixturePath('test-data', 'nested-file2.json');
  expect(() => showDiff(file1, file2, 'someFormat'))
    .toThrow('Unknown formatter, available formatters: stylish (default), plain, json.');
});
