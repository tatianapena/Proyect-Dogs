const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds';
require('dotenv').config();

const {API_KEY} = process.env;

const { Dog, Temperament } = require('../db');



//Creo una función que me traiga todos los Dogs, tanto de la Base de Datos como de la API
const getDogs = async () => {
  
let infoApi = (await axios.get(`${URL}?api_key=${API_KEY}`)).data; // => Info de la API

  const dogsApi = infoApi.map((dog) => ({
    id: dog.id,
    name: dog.name,
    height: dog.height.metric,
    weight: dog.weight.metric,
    life_span: dog.life_span,
    image: dog.image.url,
    created: false, //Me sirve para validar lo que viene de la base de datos con lo que viene de la API, y en nuestro modelo de la BD lo seteamos en true, 
    // para que cada de yo cree un usuario se va a crear una columna que tiene un valor en true. Y en la API va estar en False.
      // por si mas adelante hago un filtro sobre los usuarios creados, si dices created true: vienen de la BD y created: false de la API
      Temperaments: dog.temperament?.split(', ').map((temp) => ({
        "name": temp
    })),
      
    }));
  
   
  const dogsDataBase = await Dog.findAll({ // => Todos los dogs de la Base de Datos
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: []
      },
    },
  }); 

  return [...dogsApi,...dogsDataBase];

};



//Función que me trae todos los perros de la API y de la Base de Datos filtrado por nombre
const getDogsByName = async (name) => {
  const allDogs = await getDogs(); 

  const dogFilteredApi = allDogs.filter((dog) => dog.name.toLowerCase() === name.toLowerCase()); // Busquedad por nombre dentro de la API

  const dogFilteredDataBase = await Dog.findAll({where: {name:name}, include: {
    model: Temperament,
    attributes: ["name"],
    through: {
      attributes: []
    },
  },}); 

  return [...dogFilteredApi, ...dogFilteredDataBase];
}  

// Función para obtener el perro por ID de la API
const getDogsById_Api = async(id) => {
 
  const allDogs = await getDogs();

  const dogsById = allDogs.filter((dog) => {
    return dog.id == id;
  })

  if(!dogsById) throw Error('The dog does not exist');

  return dogsById.pop(); 

};

//Función para obtener el perro por ID de la base de datos
const getDogsById_Db = async (id) =>{

   const dogsDataBase = await Dog.findByPk(id, {
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: []
      },
    },
   });

   if(!dogsDataBase) { // si no se encontró ningun perro en la base de datos
    throw Error('The dog does not exist on the data base')
   };

   return dogsDataBase;
};


//Función para crear perros con el metodo POST
const postDog = async(name, image, life_span, height, weight, Temperaments) => {

  const newDog = await Dog.create({name, image, life_span, height, weight});
  await newDog.addTemperament(Temperaments); // Esta línea agrega un temperamento al perro recién creado de la tabla Temperament

  return newDog;

}

module.exports = {getDogs, getDogsByName, getDogsById_Db, getDogsById_Api, postDog};
