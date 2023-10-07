const {getDogsById_Api, getDogsById_Db, getDogsByName, getDogs, postDog} = require('../controllers/dogsControllers');

const getDogsHandler = async (req, res) =>{
  const { name } = req.query;

  try {
    
    if(name) {
      const dogsByName = await getDogsByName(name);
      res.status(200).json(dogsByName);
    } else {
      const response = await getDogs();
      res.status(200).json(response);
    }

  } catch (error) {
    res.status(400).json({error:error.message});
  }  
};

const getDetailDogHandler = async (req, res) =>{
  const { id } = req.params;
  
  const source = isNaN(id) ? "bdd" : "api" // si es Nan es decir que el id es un string por tanto buscara en la base de datos, si el ID es un numero buscara en la API.

  try {
    
    if(source === 'api') {
      const dogsById_Api = await getDogsById_Api(id);
      res.status(200).json(dogsById_Api);
    } else {
      const dogsByDB = await getDogsById_Db(id);
      res.status(200).json(dogsByDB);
    }

  } catch (error) {
    res.status(400).json({error:error.message})
  }
  
};


const createDogHandler = async (req, res) =>{
  const {name, image, life_span, height, weight, Temperaments} = req.body;

  try {
    if(!name || !image || !life_span || !height || !weight){
      res.status(400).json('Not all fields were received')
    } else {
      const createDog = await postDog(name, image, life_span, height, weight, Temperaments)
      res.status(200).json(createDog)
    }
    
  } catch (error) {
    res.status(400).json({error:error.message})
  }
};

module.exports = {
  getDogsHandler,
  getDetailDogHandler,
  createDogHandler,
}