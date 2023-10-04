import json

# Імпортуємо масив newbies з файлу newbie.js

from newbie import newbies

# Конвертуємо масив у JSON формат
json_string = json.dumps(newbies, indent=4)

# Записуємо JSON рядок у новий файл
with open('newbies.json', 'w') as file:
    file.write(json_string)

print("Data has been written to newbies.json")
