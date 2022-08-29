const { match } = require('assert');
const fs= require('fs');
const { resolve } = require('path');


class Contenedor{
    constructor(name){
        this.name = name
    }

    async Save (informacion){
        try{
            // Se lee el JSON con todos los productos y se parsea para que la terminal lo pueda leer
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidoJSON = JSON.parse(contenido);
            // Se Buscar el ultimo ID para hacerlo progresivo
            let ultimoIndice = contenidoJSON.length - 1
            let ultimoID = contenidoJSON[ultimoIndice].id
            informacion.id = ultimoID + 1 
            //Se Pushea y se escribe en el documento 
            contenidoJSON.push(informacion)
            await fs.promises.writeFile(`./${this.name}` , JSON.stringify(contenidoJSON) )
            // Se retorna el resultado
            return informacion.id
        }
        catch(error){
            console.log(error)
        }
    }

    async GetById(id){
        try{
            // Se lee el JSON con todos los productos y se parsea para que la terminal lo pueda leer
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidoJSON = JSON.parse(contenido);
            // Se recorre el array para buscar el Id con filter
            let contenidoExtraidoDelArray = contenidoJSON.filter((item)=> item.id == id)
            //Se verifica si existe o no en el array 
            if( contenidoExtraidoDelArray.length){
                return contenidoExtraidoDelArray
            }else{
                console.log("NO EXISTE EL PRODUCTO")
                return null
            }
            
        }
        catch(error){
            console.log(error)
        }
    }

    async GetAll(){
        try{
            // Se lee el JSON con todos los productos y se parsea para que la terminal lo pueda leer
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidoJSON = JSON.parse(contenido);
            return contenidoJSON
            
        }
        catch(error){
            console.log(error)
        }
    }

    async DeleteById(idEliminar){
        try{
            // Se lee el JSON con todos los productos y se parsea para que la terminal lo pueda leer
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidoJSON = JSON.parse(contenido);
            // Se busca el item con el id a eliminar
            let itemBorrar = contenidoJSON.find( (item) => item.id === idEliminar )
            // Se verifica si existe o no
            if(itemBorrar == undefined){
                return console.log ("El producto no existe")
            }else{
                // Busca el indice con "indexOf" y lo remueve con el "Splice"
                let IndiceRemove = contenidoJSON.indexOf(itemBorrar)
                contenidoJSON.splice(IndiceRemove, 1)

                await fs.promises.writeFile(`./${this.name}` , JSON.stringify(contenidoJSON) )
                return console.log( "Producto Removido" )
            }
            
        }
        catch(error){
            console.log(error)
        }
    }

    async DeleteAll(){
        try{
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify([]));
            return console.log("Productos Eliminados")
            
        }
        catch(error){
            console.log(error)
        }
    }

}

let contenedor = new Contenedor("Productos.json")
let informacionNueva = {
    "id": 0, 
    "title": "Manaos",
    "price" : 90
}

// Al ser una Promesa se utiliza el THEN para resolverla 

//  contenedor.Save(informacionNueva).then(resolve => {
//     console.log(resolve)
//  })


// contenedor.GetById(2).then(resolve => {
//     console.log(resolve)
// })

// contenedor.GetAll().then(resolve => {
//     console.log(resolve)
// })

// contenedor.DeleteById(1).then(resolve => resolve )

// contenedor.DeleteAll().then(resolve => resolve)