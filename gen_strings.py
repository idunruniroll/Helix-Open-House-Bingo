import os
import hashlib
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import qrcode

# Function to generate a random 40-byte string
def generate_random_string():
    return os.urandom(40)

# Function to calculate SHA-256 hash of a given string
def calculate_sha256(data):
    sha256 = hashlib.sha256()
    sha256.update(data)
    return sha256.digest()

# Function to AES encrypt a plaintext using a given key
def aes_encrypt(key, plaintext):
    cipher = AES.new(key, AES.MODE_ECB)
    padded_plaintext = pad(plaintext.encode(), AES.block_size)
    return cipher.encrypt(padded_plaintext)

def save_qr_code(data, filename):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    
    img = qr.make_image(fill='black', back_color='white')
    img.save(filename)

stations = ['Helix Yogis','Let\'s Meditate!',
    'Helix Bean & Leaf',
    'Helix Heights',
    'Table Tennis',
    'Frisbee (Hucks)',
    'Floorball',
    'Helix Gym',
    'Pickle Ball',
    'Basketball/Volleyball',
    'Running',
    'Badminton',
    'Helix Readers/Helix Sustainability',
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
    'Helix Publicity'
    ]


assert len(stations) == 25, len(stations)

# Generate 12 random strings and their encrypted ciphertexts
N = 5
pairs = []
ciphertexts = []
pt = "helix{fr33_r3fr3ShmeNT_h00r4y}"
from pwn import xor
for i in range(N * 2 + 2):
    random_string = generate_random_string()
    hash_key = calculate_sha256(random_string)
    print("h", hash_key.hex())
    ciphertext = xor(pt.encode() + b"\0"*(40-len(pt)), hash_key)
    pairs.append([random_string[x:x+8].hex() for x in range(0, len(random_string), 8)])
    ciphertexts.append(ciphertext.hex())

rows = pairs[:N]
print("cts", ciphertexts)
cols = pairs[N:N*2]
diagonals = pairs[N*2:]

out = []
for i in range(N):
    for j in range(N):
        parts = [str(i), str(j)]
        # row
        parts.append(rows[i][j])
        # col
        parts.append(cols[j][i])
        if i == j:
            parts.append(diagonals[0][i])
        elif i == N - 1 - j:
            parts.append(diagonals[1][i])
        else:
            parts.append("")
        print(";".join(parts))
        save_qr_code(";".join(parts), f"./qr_codes/{stations[i*5 + j]}.png")