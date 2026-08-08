import os
import shutil

src = r"C:\Users\Extra\.gemini\antigravity-ide\brain\dcf50023-5231-4f78-87ce-3404388ee054"
dst = r"d:\suite2\public\assets"

shutil.copy(os.path.join(src, "media__1786194068868.png"), os.path.join(dst, "player_frame.png"))
shutil.copy(os.path.join(src, "media__1786194226745.png"), os.path.join(dst, "message_ref.png"))

print("Copied new assets successfully!")
