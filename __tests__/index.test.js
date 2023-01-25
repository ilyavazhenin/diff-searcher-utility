import fs from 'fs';
import showDiff from '../src/index.js';

test('wrong format', () => {
  const filepath1 = '__tests__/__fixtures__/test-data/nested-file1.json';
  const filepath2 = '__tests__/__fixtures__/test-data/nested-file2.json';

  expect(() => showDiff(filepath1, filepath2, 'someFormat')).toThrow('Unknown format, available formats: stylish (default), plain, json.');
});

test('file 1 empty', () => {
  const filepath1 = '__tests__/__fixtures__/test-data/file1-empty.json';
  const filepath2 = '__tests__/__fixtures__/test-data/file2.json';
  const emptyResult = fs.readFileSync('__tests__/__fixtures__/results/empty-file.txt', 'utf-8');

  expect(showDiff(filepath1, filepath2, 'stylish')).toEqual(emptyResult);
});

test('files are the same', () => {
  const filepath1 = '__tests__/__fixtures__/test-data/file1.json';
  const filepath2 = '__tests__/__fixtures__/test-data/file2-equal-to-1.json';
  const equalResult = fs.readFileSync('__tests__/__fixtures__/results/equal-files.txt', 'utf-8');

  expect(showDiff(filepath1, filepath2, 'stylish')).toEqual(equalResult);
});

// TODO: rework similar parts of paths in fixtures
test('stylish recursive yaml', () => {
  const filepath1 = '__tests__/__fixtures__/test-data/nested-yaml1.yaml';
  const filepath2 = '__tests__/__fixtures__/test-data/nested-yaml2.yaml';
  const stylishYamlResult = fs.readFileSync('__tests__/__fixtures__/results/nested-stylish-yaml.txt', 'utf-8');

  expect(showDiff(filepath1, filepath2, 'stylish')).toEqual(stylishYamlResult);
});

test('stylish recursive json', () => {
  const filepath1 = '__tests__/__fixtures__/test-data/nested-file1.json';
  const filepath2 = '__tests__/__fixtures__/test-data/nested-file2.json';
  const stylishJsonResult = fs.readFileSync('__tests__/__fixtures__/results/nested-stylish-json.txt', 'utf-8');

  expect(showDiff(filepath1, filepath2, 'stylish')).toEqual(stylishJsonResult);
});

test('flat files', () => {
  const filepath1 = '__tests__/__fixtures__/test-data/file1.json';
  const filepath2 = '__tests__/__fixtures__/test-data/file2.json';
  const flatResult = fs.readFileSync('__tests__/__fixtures__/results/flat-files.txt', 'utf-8');

  expect(showDiff(filepath1, filepath2, 'stylish')).toEqual(flatResult);
});

test('plain recursive json', () => {
  const filepath1 = '__tests__/__fixtures__/test-data/nested-file1.json';
  const filepath2 = '__tests__/__fixtures__/test-data/nested-file2.json';
  const plainJsonResult = fs.readFileSync('__tests__/__fixtures__/results/nested-plain-json.txt', 'utf-8');

  expect(showDiff(filepath1, filepath2, 'plain')).toEqual(plainJsonResult);
});

test('plain recursive yaml', () => {
  const filepath1 = '__tests__/__fixtures__/test-data/nested-yaml1.yaml';
  const filepath2 = '__tests__/__fixtures__/test-data/nested-yaml2.yaml';
  const plainYamlResult = fs.readFileSync('__tests__/__fixtures__/results/nested-plain-yaml.txt', 'utf-8');

  expect(showDiff(filepath1, filepath2, 'plain')).toEqual(plainYamlResult);
});

test('json format output', () => {
  const filepath1 = '__tests__/__fixtures__/test-data/nested-file1.json';
  const filepath2 = '__tests__/__fixtures__/test-data/nested-file2.json';
  const jsonFormatterResult = fs.readFileSync('__tests__/__fixtures__/results/nested-json-json.json', 'utf-8');

  expect(showDiff(filepath1, filepath2, 'json')).toEqual(jsonFormatterResult);
});
