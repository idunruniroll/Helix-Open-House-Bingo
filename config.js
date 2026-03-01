cts = ['a8cb2d33fa9411be294a0b1b920302f163a59ff4dc7e098860df8a7f836cfa32', 'e893a53f4d177db2f0a31479dafb0ec39758cb352c50fdda75840434f2857263', '0266c84be6558526c14395e55dc9815598ef58ae2c60fa81fb70a6bc0fceb224', '37456b30a3947f30b6e561c5ac80e90075883e1d0afbb108d0dd747d6ae6cd5a', '82a4d8cf5a5dcf82422b8d2aa486f7856f489a98572dc24db688fcd1bce1b5fc', 'e782b0680e77d211819d7f64fbb05a7e06f5589af8ba99ca92588097800dd84f', 'd8d6629fc93f38364fd1e1f53ab9e09228fa8d4ce7d6faef5cff252256e2982a', 'b36d3aa575e4d949800652517c82814ad461f16e8142a081cb83bccdfa527386', '35fdd9c6a1352c51987f45a97417610dccff4c3d6fefcd4eec99e13b545c3cc6', '1246c12b2fb247ac5a259171f7a57e8d775bebf20a08252d0a678deed3a3793d', 'f4b8d51a8521adcb4d29a6e4f1f2dc54364c82a71a12cc1fbeb13a8c3444a874', 'e5d726fd9603cee650b680133186505c58896c92c4415f1155a664433eba84a1', 'b657bddc4947c87c7fd7d12fd08de655828909119c24bf54ee78c54993e550f7', '2cd9cf86ff2a055eed2a76f6faa8be8371a3d24c917bac55129c15eb240c0d7a']
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
