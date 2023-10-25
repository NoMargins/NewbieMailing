const oldTextDepartment = (exDivision, exDepartment, exOffice, division, department, office) => {
    if (exDivision === division && exDepartment === department) {
        exDivision = "цього самого відділу";
        exDepartment = "";
        exOffice = "";
    }
    if (exDivision != division && exDepartment === department) {
        exDepartment = "цього самого департаменту";
    }
    if (exOffice === office) {
        exOffice = ""; 
    }
    const parts = [exDivision, exDepartment, exOffice].filter(part => part !== null && part !== undefined);
    return parts.join(' ');
}

export default oldTextDepartment;
