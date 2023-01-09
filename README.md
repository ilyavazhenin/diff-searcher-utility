### Hexlet tests, linter status, codeclimate and test coverage:
[![Actions Status](https://github.com/ilyavazhenin/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/ilyavazhenin/frontend-project-46/actions) [![ESLINT + JEST ci](https://github.com/ilyavazhenin/frontend-project-46/actions/workflows/eslint_and_jest_ci.yml/badge.svg)](https://github.com/ilyavazhenin/frontend-project-46/actions/workflows/eslint_and_jest_ci.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/1f098b6f8bd3f77e4f2f/maintainability)](https://codeclimate.com/github/ilyavazhenin/frontend-project-46/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/1f098b6f8bd3f77e4f2f/test_coverage)](https://codeclimate.com/github/ilyavazhenin/frontend-project-46/test_coverage)

## What we got here?
It's a JS library that finds diff between two files and shows this diff in command line.
Works with JSON and YAML formats. Has 3 output formats: stylish (by default), plain and json.

## How to use
```
gendiff -f <format> <file-path-1> <file-path-2>
```

For example:
```
gendiff -f plain src/smth.json src/hello.json
```

And you see the result (for plain format):
```
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

### Demo
[![asciicast](https://asciinema.org/a/9pE9Taj5WwUnApy9f4UIZnVGw.svg)](https://asciinema.org/a/9pE9Taj5WwUnApy9f4UIZnVGw)