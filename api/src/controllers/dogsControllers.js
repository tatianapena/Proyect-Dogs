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
    Temperaments: dog.temperament?.split(", "),
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
  const allDogs = await getDogs(); // me trafigo toda la data de la API, Aqui esta el array que creeamos antes con el metodo map con la info de la API

  const dogFilteredApi = allDogs.filter((dog) => dog.name.toLowerCase() === name.toLowerCase()); // Busquedad por nombre dentro de la API

  const dogFilteredDataBase = await Dog.findAll({where: {name:name}, include: {
    model: Temperament,
    attributes: ["name"],
    through: {
      attributes: []
    },
  },}); // Busquedad por nombre dentro de la Base de Datos

  return [...dogFilteredApi, ...dogFilteredDataBase];
}  

// Función que me trae toda la infor correspondiente según el ID que le estoy enviando ya sea para consultar en la Base de Datos o en la API.
const getDogsById_Api = async(id) => {
  
  const allDogs = await getDogs();

  const dogsById = allDogs.filter((dog) => {
    return dog.id == id;
  })

  if(!dogsById) throw Error('The dog does not exist');

  return dogsById; 
};

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

   if(!dogsDataBase) { // si no se encontró ni un perro en la base de datos
    throw Error('The dog does not exist on the data base')
   };

   return dogsDataBase;
};



//Función para crear perros con el metodo POST
const postDog = async(name, image, life_span, height, weight, temperament) => {

  const newDog = await Dog.create({name, image, life_span, height, weight});
  await newDog.addTemperament(temperament);

  return newDog;

}

module.exports = {getDogs, getDogsByName, getDogsById_Db, getDogsById_Api, postDog};
