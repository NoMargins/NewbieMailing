import requests
import os
import json
from PIL import Image

def download_image(url, filename):
    response = requests.get(url, stream=True)
    with open(filename, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)

def resize_image(input_filename, output_filename):
    with Image.open(input_filename) as img:
        aspect_ratio = img.height / img.width
        new_width = 600
        new_height = int(new_width * aspect_ratio)
        img = img.resize((new_width, new_height))
        img.save(output_filename)

# Завантаження і обробка зображень
with open('newbies.json', 'r', encoding='utf-8') as file:
    newbies_data = json.load(file)

for newbie in newbies_data:
    img_url = newbie['photo']
    user_name = "_".join(newbie['name'].split())
    temp_filename = "temp_image.jpg"
    
    # Завантаження зображення
    download_image(img_url, temp_filename)
    
    # Зміна розміру та збереження із відповідним іменем
    output_filename = user_name + ".jpg"
    resize_image(temp_filename, output_filename)
    
    print(f"Processed image for {newbie['name']}")

# Видалення тимчасового файлу
os.remove(temp_filename)
