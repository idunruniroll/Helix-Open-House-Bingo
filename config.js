cts = ['4326b63afe69aed147a42792505b7cc8e95a0d21f3b6b94063cb6d9f5ac15350', '8aaee142475fb4227c7255a21fe9603cae628090d9dd42fe2388156701a10c08', '878c124eaeee3d6d279c988ec206c092acba6187fdb7757fe124c136790d3944', '034c8191fa8d00c6e1f46419455fab790ff307cbb1f582c4dd4343bea8081be1', '81f9c89e609bd4eeacee834b729dfadd5969dc171aa1dd82417d512ef73a4737', '1d2b08baef7564de72c0038c0efe39ef77291d45a160b781db8a3ddff7bcf053', '5faecbf3ed5e93adacc2f0300e052da8d3864f976aacc06e9072e5198d34ca1e', '8301e7045a0a318130b04d3685da5d4bf564dded4c4855b7be8dad75b9574cfe', '34a82d6f6725db4e55a9273ecb03a43491098f6deed3ece9b9d3111b897a66cf', '34b31fb0515abd72c89fbac395c20d09afaab046e325574c15cc0ad97486e0e5', 'bfdfc0b679b6d5ea707f5e5209f4f425cafab46711b10976cb9af2e15c4f9e7c', '9526c5f5ece0f100a6703f2b32234d02cbaaadab88bff4e1d7917153f49f88ed', '6ab485f207e4bd6792ceacafeb56eded57d9c3a55cb5426706d6f33c0bf69b58', 'e84439095c7f3da17e7184fd03395fe9791db299ef01d864e4a17549a224cec2']
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


const items = {
    'Opening Talk': "Scan a QR code that will be shown during the Opening Talk.",
    'Hardware Badge': "Complete some challenges at the Hardware booth for this QR code AND a chance to get some limited GreyCTF hardware badge!",
    'ISC2 SG Youth Wing': "Engage with the ISC2 booth to get their QR code!",
    'Div0': "Follow <a href='https://www.instagram.com/div0_sg/'>@div0_sg</a> on instagram and show it at the Div0 Booth",
};

for(const name of names) {
    if (!items[name]) {
        items[name] = `Engage with the ${name} booth to get their QR code!`
    }
}
