import * as fs from 'fs';

const lines = fs.readFileSync('src/data/historicalBorders.ts', 'utf8').split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Polish Corridor') || lines[i].includes('POL_CORRIDOR') || lines[i].includes('MEMEL')) {
    console.log(`Line ${i + 1}: ${lines[i]}`);
  }
}
