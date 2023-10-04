export default function replaceQuotesWithUkrainian(document) {
    const nodes = document.querySelectorAll('*:not(script):not(style)');
    for (let node of nodes) {
        if (node.childNodes.length > 0) {
            node.childNodes.forEach(child => {
                if (child.nodeType === 3) { // Перевірка, чи є дитина текстовим вузлом
                    child.textContent = child.textContent
                        .replace(/"(.*?)"/g, '«$1»')
                        .replace(/ - /g, ' — ') // Заміна дефісу, оточеного пробілами, на довге тире
                        .replace(/\s+\./g, '.'); // Прибирання зайвих пробілів перед крапкою
                }
            });
        }
    }
}
