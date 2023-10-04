const oldTextDepartment = (exsubdepartment, exdepartment, exoffice, subdepartment, department, office) => {
    if (exsubdepartment === subdepartment && exdepartment === department) {
        exsubdepartment = "цього самого відділу";
        exdepartment = "";
        exoffice = "";
    }
    if (exdepartment === department) {
        exdepartment = "цього самого департаменту";
    }
    if (exoffice === office) {
        exoffice = ""; 
    }
    const parts = [exsubdepartment, exdepartment, exoffice].filter(part => part !== null && part !== undefined);
    return parts.join(' ');
}

export default oldTextDepartment;
