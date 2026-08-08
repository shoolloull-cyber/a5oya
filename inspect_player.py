import os
from PIL import Image

assets_dir = r"d:\suite2\public\assets"
player_path = os.path.join(assets_dir, "player_frame.png")

img = Image.open(player_path).convert("RGBA")
width, height = img.size
print(f"Player frame size: {width}x{height}")

# Find bounding box of the inner white screen area
datas = img.get_flattened_data() if hasattr(img, 'get_flattened_data') else img.getdata()

min_x, min_y, max_x, max_y = width, height, 0, 0
for y in range(height):
    for x in range(width):
        r, g, b, a = img.getpixel((x, y))
        if r > 240 and g > 240 and b > 240: # white screen
            if x < min_x: min_x = x
            if x > max_x: max_x = x
            if y < min_y: min_y = y
            if y > max_y: max_y = y

print(f"White screen bounds: X({min_x} to {max_x}), Y({min_y} to {max_y})")
print(f"Screen width: {max_x - min_x}, height: {max_y - min_y}")
