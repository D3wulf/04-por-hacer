//esto es el file system, para cuando tengamos todo poder sacarlo en archivo
const fs = require('fs')

//guardaremos las cosas en un array
let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    //recordar los 3 argumentos que recibe writefile
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('no se pudo grabar', err);


    });


}

const cargarDB = () => {

    //usamos el try  por si da error de json por estar vacio u otro error
    try {
        //para cargar info de un json
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }

}




//aqui es donde se añaden los datos al array
const crear = (descripcion) => {
        //antes de nada cargaremos la base de datos
        cargarDB();

        let porHacer = {
            descripcion,
            completado: false
        };

        listadoPorHacer.push(porHacer);

        guardarDB();
        return porHacer;
    }
    //no recibe argumento!! :()
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();
    //para saber la tarea a la que nos referimos
    let index = listadoPorHacer.findIndex(tarea => {
            //aqui chequeamos que la tarea que enviamos esta en la base de datos
            return tarea.descripcion === descripcion;
        })
        //esto es posicion de array, el 0 es la primera posicion
    if (index >= 0) {
        //listadopor hacer de la posicion index sera igual a completado
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}
const borrar = (descripcion) => {

    cargarDB();
    //filter retorna un nuevo array

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    //para saber si se borro algo las longitudes deben de coincidir o no
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

}


module.exports = {

    crear,
    getListado,
    actualizar,
    borrar

}