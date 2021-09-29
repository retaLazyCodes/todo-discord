let myList;

const initUser = (username) => {
    try {
        myList = [];
        return `Usuario '${username}' registrado pa`
    } catch (error) {
        console.log(error)
        return `uy, algo c rompió`
    }
}

const getList = () => {
    // Conectarse a la DB y obtener la lista del usuario autor del mensaje
    if (myList.length === 0) {
        return `Tu lista está vacía`
    }
    let stringList = "\n";
    myList.forEach(element => {
        stringList += element + "\n"
    })
    return `\nTu lista es: ${stringList}`
}

const addElement = (el) => {
    if (myList.includes(el)) {
        return `El elemento ya existe en la lista`;
    }
    myList.push(el)
    return `Agregaste '${el}' a "La Lista"`;
}

const removeElement = (el) => {
    const count = myList.length
    myList = myList.filter(e => e !== el)

    if (count === myList.length) {
        return `El elemento '${el}' no existe en la lista`;
    }
    else {
        return `Quitaste '${el}' de "La Lista"`;
    }
}

module.exports = {
    getList,
    addElement,
    removeElement,
    initUser
}