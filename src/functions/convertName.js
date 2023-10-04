export default function convertName(name) {
    // Розбиваємо рядок на слова за пробілами
    const parts = name.split(' ');
  
    // Перевіряємо кількість слів
    switch(parts.length) {
      case 2:
        // Для формату "Прізвище Ім'я" просто повертаємо "Ім'я Прізвище"
        return `${parts[1]} ${parts[0]}`;
      case 3:
        // Для формату "Прізвище Ім'я По батькові" повертаємо "Ім'я Прізвище"
        return `${parts[1]} ${parts[0]}`;
      default:
        // Якщо інший формат, повертаємо початковий рядок
        return name;
    }
  }
  