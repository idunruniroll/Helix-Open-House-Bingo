// generate_qrs.js
const QRCode = require('qrcode');
const fs     = require('fs');
const path   = require('path');

// ---- bring in your fixed arrays ----
// 14 entries for a 6x6 board: 6 rows, 6 cols, main diag, anti‑diag
cts = ['4326b63afe69aed147a42792505b7cc8e95a0d21f3b6b94063cb6d9f5ac15350',
  '8aaee142475fb4227c7255a21fe9603cae628090d9dd42fe2388156701a10c08',
  '878c124eaeee3d6d279c988ec206c092acba6187fdb7757fe124c136790d3944',
  '034c8191fa8d00c6e1f46419455fab790ff307cbb1f582c4dd4343bea8081be1',
  '81f9c89e609bd4eeacee834b729dfadd5969dc171aa1dd82417d512ef73a4737',
  '1d2b08baef7564de72c0038c0efe39ef77291d45a160b781db8a3ddff7bcf053',
  '5faecbf3ed5e93adacc2f0300e052da8d3864f976aacc06e9072e5198d34ca1e',
  '8301e7045a0a318130b04d3685da5d4bf564dded4c4855b7be8dad75b9574cfe',
  '34a82d6f6725db4e55a9273ecb03a43491098f6deed3ece9b9d3111b897a66cf',
  '34b31fb0515abd72c89fbac395c20d09afaab046e325574c15cc0ad97486e0e5',
  'bfdfc0b679b6d5ea707f5e5209f4f425cafab46711b10976cb9af2e15c4f9e7c',
  '9526c5f5ece0f100a6703f2b32234d02cbaaadab88bff4e1d7917153f49f88ed',
  '6ab485f207e4bd6792ceacafeb56eded57d9c3a55cb5426706d6f33c0bf69b58',
  'e84439095c7f3da17e7184fd03395fe9791db299ef01d864e4a17549a224cec2']

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
