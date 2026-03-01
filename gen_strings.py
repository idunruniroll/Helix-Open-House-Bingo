import os, hashlib
import qrcode
from pwn import xor

def calculate_sha256(data: bytes) -> bytes:
    return hashlib.sha256(data).digest()

def save_qr_code(data, filename):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    img.save(filename)

# ---- CONFIG ----
N = 6  # 6x6
FREE_SPACES = {(0,0), (2,3), (5,5)}
pt = "helix{fr33_r3fr3ShmeNT_h00r4y}"

stations = [
    'Helix Yogis',"Let's Meditate!",
    'Helix Bean & Leaf','Helix Heights','Table Tennis',
    'Frisbee (Hucks)','Floorball','Helix Gym','Pickle Ball','Basketball',
    'Volleyball','Running','Badminton','Helix Readers','Helix Band',
    'Crochet Club','Dance Society','Helix Photography Club','Helix Gardening','Helix Oven & Stove',
    'heArt','Helix Knights','Helix Games','Helix Heritage','Helix House Board Friends Forever',
    'Helix Publicity','Helix Peer Circle','Tennis','Helix Footy','UTown Talk',
    'UTown Booth','Helix Tour','Helix MURALS'
]

# ✅ Expect 36 - 3 = 33 stations
expected = N*N - len(FREE_SPACES)
assert len(stations) == expected, f"need {expected} stations (36 - free spaces), got {len(stations)}"

os.makedirs("./qr_codes", exist_ok=True)

# ---- GENERATE LINE SECRETS ----
pairs = []
cts = []

pt_bytes = pt.encode().ljust(32, b"\0")[:32]  # match sha256 length (32)

# 6 rows + 6 cols + 2 diagonals = 14 line keys
for _ in range(N * 2 + 2):
    random_string = os.urandom(N * 8)          # 48 bytes -> 6 chunks
    hash_key = calculate_sha256(random_string) # 32 bytes

    ciphertext = xor(pt_bytes, hash_key)
    cts.append(ciphertext.hex())

    parts = [random_string[i:i+8].hex() for i in range(0, len(random_string), 8)]
    assert len(parts) == N, f"expected {N} parts, got {len(parts)}"
    pairs.append(parts)

rows = pairs[:N]           # rows[i][j]
cols = pairs[N:N*2]        # cols[j][i]
diags = pairs[N*2:]        # diags[0][i], diags[1][i]

print("cts =", cts)
assert len(cts) == N*2 + 2, f"expected {N*2+2} cts, got {len(cts)}"

# ---- MAKE QR CODES ----
station_iter = iter(stations)
generated = 0

for i in range(N):
    for j in range(N):
        if (i, j) in FREE_SPACES:
            continue  # no QR for free cells

        station_name = next(station_iter)

        parts = [str(i), str(j)]
        parts.append(rows[i][j])
        parts.append(cols[j][i])

        if i == j:
            parts.append(diags[0][i])
        elif i == N - 1 - j:
            parts.append(diags[1][i])
        else:
            parts.append("")

        payload = ";".join(parts)
        filename = f"./qr_codes/{station_name}.png"
        save_qr_code(payload, filename)
        generated += 1

# ✅ should generate 33 QR codes
print("Generated QRs:", generated)
assert generated == expected, f"expected {expected} QR codes, got {generated}"

# ✅ ensure we consumed all station names
try:
    next(station_iter)
    raise RuntimeError("Too many stations: some were not used")
except StopIteration:
    pass
