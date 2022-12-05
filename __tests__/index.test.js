import { jest } from '@jest/globals';
import showDiff from '../src/index.js';

test('flat objects, json', () => {
    const filepath1 = '__tests__/__fixtures__/file1.json';
    const filepath2 = '__tests__/__fixtures__/file2.json';
    const output =
    `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(showDiff(filepath1, filepath2)).toEqual(output);
  });