// generate_qrs.js
const QRCode = require('qrcode');
const fs     = require('fs');
const path   = require('path');

// ---- bring in your fixed arrays ----
// 14 entries for a 6x6 board: 6 rows, 6 cols, main diag, anti‑diag
cts = ['a8cb2d33fa9411be294a0b1b920302f163a59ff4dc7e098860df8a7f836cfa32',
  'e893a53f4d177db2f0a31479dafb0ec39758cb352c50fdda75840434f2857263',
  '0266c84be6558526c14395e55dc9815598ef58ae2c60fa81fb70a6bc0fceb224',
  '37456b30a3947f30b6e561c5ac80e90075883e1d0afbb108d0dd747d6ae6cd5a',
  '82a4d8cf5a5dcf82422b8d2aa486f7856f489a98572dc24db688fcd1bce1b5fc',
  'e782b0680e77d211819d7f64fbb05a7e06f5589af8ba99ca92588097800dd84f',
  'd8d6629fc93f38364fd1e1f53ab9e09228fa8d4ce7d6faef5cff252256e2982a',
  'b36d3aa575e4d949800652517c82814ad461f16e8142a081cb83bccdfa527386',
  '35fdd9c6a1352c51987f45a97417610dccff4c3d6fefcd4eec99e13b545c3cc6',
  '1246c12b2fb247ac5a259171f7a57e8d775bebf20a08252d0a678deed3a3793d',
  'f4b8d51a8521adcb4d29a6e4f1f2dc54364c82a71a12cc1fbeb13a8c3444a874',
  'e5d726fd9603cee650b680133186505c58896c92c4415f1155a664433eba84a1',
  'b657bddc4947c87c7fd7d12fd08de655828909119c24bf54ee78c54993e550f7',
  '2cd9cf86ff2a055eed2a76f6faa8be8371a3d24c917bac55129c15eb240c0d7a']

const names = ['Helix Yogis','Let\'s Meditate!',
    'Helix Bean & Leaf',
    'Helix Heights',
    'Table Tennis',
    'Frisbee (Hucks)',
    'Floorball',
    'Helix Gym',
    'Pickle Ball',
    'Basketball',
    'Volleyball',
    'Running',
    'Badminton',
    'Helix Readers',
    'Helix Band',
    'Crochet Club',
    'Dance Society',
    'Helix Photography Club',
    'Helix Gardening',
    'Helix Oven & Stove',
    'heArt',
    'Helix Knights',
    'Helix Games',
    'Helix Heritage',
    'Helix House Board Friends Forever',
    'Helix Publicity',
    'Helix Peer Circle',
    'Tennis',
    'Helix Footy',
    'UTown Talk',
    'UTown Booth',
    'Helix Tour',
    'Helix MURALS'
    ]

// make sure output folder exists
const outDir = path.resolve(__dirname, 'qr_output');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

(async () => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const idx     = row * GRID_SIZE + col;
       const label   = names[idx].replace(/\s+/g,'_');
      // pick your cts indices:
      const rowHash  = cts[row];
      const colHash  = cts[GRID_SIZE + col];
      const diagHash =
        row === col            ? cts[2 * GRID_SIZE] :
        row + col === GRID_SIZE - 1 ? cts[2 * GRID_SIZE + 1] :
        '' ;
      const payload = [ row, col, rowHash, colHash, diagHash ].join(';');

      const filePath = path.join(outDir, `${label}_${row}_${col}.png`);
      await QRCode.toFile(filePath, payload, {
        width:  400,   // px
        margin: 2
      });
      console.log('✅', filePath);
    }
  }
  console.log('\nAll QR codes generated in ./qr_output');
})();
