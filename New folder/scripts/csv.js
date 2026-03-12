import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const csvFilePath = 'C:/Users/as/Downloads/mkpremiumproperties-com-2026-02-25.csv';

const csvData = fs.readFileSync(csvFilePath, 'utf-8');

function csvToJson(csv) {
  const lines = csv.split('\n').filter(Boolean);

  return lines.map(line => {
    const [name, image, message, ...extra] = line.split(/\t|,/);
    return {
      name: name?.trim() || '',
      image: image?.trim() || '',
      message: [message, ...extra].filter(Boolean).join(' ').trim(),
      email: name.toLowerCase().trim().split(' ')[0] + '@gmail.com'
    };
  });
}

const jsonData = csvToJson(csvData);

fs.writeFileSync(join(__dirname, 'testimonials.json'), JSON.stringify(jsonData, null, 2));
console.log('✅ Converted CSV to JSON successfully!');