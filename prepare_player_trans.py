import os
from PIL import Image

assets_dir = r"d:\suite2\public\assets"
player_path = os.path.join(assets_dir, "player_frame.png")

img = Image.open(player_path).convert("RGBA")
width, height = img.size

# We will create a transparent version where white outside and inside screen are transparent or styled
newData = []

for y in range(height):
    for x in range(width):
        r, g, b, a = img.getpixel((x, y))
        # If white pixel (outer background OR inner screen area)
        if r > 240 and g > 240 and b > 240:
            # Check if it's inside the inner screen region: X(40-334), Y(100-380)
            if 40 <= x <= 334 and 95 <= y <= 378:
                newData.append((0, 0, 0, 0)) # inner screen transparent
            else:
                newData.append((0, 0, 0, 0)) # outer background transparent
        else:
            newData.append((r, g, b, a))

img.putdata(newData)
out_path = os.path.join(assets_dir, "player_frame_trans.png")
img.save(out_path, "PNG")
print(f"Saved transparent player frame: {out_path}")
