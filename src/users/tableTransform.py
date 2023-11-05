import os
import json
import pandas as pd
from PIL import Image
import uuid

def clear_directory(directory_path):
    for filename in os.listdir(directory_path):
        file_path = os.path.join(directory_path, filename)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
        except Exception as e:
            print(f"Помилка під час видалення файлу {file_path}: {e}")

def generate_user_ids(users):
    user_ids = {}
    for user in users:
        user_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, user['name']))
        user_ids[user['name']] = user_id
    return user_ids

def process_excel_data(file_path):
    xlsx_file = file_path
    df = pd.read_excel(xlsx_file)

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

    df.fillna(value=pd.NA, inplace=True)

    def update_photo_link(link):
        if link.startswith('https://drive.google.com/open?id='):
            link = link.replace('https://drive.google.com/open?id=', 'https://drive.google.com/uc?export=view&id=')
        return link

    df['photo'] = df['photo'].apply(update_photo_link)

    if 'Офіс (ст.)' not in df.columns or 'Департамент (ст.)' not in df.columns \
        or 'Відділ (ст.)' not in df.columns or 'Посада (ст.)' not in df.columns:
        df['status'] = 'newbie'
    else:
        df['status'] = 'promoted'

    # Додайте логіку для визначення статі тут
    female_names = [
        "Албена", "Аліна", "Аліса", "Алла", "Альона", "Анастасія", "Ангеліна",
            "Анжела", "Анжеліка", "Аніта", "Анна", "Антоніна", "Аня", "Богдана", "Валентина",
            "Валерія", "Варвара", "Вероніка", "Вікторія", "Віра", "Віта", "Віталія",
            "Галина", "Ганна", "Дарина", "Даріна", "Дарія", "Дар'я", "Дар'яна", "Діана",
            "Євгенія", "Єлизавета", "Жанна", "Земфіра", "Іванна", "Ілона", "Інна",
            "Ірада", "Ірина", "Каріна", "Катерина", "Крістіна", "Ксенія", "Лариса",
            "Леся", "Лілія", "Ліна", "Любов", "Людмила", "Маргарита", "Марина", "Марія",
            "Марта", "Мар'яна", "Мирослава", "Міласлава", "Надія", "Наталія", "Наталья",
            "Наталя", "Неля", "Ніна", "Оксана", "Олександра", "Олена", "Олеся", "Ольга",
            "Поліна", "Раїса", "Руслана", "Свиноріз", "Світлана", "Софія", "Таїсія",
            "Тамара", "Тетяна", "Христина", "Юлія", "Яна", "Ярослава"    
    ]

    male_names = [
    "Анатолій", "Андрій", "Антон", "Артем", "Артур", "Богдан",
        "Борис", "Боріса", "Вадим", "Валентин", "Валерій", "Василь", "Віктор",
        "Віталій", "Владислав", "Володимир", "Вячеслав", "В'ячеслав", "Геннадій",
        "Данило", "Дем'ян", "Денис", "Ділявер", "Дмитро", "Ерік", "Євген", "Євгеній",
        "Єгор", "Жан", "Іван", "Ігор", "Ілля", "Кирило", "Костянтин", "Леонід",
        "Максим", "Микита", "Микола", "Михайло", "Назар", "Натан", "Олег",
        "Олександр", "Олексій", "Павло", "Роман", "Ростислав", "Руслан", "Святослав",
        "Сергій", "Станіслав", "Степан", "Тарас", "Федір", "Фелікс", "Франческо",
        "Юрій", "Ярослав"
    ]

    # Логіка для визначення статі
    def get_gender(name):
        # Розділити ім'я на слова за пробілами
        name_parts = name.split()

        # Перевірити, чи ім'я складається з більше ніж одного слова
        if len(name_parts) > 1:
            # Якщо ім'я складається з більше ніж одного слова, перевіряти на жіночість
            for part in name_parts:
                if part in female_names:
                    return 'female'
            # Якщо жіночих імен серед окремих слів ім'я не містить, повертати "male"
            return 'male'
        elif name in female_names:
            return 'female'
        elif name in male_names:
            return 'male'
        else:
            return 'male'

    df['sex'] = df['name'].apply(get_gender)

    # Перетворіть дані у формат JSON
    newbies_list = df.to_dict(orient='records')

    return newbies_list

def save_processed_data(data):
    result_file_path = os.path.join('results', 'newbies.js')
    with open(result_file_path, 'w', encoding='utf-8') as js_file:
        js_file.write('export const newbies = ')
        json.dump(data, js_file, ensure_ascii=False, indent=4)

def main():
    xlsx_file = 'newbies_october.xlsx'

    if os.path.exists('uploads'):
        clear_directory('uploads')
    else:
        os.makedirs('uploads')

    if os.path.exists('results'):
        clear_directory('results')
    else:
        os.makedirs('results')

    if os.path.exists('photos'):
        clear_directory('photos')
    else:
        os.makedirs('photos')

    # Завантаження документа та обробка даних
    document_path = os.path.join('uploads', os.path.basename(xlsx_file))
    newbies_list = process_excel_data(xlsx_file)

    user_ids = generate_user_ids(newbies_list)
    for user in newbies_list:
        user['id'] = user_ids[user['name']]

    save_processed_data(newbies_list)

    print("Дані та фото успішно оброблені та збережені.")

if __name__ == "__main__":
    main()
