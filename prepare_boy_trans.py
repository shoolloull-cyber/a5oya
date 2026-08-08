import os
from PIL import Image

assets_dir = r"d:\suite2\public\assets"
boy_path = os.path.join(assets_dir, "boy_23.jpg")

if os.path.exists(boy_path):
    img = Image.open(boy_path).convert("RGBA")
    datas = img.get_flattened_data() if hasattr(img, 'get_flattened_data') else img.getdata()

    newData = []
    for item in datas:
        # Check if R, G, B are all very dark (near black background)
        r, g, b, a = item
        if r <= 25 and g <= 25 and b <= 25:
            newData.append((0, 0, 0, 0)) # transparent
        else:
            newData.append((r, g, b, a))

    img.putdata(newData)
    out_path = os.path.join(assets_dir, "boy_23_trans.png")
    img.save(out_path, "PNG")
    print(f"Saved transparent boy_23 image: {out_path}")
