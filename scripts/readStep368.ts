import * as fs from 'fs';

const step368 = JSON.parse(fs.readFileSync('scripts/step_modify_368.json', 'utf8'));
console.log('Tool call in step 368:', JSON.stringify(step368.tool_calls, null, 2).slice(0, 3000));
