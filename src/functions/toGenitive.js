export default function toGenitive(originalStr) {
    
    if (typeof originalStr !== 'string') {
        console.error("Expected a string for 'originalStr', but got:", originalStr);
        return '';  // or you can return originalStr if you want to
    }

    const transformWord = (word) => {
        switch (word.toLowerCase()) {
            case "відділ": return "відділу";
            case "департамент": return "департаменту";
            case "фінансовий": return "фінансового";
            case "аналітик": return "аналітика";
            case "менеджер": return "менеджера";
            case "керівник": return "керівника";
            case "фахівець": return "фахівця";
            case "завідувач": return "завідувача";
            case "заступник": return "заступника";
            case "керуючий": return "керуючого";
            case "начальник": return "начальника";
            case "магазин": return "магазину";
            case "проектів": return "проєктів";
            case "помічник": return "помічника";
            case "команда": return "команди";
            case "провідний": return "провідного";
            case "продавець-консультант": return "продавця-консультанта";
            case "бухгалтер": return "бухгалтера";

            default: return word;
        }
    }

    const regex = /"(.*?)"/g;
    let match;
    let lastIndex = 0;
    let result = "";

    while ((match = regex.exec(originalStr)) !== null) {
        result += originalStr.substring(lastIndex, match.index);  // текст до кавичок
        result += match[1];  // текст в кавичках
        lastIndex = match.index + match[0].length;  // оновлення покажчика для наступної ітерації
    }

    result += originalStr.substring(lastIndex);  // додаємо решту тексту після останньої пари кавичок

    // Обробка всіх слів поза кавичками
    const transformedResult = result.split(' ').map(word => {
        if (word.startsWith('"') && word.endsWith('"')) {
            return word;  // слово в кавичках, не змінюємо його
        }
        return transformWord(word);
    }).join(' ');

    return transformedResult;
}