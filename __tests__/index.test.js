import showDiff from '../src/index.js';

test('wrong format', () => {
  const filepath1 = '__tests__/__fixtures__/nested-file1.json';
  const filepath2 = '__tests__/__fixtures__/nested-file2.json';

  expect(() => showDiff(filepath1, filepath2, 'someFormat')).toThrow('Unknown format, available formats: stylish (default), plain, json.');
});

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

test('json format output', () => {
  const filepath1 = '__tests__/__fixtures__/nested-file1.json';
  const filepath2 = '__tests__/__fixtures__/nested-file2.json';
  const output = '[{"keyName":"common","newValue":[{"keyName":"follow","newValue":false,"conclusion":"added"},{"keyName":"setting1","newValue":"Value 1","conclusion":"no change"},{"keyName":"setting2","prevValue":200,"conclusion":"removed"},{"keyName":"setting3","prevValue":true,"newValue":null,"conclusion":"updated"},{"keyName":"setting4","newValue":"blah blah","conclusion":"added"},{"keyName":"setting5","newValue":{"key5":"value5"},"conclusion":"added"},{"keyName":"setting6","newValue":[{"keyName":"doge","newValue":[{"keyName":"wow","prevValue":"","newValue":"so much","conclusion":"updated"}],"conclusion":"nested"},{"keyName":"key","newValue":"value","conclusion":"no change"},{"keyName":"ops","newValue":"vops","conclusion":"added"}],"conclusion":"nested"}],"conclusion":"nested"},{"keyName":"group1","newValue":[{"keyName":"baz","prevValue":"bas","newValue":"bars","conclusion":"updated"},{"keyName":"foo","newValue":"bar","conclusion":"no change"},{"keyName":"nest","prevValue":{"key":"value"},"newValue":"str","conclusion":"updated"}],"conclusion":"nested"},{"keyName":"group2","prevValue":{"abc":12345,"deep":{"id":45}},"conclusion":"removed"},{"keyName":"group3","newValue":{"deep":{"id":{"number":45}},"fee":100500},"conclusion":"added"}]';

  expect(showDiff(filepath1, filepath2, 'json')).toEqual(output);
});
