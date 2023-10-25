import React from 'react';
import convertName from '../functions/convertName';
import getSexWord from '../functions/getSexWord';
import toGenitive from '../functions/toGenitive';
import oldTextDepartment from '../functions/oldTextDepatrment';
import './user.scss';


const User = ({userdata}) => {
const {name, education, career, hobbies, photo, status, sex, department, division, position, office, exPosition, exDivision, exDepartment, exOffice} = userdata;

const newTextDepartment = (subdepartment, department) => {
    const parts = [subdepartment, department].filter(part => part !== null && part !== undefined);
    return parts.join(' ');
}


const textTitle = (status, name, sex, position, division, department, office, exDivision, exDepartment, exOffice, exPosition ) => {
    if (status === 'newbie') {
      return (`${convertName(name)} ${getSexWord(sex, "newbie")} на посаду ${toGenitive(position)} ${toGenitive(newTextDepartment(division, department))}.`)
    } 
    if (status === 'promoted') {
        return (`${convertName(name)} ${getSexWord(sex, "older")} до ${toGenitive(position)} ${toGenitive(newTextDepartment((division, department)))}. Раніше колега ${getSexWord(sex, "olderEarlier")} посаду ${toGenitive(exPosition)} ${toGenitive(oldTextDepartment(exDivision, exDepartment, exOffice, division, department, office))}.`)
    } 
}

return (
    <React.Fragment>
    <td className='userphoto'>
        <img src={photo} alt={`${name}'s portrait`} />
    </td>
    <td className='userinfo_text-block'>
        <h3>{textTitle(status, name, sex, position, division, department, office, exDivision, exDepartment, exOffice, exPosition)}</h3>
        <h3>Освіта</h3>
        <p>{education}</p>
        <h3>Кар'єра</h3>
        <p>{career}</p>
        <h3>Цікаві факти</h3>
        <p>{hobbies}</p>
    </td>
    </React.Fragment>
    )
}

export default User;