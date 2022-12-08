// parses yaml or json files depending on incoming format variable
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

// to do: перенести сюда парсинг json

// yaml parsing:
const doc = yaml.load(fs.readFileSync('__tests__/__fixtures__/file2.yaml', 'utf8'));
console.log(doc);

// json parsing:

// to do:
    // алгоритм парсинга 
    // 1: считываем пути
    // 2. определяем формат по расширению файла, endsWith,
    // 3. отправляем на нужную ветку парсинга (ямл или джейсон)