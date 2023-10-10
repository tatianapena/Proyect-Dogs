const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds';
require('dotenv').config();

const {API_KEY} = process.env;

const { Temperament } = require('../db');



//Función que me va a traer la propiedad Temperament con sus valores tanto de la BD como de la API
const getTemperaments = async() => {

  let checkInfo = await Temperament.findAll();


  if(checkInfo.length === 0) {

    const infoApi = (await axios.get(`${URL}?api_key=${API_KEY}`)).data;
    let array = [];

    infoApi.map((dog) => array.push(dog.temperament))
    
    // Extraer temperamentos y eliminar valores null
    let tempArray = infoApi.map((dog) => dog.temperament).filter(temp => temp !== null);

    // Limpiar los temperamentos
    const tempClean = tempArray
      .join(",")
      .trim()
      .split(",")

    // Quitar espacios alrededor de los temperamentos
    const notSpacesTemp = tempClean.map(temp => temp.trim());

    // Eliminar duplicados y valores vacíos
    const uniqueTemp = [...new Set(notSpacesTemp)].filter(temp => temp !== "").sort();

    uniqueTemp.forEach((temp) => {
      Temperament.findOrCreate({where: {name: temp}});
    }) 
    
    checkInfo = uniqueTemp
  } 
   return checkInfo;
};



module.exports = { getTemperaments };