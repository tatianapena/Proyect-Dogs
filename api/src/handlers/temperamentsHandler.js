const { getTemperaments } = require('../controllers/temperamentsControllers');

let temperamentsGetHandler = async(req, res) => {

  try {
    let temperament = await getTemperaments();
    res.status(200).json("Se creo la base de datos Temperament");

  } catch (error) {
    res.status(400).json({error:error.message});
  }  
};

module.exports = temperamentsGetHandler;