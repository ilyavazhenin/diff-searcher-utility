import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import showDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (folderName, fileName) => path.join(__dirname, '..', '__fixtures__', folderName, fileName);
const readFile = (folderName, filename) => readFileSync(getFixturePath(folderName, filename), 'utf-8');

test.each([
  ['file1.json', 'file2.json', 'stylish', 'stylish-res.txt'],
  ['yaml1.yaml', 'yaml2.yaml', 'stylish', 'stylish-res.txt'],
  ['file1.json', 'file2.json', 'plain', 'plain-res.txt'],
  ['yaml1.yaml', 'yaml2.yaml', 'plain', 'plain-res.txt'],
  ['file1.json', 'file2.json', 'json', 'json-res.json'],
  ['yaml1.yaml', 'yaml2.yaml', 'json', 'json-res.json'],
  ['file-empty.json', 'flat-file2.json', 'stylish', 'empty-res.txt'],
])('Comparing "%s" and "%s" with "%s" formatter equals to "%s"', (fName1, fName2, frmt, expected) => {
  const result = readFile('results', expected);
  const file1 = getFixturePath('test-data', fName1);
  const file2 = getFixturePath('test-data', fName2);
  expect(showDiff(file1, file2, frmt)).toBe(result);
});

test('Wrong formatter', () => {
  const file1 = getFixturePath('test-data', 'file1.json');
  const file2 = getFixturePath('test-data', 'file2.json');
  expect(() => showDiff(file1, file2, 'someFormat'))
    .toThrow('Unknown formatter, available formatters: stylish (default), plain, json.');
});
