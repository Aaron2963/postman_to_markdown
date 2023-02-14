import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { extname } from 'path';
import Request from './lib/request.js';
import Response from './lib/response.js';

const source = readdirSync('./src');
const sourceFiles = source.filter(file => extname(file) === '.json');

// number start from
let numStart = 1;
for (let i = 0; i < process.argv.length; i++) {
  if (['--start', '-s'].indexOf(process.argv[i]) !== -1 && process.argv[i + 1]) {
    numStart = parseInt(process.argv[i + 1]);
    break;
  }
}

function generateMarkdownFromJson(json, num = 1) {
  let lines = [];
  // collection title
  lines.push(`## ${num} ${json.info.name}`);
  lines.push('');
  lines.push(json.info.description);
  lines.push('');
  lines.push('');
  lines.push('');

  // add each request
  for (let i = 0; i < json.item.length; i++) {
    const req = new Request(json.item[i], json.auth);
    lines.push(`### ${num}.${i + 1} ${req.name}`);
    lines.push('');
    lines.push('```\n' + `${req.method.toUpperCase()} /${req.url}` + '\n```');
    lines.push('');
    lines.push(req.description);
    lines.push('');
    lines.push(`#### Request: ${req.getParamBrief()}`);
    lines.push('');
    if (req.hasHeaders) {
      lines.push('Headers\n');
      lines.push(req.getHeaderTable());
      if (req.headers != null && req.headers.length > 0) {
        lines.push('```\n' + req.headers.map(h => `${h.key}: ${h.value}`).join('\n') + '\n```');
      }
      lines.push('');
    }
    if (req.body != null) {
      lines.push('Body\n');
      lines.push(req.getBodyTable());
      lines.push('```\n' + req.getBodyExample() + '\n```');
      lines.push('');
    }
    for (let j = 0; j < json.item[i].response.length; j++) {
      const res = new Response(json.item[i].response[j]);
      lines.push(`#### Response: ${res.name}`);
      lines.push('');
      lines.push('```\n' + `Status: ${res.code} ${res.status}` + '\n```');
      lines.push(res.getBodyExample());
    }
    lines.push('');
    lines.push('');
  }

  return lines.join('\n') + '\n\n';
}

// execute
for (let i = 0; i < sourceFiles.length; i++) {
  const num = i + numStart;
  const file = readFileSync(`./src/${sourceFiles[i]}`, 'utf-8');
  const json = JSON.parse(file);
  const markdown = generateMarkdownFromJson(json, num);
  writeFileSync(`./dist/${sourceFiles[i].replace('.json', '.md')}`, markdown);
  console.log(`Done: ${num}. ${sourceFiles[i]} has been converted to markdown.`);
}

console.log('\x1b[33m%s\x1b[0m', 'All tasks done. Please check the markdown files in the dist folder.');