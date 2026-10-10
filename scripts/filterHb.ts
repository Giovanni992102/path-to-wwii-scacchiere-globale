import * as fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/hb_names.json', 'utf8'));
const names = data.map((d: any) => d.name);

// Find all HB names in Europe / Balkans / Middle East / etc.
console.log('Nomi balcanici/europei in HB:');
console.log(names.filter((n: string) => n && ['Yugoslavia', 'Bosnia', 'Croatia', 'Serbia', 'Montenegro', 'Kosovo', 'Slovenia', 'Macedonia', 'Greece', 'Albania', 'Bulgaria', 'Romania', 'Hungary', 'Austria', 'Czechoslovakia', 'Poland', 'Germany', 'Italy', 'France', 'Spain', 'Portugal', 'United Kingdom', 'Ireland', 'Norway', 'Sweden', 'Finland', 'Denmark', 'Netherlands', 'Belgium', 'Luxembourg', 'Switzerland', 'Turkey'].some(k => n.includes(k))));

console.log('\nNomi Medio Oriente in HB:');
console.log(names.filter((n: string) => n && ['Syria', 'Lebanon', 'Palestine', 'Jordan', 'Iraq', 'Mesopotamia', 'Saudi', 'Hejaz', 'Nejd', 'Hail', 'Yemen', 'Oman', 'Trucial', 'Kuwait', 'Bahrain', 'Qatar', 'Cyprus', 'Iran', 'Persia', 'Turkey', 'Hatay', 'Alexandretta'].some(k => n.includes(k))));

console.log('\nNomi America Centrale / Caraibi / Sud America in HB:');
console.log(names.filter((n: string) => n && ['Panama', 'Canal', 'Costa Rica', 'Nicaragua', 'Honduras', 'Salvador', 'Guatemala', 'Belize', 'Cuba', 'Haiti', 'Dominican', 'Jamaica', 'Puerto Rico', 'Trinidad', 'Colombia', 'Venezuela', 'Guyana', 'Suriname', 'Ecuador', 'Peru', 'Bolivia', 'Brazil', 'Paraguay', 'Uruguay', 'Argentina', 'Chile', 'Falkland'].some(k => n.includes(k))));
