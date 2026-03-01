// generate_qrs.js
const QRCode = require('qrcode');
const fs     = require('fs');
const path   = require('path');

// ---- bring in your fixed arrays ----
// 14 entries for a 6x6 board: 6 rows, 6 cols, main diag, anti‑diag
cts = ['0550e73186eb174ca44dcbc29199d41ffbb80d92b7a133799d1c8ad58171fe9f',
  'ea66fd4750fad5641047b5830782a54397591454f148372544d4a5ced6cfde3d',
  '5b543f9451407f0d39b7c348e9af66922a871488e737aeb0ee935c9934f14db6',
  '90f505e9bafd2bf4954ab90ff627fd75676a89b2b3261fbbe0a134824f0e84c8',
  '0bc1cde69daaa7d7381a91d0ec240f483b89e15683968507f6ec2ad902c54315',
  '9393d48c096eb4af0f3ece22968d05db1e672e8ef03cbdd76eae630665aa3454',
  'b36b2c93ffeec181696f1dfbfca10eaf87262ee546e4e0aa054bf2d24b68f363',
  'dd99eb36dcd83e29e566589c193bdf3641694471e96b5398d104fdc32ec53d66',
  '869b15df4cf8273127dd2492eda8850539b9a5279d73378a2c98845b52f87383',
  'f170c6cc1bb1f3d043734733e5c23c7ce693e6c3eccedff1a0a7c540184f4328',
  '67410e7d0201cc90bc51d24ff7f3632b6c7f504992688a1509ba30278227d0bb',
  '9eeb5e449f279d40be14e914182751959c0a45ecd441a6ae8ee12d0f393cdf61',
  '4e625f1e66f4a1f0837eb84f582a50305f2de8395e48abf7f599171a82d24369',
  '366e8bdde13eb5aac3f18c4225e534065340559ca6d0187871146c3318a12477']

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
