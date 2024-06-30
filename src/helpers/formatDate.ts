const formatDate = (dateString: Date) : string => {
    // Crea un objeto Date a partir del string
    const date: Date = new Date(dateString);
    
    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }

    // Obtener el día, mes y año de la fecha
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1; 
    const year: number = date.getFullYear();

    // Asegurar que el día y el mes tengan dos dígitos
    const formattedDay: string = day < 10 ? '0' + day : day.toString();
    const formattedMonth: string = month < 10 ? '0' + month : month.toString();

    // Devolver cadena en formato dd/mm/yyyy
    return `${formattedDay}/${formattedMonth}/${year}`;
}

export default formatDate;