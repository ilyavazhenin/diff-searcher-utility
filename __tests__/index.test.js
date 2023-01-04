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

test('json format output', () => {
  const filepath1 = '__tests__/__fixtures__/nested-file1.json';
  const filepath2 = '__tests__/__fixtures__/nested-file2.json';
  const output = '{"prevValue":[{"newValue":false,"keyName":"follow","keyPath":"common.follow","conclusion":"added","depth":1},{"prevValue":"Value 1","newValue":"Value 1","keyName":"setting1","keyPath":"common.setting1","conclusion":"no change","depth":1},{"prevValue":200,"keyName":"setting2","keyPath":"common.setting2","conclusion":"removed","depth":1},{"prevValue":true,"newValue":null,"keyName":"setting3","keyPath":"common.setting3","conclusion":"updated","depth":1},{"newValue":"blah blah","keyName":"setting4","keyPath":"common.setting4","conclusion":"added","depth":1},{"newValue":[{"prevValue":"value5","newValue":"value5","keyName":"key5","keyPath":"common.setting5.key5","conclusion":"no change","depth":2}],"keyName":"setting5","keyPath":"common.setting5","conclusion":"added","depth":1},{"prevValue":[{"prevValue":[{"prevValue":"","newValue":"so much","keyName":"wow","keyPath":"common.setting6.doge.wow","conclusion":"updated","depth":3}],"newValue":[{"prevValue":"","newValue":"so much","keyName":"wow","keyPath":"common.setting6.doge.wow","conclusion":"updated","depth":3}],"keyName":"doge","keyPath":"common.setting6.doge","conclusion":"no change","depth":2},{"prevValue":"value","newValue":"value","keyName":"key","keyPath":"common.setting6.key","conclusion":"no change","depth":2},{"newValue":"vops","keyName":"ops","keyPath":"common.setting6.ops","conclusion":"added","depth":2}],"newValue":[{"prevValue":[{"prevValue":"","newValue":"so much","keyName":"wow","keyPath":"common.setting6.doge.wow","conclusion":"updated","depth":3}],"newValue":[{"prevValue":"","newValue":"so much","keyName":"wow","keyPath":"common.setting6.doge.wow","conclusion":"updated","depth":3}],"keyName":"doge","keyPath":"common.setting6.doge","conclusion":"no change","depth":2},{"prevValue":"value","newValue":"value","keyName":"key","keyPath":"common.setting6.key","conclusion":"no change","depth":2},{"newValue":"vops","keyName":"ops","keyPath":"common.setting6.ops","conclusion":"added","depth":2}],"keyName":"setting6","keyPath":"common.setting6","conclusion":"no change","depth":1}],"newValue":[{"newValue":false,"keyName":"follow","keyPath":"common.follow","conclusion":"added","depth":1},{"prevValue":"Value 1","newValue":"Value 1","keyName":"setting1","keyPath":"common.setting1","conclusion":"no change","depth":1},{"prevValue":200,"keyName":"setting2","keyPath":"common.setting2","conclusion":"removed","depth":1},{"prevValue":true,"newValue":null,"keyName":"setting3","keyPath":"common.setting3","conclusion":"updated","depth":1},{"newValue":"blah blah","keyName":"setting4","keyPath":"common.setting4","conclusion":"added","depth":1},{"newValue":[{"prevValue":"value5","newValue":"value5","keyName":"key5","keyPath":"common.setting5.key5","conclusion":"no change","depth":2}],"keyName":"setting5","keyPath":"common.setting5","conclusion":"added","depth":1},{"prevValue":[{"prevValue":[{"prevValue":"","newValue":"so much","keyName":"wow","keyPath":"common.setting6.doge.wow","conclusion":"updated","depth":3}],"newValue":[{"prevValue":"","newValue":"so much","keyName":"wow","keyPath":"common.setting6.doge.wow","conclusion":"updated","depth":3}],"keyName":"doge","keyPath":"common.setting6.doge","conclusion":"no change","depth":2},{"prevValue":"value","newValue":"value","keyName":"key","keyPath":"common.setting6.key","conclusion":"no change","depth":2},{"newValue":"vops","keyName":"ops","keyPath":"common.setting6.ops","conclusion":"added","depth":2}],"newValue":[{"prevValue":[{"prevValue":"","newValue":"so much","keyName":"wow","keyPath":"common.setting6.doge.wow","conclusion":"updated","depth":3}],"newValue":[{"prevValue":"","newValue":"so much","keyName":"wow","keyPath":"common.setting6.doge.wow","conclusion":"updated","depth":3}],"keyName":"doge","keyPath":"common.setting6.doge","conclusion":"no change","depth":2},{"prevValue":"value","newValue":"value","keyName":"key","keyPath":"common.setting6.key","conclusion":"no change","depth":2},{"newValue":"vops","keyName":"ops","keyPath":"common.setting6.ops","conclusion":"added","depth":2}],"keyName":"setting6","keyPath":"common.setting6","conclusion":"no change","depth":1}],"keyName":"common","keyPath":"common","conclusion":"no change","depth":0},{"prevValue":[{"prevValue":"bas","newValue":"bars","keyName":"baz","keyPath":"group1.baz","conclusion":"updated","depth":1},{"prevValue":"bar","newValue":"bar","keyName":"foo","keyPath":"group1.foo","conclusion":"no change","depth":1},{"prevValue":[{"prevValue":"value","newValue":"value","keyName":"key","keyPath":"group1.nest.key","conclusion":"no change","depth":2}],"newValue":"str","keyName":"nest","keyPath":"group1.nest","conclusion":"updated","depth":1}],"newValue":[{"prevValue":"bas","newValue":"bars","keyName":"baz","keyPath":"group1.baz","conclusion":"updated","depth":1},{"prevValue":"bar","newValue":"bar","keyName":"foo","keyPath":"group1.foo","conclusion":"no change","depth":1},{"prevValue":[{"prevValue":"value","newValue":"value","keyName":"key","keyPath":"group1.nest.key","conclusion":"no change","depth":2}],"newValue":"str","keyName":"nest","keyPath":"group1.nest","conclusion":"updated","depth":1}],"keyName":"group1","keyPath":"group1","conclusion":"no change","depth":0},{"prevValue":[{"prevValue":12345,"newValue":12345,"keyName":"abc","keyPath":"group2.abc","conclusion":"no change","depth":1},{"prevValue":[{"prevValue":45,"newValue":45,"keyName":"id","keyPath":"group2.deep.id","conclusion":"no change","depth":2}],"newValue":[{"prevValue":45,"newValue":45,"keyName":"id","keyPath":"group2.deep.id","conclusion":"no change","depth":2}],"keyName":"deep","keyPath":"group2.deep","conclusion":"no change","depth":1}],"keyName":"group2","keyPath":"group2","conclusion":"removed","depth":0},{"newValue":[{"prevValue":[{"prevValue":[{"prevValue":45,"newValue":45,"keyName":"number","keyPath":"group3.deep.id.number","conclusion":"no change","depth":3}],"newValue":[{"prevValue":45,"newValue":45,"keyName":"number","keyPath":"group3.deep.id.number","conclusion":"no change","depth":3}],"keyName":"id","keyPath":"group3.deep.id","conclusion":"no change","depth":2}],"newValue":[{"prevValue":[{"prevValue":45,"newValue":45,"keyName":"number","keyPath":"group3.deep.id.number","conclusion":"no change","depth":3}],"newValue":[{"prevValue":45,"newValue":45,"keyName":"number","keyPath":"group3.deep.id.number","conclusion":"no change","depth":3}],"keyName":"id","keyPath":"group3.deep.id","conclusion":"no change","depth":2}],"keyName":"deep","keyPath":"group3.deep","conclusion":"no change","depth":1},{"prevValue":100500,"newValue":100500,"keyName":"fee","keyPath":"group3.fee","conclusion":"no change","depth":1}],"keyName":"group3","keyPath":"group3","conclusion":"added","depth":0}';

  expect(showDiff(filepath1, filepath2, 'json')).toEqual(output);
});
