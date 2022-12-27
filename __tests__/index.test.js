import showDiff from '../src/index.js';

test('file 1 empty', () => {
  const filepath1 = '__tests__/__fixtures__/file1-empty.json';
  const filepath2 = '__tests__/__fixtures__/file2.json';
  const output = `{
  + host: hexlet.io
  + timeout: 20
  + verbose: true
}`;

  expect(showDiff(filepath1, filepath2, 'stylish')).toEqual(output);
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

  expect(showDiff(filepath1, filepath2, 'stylish')).toEqual(output);
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

  expect(showDiff(filepath1, filepath2, 'stylish')).toEqual(output);
});

// TODO: rework similar parts of paths in fixtures
test('stylish recursive yaml', () => {
  const filepath1 = '__tests__/__fixtures__/nested-yaml1.yaml';
  const filepath2 = '__tests__/__fixtures__/nested-yaml2.yaml';
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

  expect(showDiff(filepath1, filepath2, 'stylish')).toEqual(output);
});

// TODO: rework similar parts of paths in fixtures
test('stylish recursive json', () => {
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

  expect(showDiff(filepath1, filepath2, 'stylish')).toEqual(output);
});

test('flat files', () => {
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

  expect(showDiff(filepath1, filepath2, 'stylish')).toEqual(output);
});

test('plain recursive json', () => {
  const filepath1 = '__tests__/__fixtures__/nested-file1.json';
  const filepath2 = '__tests__/__fixtures__/nested-file2.json';
  const output = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  expect(showDiff(filepath1, filepath2, 'plain')).toEqual(output);
});

test('plain recursive yaml', () => {
  const filepath1 = '__tests__/__fixtures__/nested-yaml1.yaml';
  const filepath2 = '__tests__/__fixtures__/nested-yaml2.yaml';
  const output = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  expect(showDiff(filepath1, filepath2, 'plain')).toEqual(output);
});
