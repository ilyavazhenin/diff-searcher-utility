import compare from '../src/index.js';

test('flat objects, standard case, json', () => {
  const filepath1 = '__tests__/__fixtures__/file1.json';
  const filepath2 = '__tests__/__fixtures__/file2.json';
  const output = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(compare(filepath1, filepath2)).toEqual(output);
});

test('file 1 empty', () => {
  const filepath1 = '__tests__/__fixtures__/file1-empty.json';
  const filepath2 = '__tests__/__fixtures__/file2.json';
  const output = `{
  + host: hexlet.io
  + timeout: 20
  + verbose: true
}`;

  expect(compare(filepath1, filepath2)).toEqual(output);
});

test('files are the same', () => {
  const filepath1 = '__tests__/__fixtures__/file1.json';
  const filepath2 = '__tests__/__fixtures__/file2-equal-to-1.json';
  const output = `{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`;

  expect(compare(filepath1, filepath2)).toEqual(output);
});

test('same files, diff values', () => {
  const filepath1 = '__tests__/__fixtures__/file1.json';
  const filepath2 = '__tests__/__fixtures__/file2-diff-values.json';
  const output = `{
  - follow: false
  + follow: true
  - host: hexlet.io
  + host: google.com
  - proxy: 123.234.53.22
  + proxy: 8.8.8.8
  - timeout: 50
  + timeout: 150
}`;

  expect(compare(filepath1, filepath2)).toEqual(output);
});

// TODO: rework similar parts of paths in fixtures
test('nested json', () => {
  const filepath1 = '__tests__/__fixtures__/nested-file1.json';
  const filepath2 = '__tests__/__fixtures__/nested-file2.json';
  const output = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  expect(compare(filepath1, filepath2)).toEqual(output);
});
