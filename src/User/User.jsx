import React from 'react';
import convertName from '../functions/convertName';
import getSexWord from '../functions/getSexWord';
import toGenitive from '../functions/toGenitive';
import oldTextDepartment from '../functions/oldTextDepatrment';
import './user.scss';


const User = ({userdata}) => {
const {name, education, occupation, hobbies, photo, status, sex, department, subdepartment, position, exposition, exsubDep, exdepartment, exoffice} = userdata;

const newTextDepartment = (subdepartment, department) => {
    const parts = [subdepartment, department].filter(part => part !== null && part !== undefined);
    return parts.join(' ');
}


const textTitle = (status, name, sex, position, subdepartment, department, exposition, exsubDep, exdepartment, exoffice, office ) => {
    if (status === 'newbie') {
      return (`${convertName(name)} ${getSexWord(sex, "newbie")} на посаду ${toGenitive(position)} ${toGenitive(newTextDepartment(subdepartment, department))}.`)
    } 
    if (status === 'promoted') {
        return (`${convertName(name)} ${getSexWord(sex, "older")} до ${toGenitive(position)} ${toGenitive(newTextDepartment((subdepartment, department)))}. Раніше колега ${getSexWord(sex, "olderEarlier")} посаду ${toGenitive(exposition)} ${toGenitive(oldTextDepartment(exsubDep, exdepartment, exoffice, subdepartment, department, office))}.`)
    } 
}

return (
    <React.Fragment>
    <td className='userphoto'>
        <img src={photo} alt={`${name}'s portrait`} />
    </td>
    <td className='userinfo_text-block'>
        <h3>{textTitle(status, name, sex, position, subdepartment, department, exposition, exsubDep, exdepartment, exoffice)}</h3>
        <h3>Освіта</h3>
        <p>{education}</p>
        <h3>Кар'єра</h3>
        <p>{occupation}</p>
        <h3>Цікаві факти</h3>
        <p>{hobbies}</p>
    </td>
    </React.Fragment>
    )
}

export default User;