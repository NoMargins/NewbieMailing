import pandas as pd  # Додайте імпорт бібліотеки pandas
import json
import os
import requests
import PIL
from PIL import Image


# Завантажте дані з XLSX-файлу
xlsx_file = 'newbies_october.xlsx'
df = pd.read_excel(xlsx_file)

# Перейменуйте стовпці
column_mapping = {
    'ПІБ': 'name',
    'Освіта': 'education',
    'Хобі': 'hobbies',
    "Кар'єра": 'career',
    'Фото': 'photo',
    'Офіс (нов.)': 'office',
    'Департамент (нов.)': 'department',
    'Відділ (нов.)': 'division',
    'Посада (нов.)': 'position',
    'Статус': 'status',
    'Стать': 'sex',
    'Офіс (ст.)': 'exOffice',
    'Департамент (ст.)': 'exDepartment',
    'Відділ (ст.)': 'exDivision',
    'Посада (ст.)': 'exPosition',
}
df = df.rename(columns=column_mapping)

# Заповніть відсутні значення в колонках null
df.fillna(value=pd.NA, inplace=True)

# Редагування посилань на фото
def update_photo_link(link):
    if link.startswith('https://drive.google.com/open?id='):
        link = link.replace('https://drive.google.com/open?id=', 'https://drive.google.com/uc?export=view&id=')
    return link

df['photo'] = df['photo'].apply(update_photo_link)


# Створення папки для фотографій
if not os.path.exists('photos'):
    os.makedirs('photos')

# Завантаження та зменшення розміру фото, а також підписування їх прізвищем
for index, row in df.iterrows():
    photo_url = row['photo']
    response = requests.get(photo_url)
    if response.status_code == 200:
        # Отримання прізвища користувача (замість "name" ви можете використовувати відповідну назву стовпця)
        user_name = row['name']
        user_name = user_name.replace(' ', '_')  # Заміна пробілів на підкреслення
        content_type = response.headers.get('content-type')
        if 'image' in content_type:
            # Визначення розширення файлу на основі content-type
            file_extension = content_type.split('/')[-1]
            photo_path = os.path.join('photos', f'{user_name}.{file_extension}')
            with open(photo_path, 'wb') as file:
                file.write(response.content)
            # Зменшення розміру фото до 800 px по ширині
            img = Image.open(photo_path)
            width, height = img.size
            if width > 800:
                new_width = 800
                new_height = int(height * (new_width / width))
                img = img.resize((new_width, new_height), Image.LANCZOS)
                img.save(photo_path)
            # Збереження шляху до локального фото в стовпці "Фото"
            df.at[index, 'photo'] = photo_path
        else:
            print(f"Посилання на фото для {user_name} не є зображенням.")

# Перетворіть дані у формат JSON
newbies_list = df.to_dict(orient='records')

# Збережіть дані у файл newbies.js
with open('newbies.js', 'w', encoding='utf-8') as js_file:
    js_file.write('export const newbies = ')
    json.dump(newbies_list, js_file, ensure_ascii=False, indent=4)

print("Дані та фото успішно оброблені та збережені.")

