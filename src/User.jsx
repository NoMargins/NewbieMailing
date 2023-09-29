import React from 'react';
import './user.scss';


const User = (userdata) => {
const {name, education, occupation, hobbies, photo, status, sex, department, subdepartment, position, exposition, exsubdepartment, exdepartment, exoffice} = userdata;

const newTextDepartment = () => {
    const parts = [subdepartment, department].filter(part => part !== null);
    return parts.join(' ');
}

const oldTextDepartment = () => {
    const parts = [exsubdepartment, exdepartment, exoffice].filter(part => part !== null);
    return parts.join(' ');
}


function toGenitive(originalStr) {
    const unifiedOriginalStr = originalStr.toLowerCase();
    const words = unifiedOriginalStr.split(' ');

    for (let i = 0; i < words.length; i++) {
        switch (words[i]) {
            case "відділ":
                words[i] = "відділу";
                break;
            case "департамент":
                words[i] = "департаменту";
                break;
            case "менеджер":
                    words[i] = "менеджера";
                    break;
            case "керівник":
                words[i] = "керівника";
                break;
            case "фахівець":
                    words[i] = "фахівця";
                    break;
            case "завідувач":
                words[i] = "завідувача";
                break;
           case "керуючий":
                    words[i] = "керуючого";
                    break;
         case "магазин":
                words[i] = "магазину";
                break;
        }
    }

    return words.join(' ');
}

const sexWordNewbie = sex === "female" ? 'прийнята' : "прийнятий";
const sexWordOlder = sex === "female" ? 'підвищена' : "підвищений";
const serWordOlderEarlier = sex === "female" ? 'обіймала' : "обіймав";

const textTitle = () => {
    if (status === 'newbie') {
      return (`${name} ${sexWordNewbie} на посаду ${toGenitive(position)} ${toGenitive(newTextDepartment)}.`)
    } 
    if (status === 'older') {
        return (`${name} ${sexWordOlder} на посаду ${toGenitive(position)} ${toGenitive(newTextDepartment)}. Раніше колега ${serWordOlderEarlier} посаду ${toGenitive(exposition)} ${toGenitive(oldTextDepartment)}`)
    } 
}

return (
    <li className='userinfo'>
<img src={photo} alt={`${name}'s portrait`}/>
        <div className='userinfo_text-block'>
        <h3>{textTitle}</h3>
        <h3>Освіта</h3>
        <p>{education}</p>
        <h3>Кар'єра</h3>
        <p>{occupation}</p>
        <h3>Цікаві факти</h3>
        <p>{hobbies}</p>
        </div>
    </li>
    )
}

export default User;