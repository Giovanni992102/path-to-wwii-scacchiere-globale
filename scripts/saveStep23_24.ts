import * as fs from 'fs';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/ziani/.gemini/antigravity-ide/brain/b2c99fea-3c4e-42de-af09-ab5855a7fa4e/.system_generated/logs/transcript_full.jsonl'),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const obj = JSON.parse(line);
  if (obj.step_index === 23 || obj.step_index === 24) {
    console.log(`Step ${obj.step_index}:`);
    fs.writeFileSync(`scripts/step_${obj.step_index}.json`, JSON.stringify(obj, null, 2));
    console.log(`Saved scripts/step_${obj.step_index}.json`);
  }
});
