import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import showDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (folderName, fileName) => path.join(__dirname, '..', '__fixtures__', folderName, fileName);
const readFile = (folderName, filename) => readFileSync(getFixturePath(folderName, filename), 'utf-8');

const json1 = getFixturePath('test-data', 'nested-file1.json');
const json2 = getFixturePath('test-data', 'nested-file2.json');
const yaml1 = getFixturePath('test-data', 'nested-yaml1.yaml');
const yaml2 = getFixturePath('test-data', 'nested-yaml2.yaml');
const stylishExpected = readFile('results', 'nested-stylish.txt');
const plainExpected = readFile('results', 'nested-plain.txt');
const jsonExpected = readFile('results', 'nested-json.json');
const emptyExpected = readFile('results', 'empty-file.txt');

test.each([
  { file1: json1, file2: json2, ext: 'json' },
  { file1: yaml1, file2: yaml2, ext: 'yaml' },
])('stylish output, nested ($ext)', ({ file1, file2 }) => {
  expect(showDiff(file1, file2, 'stylish')).toBe(stylishExpected);
});

test.each([
  { file1: json1, file2: json2, ext: 'json' },
  { file1: yaml1, file2: yaml2, ext: 'yaml' },
])('plain output, nested ($ext)', ({ file1, file2 }) => {
  expect(showDiff(file1, file2, 'plain')).toBe(plainExpected);
});

test.each([
  { file1: json1, file2: json2, ext: 'json' },
  { file1: yaml1, file2: yaml2, ext: 'yaml' },
])('json output, nested ($ext)', ({ file1, file2 }) => {
  expect(showDiff(file1, file2, 'json')).toBe(jsonExpected);
});

test('file 1 empty', () => {
  const filepath1 = getFixturePath('test-data', 'file1-empty.json');
  const filepath2 = getFixturePath('test-data', 'file2.json');
  expect(showDiff(filepath1, filepath2, 'stylish')).toEqual(emptyExpected);
});

test('wrong formatter', () => {
  expect(() => showDiff(json1, json2, 'someFormat'))
    .toThrow('Unknown formatter, available formatters: stylish (default), plain, json.');
});
