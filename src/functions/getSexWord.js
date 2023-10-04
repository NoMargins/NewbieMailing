export default function getSexWord(sex, status) {
    switch(status) {
        case 'newbie':
            return sex === "female" ? 'прийнята' : "прийнятий";
        case 'older':
            return sex === "female" ? 'підвищена' : "підвищений";
        case 'olderEarlier':
            return sex === "female" ? 'обіймала' : "обіймав";
        default:
            return '';
    }
}