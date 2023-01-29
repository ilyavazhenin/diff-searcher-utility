import fs from 'fs';
import showDiff from '../src/index.js';

const json1 = '__tests__/__fixtures__/test-data/nested-file1.json';
const json2 = '__tests__/__fixtures__/test-data/nested-file2.json';
const yaml1 = '__tests__/__fixtures__/test-data/nested-yaml1.yaml';
const yaml2 = '__tests__/__fixtures__/test-data/nested-yaml2.yaml';
const stylishExpected = fs.readFileSync('__tests__/__fixtures__/results/nested-stylish.txt', 'utf-8');
const plainExpected = fs.readFileSync('__tests__/__fixtures__/results/nested-plain.txt', 'utf-8');
const jsonExpected = fs.readFileSync('__tests__/__fixtures__/results/nested-json.json', 'utf-8');

test.each([
  { file1: json1, file2: json2, name: 'json' },
  { file1: yaml1, file2: yaml2, name: 'yaml' },
])('stylish output, nested ($name)', ({ file1, file2 }) => {
  expect(showDiff(file1, file2, 'stylish')).toBe(stylishExpected);
});

test.each([
  { file1: json1, file2: json2, name: 'json' },
  { file1: yaml1, file2: yaml2, name: 'yaml' },
])('plain output, nested ($name)', ({ file1, file2 }) => {
  expect(showDiff(file1, file2, 'plain')).toBe(plainExpected);
});

test.each([
  { file1: json1, file2: json2, name: 'json' },
  { file1: yaml1, file2: yaml2, name: 'yaml' },
])('json output, nested ($name)', ({ file1, file2 }) => {
  expect(showDiff(file1, file2, 'json')).toBe(jsonExpected);
});

test('wrong format', () => {
  expect(() => showDiff(json1, json2, 'someFormat'))
    .toThrow('Unknown format, available formats: stylish (default), plain, json.');
});

test('file 1 empty', () => {
  const filepath1 = '__tests__/__fixtures__/test-data/file1-empty.json';
  const filepath2 = '__tests__/__fixtures__/test-data/file2.json';
  const emptyExpected = fs.readFileSync('__tests__/__fixtures__/results/empty-file.txt', 'utf-8');
  expect(showDiff(filepath1, filepath2, 'stylish')).toEqual(emptyExpected);
});
