
import { GET_DOGS, GET_DOGS_BY_NAME, GET_DOGS_BY_ID, ORDER, FILTER_CREATED, WEIGHT_FILTER, GET_TEMPERAMENTS, CLEAN_DETAIL, TEMPERAMENT_FILTER } from './action-types';

const initialState = {
  dogs: [],
  allDogs: [],
  temperaments:[],
  filterTempDogs: []
}


const rootReducer = (state=initialState, action) => {
  let sorted;
  switch(action.type) {
    case GET_DOGS: 
      const filterbyWeight = [...action.payload].map(elem => {
        if(elem.weight.includes('NaN') || !elem.weight || elem.weight.length <= 2 ){
          elem.weight = '5 - 10'
        }
        return elem
      })
      return {
        ...state, 
        dogs: filterbyWeight,
        allDogs: filterbyWeight // esto es para que siempre me guarde una copia, por ejemplo en lo casos donde quiero filtrar sobre lo ya filtrado 
      };
    
    case GET_DOGS_BY_NAME:
      return {
        ...state,
        dogs: action.payload
      };
    
    case GET_DOGS_BY_ID:
      return {
        ...state,
        allDogs: action.payload
      };
    
    case ORDER:
    
    if(action.payload === "A"){
        sorted = state.dogs.sort((a,b) => (a.name > b.name ? 1 : -1))
    }
    if(action.payload === "D"){
        sorted = state.dogs.sort((a,b) => (b.name > a.name ? 1 : -1))
    }
      return {
        ...state,
        dogs: [...sorted]
        
      };
    
    case WEIGHT_FILTER:
      let maxWeightA;
      let minWeightA;
      let maxWeightB;
      let minWeightB;

      if(action.payload === "maxWeight"){
        sorted = state.dogs.sort((a,b) => {
          maxWeightA = a.weight.split(' - ')
          maxWeightB = b.weight.split(' - ')
        if(parseInt(maxWeightA[0]) > parseInt(maxWeightB[0])){
          return 1
        }
        else if (parseInt(maxWeightA[0]) < parseInt(maxWeightB[0])){
          return -1
        } else {
          return 0
        } }) // sacar el peso max
      }
      if(action.payload === "minWeight"){
        sorted = state.dogs.sort((a,b) => {
          minWeightB = b.weight.split(' - ')
          minWeightA = a.weight.split(' - ') 
          console.log(minWeightA,  ' lo' )
          if(parseInt(minWeightA[0]) > parseInt(minWeightB[0])){
            return -1
          }
          else if (parseInt(minWeightA[0]) < parseInt(minWeightB[0])){
            return 1
          } else {
            return 0
          } 
          })  // sacar el peso min 
      }
       return {
        ...state,
        dogs: [...sorted]
      }
   
    
    case TEMPERAMENT_FILTER: 
    
    if (action.payload) {
      const filterTemp = state.dogs.filter(dog => { //el filter busca coincidencias dentro de un array y devuelve un array con todas ellas
      for(let i in dog.Temperaments) { //aqui el for va iterar sobre todas las propiedades dentro de dog.Temperaments
        if(dog.Temperaments[i].name === action.payload ) { // aqui compara si el name del temperamento del perro es el que se pasa por action.payload, que seria el value='name'
          return dog 
        }
      }
    });
      
      return {
        ...state,
        dogs: filterTemp
      }
    }
    

    case FILTER_CREATED: 
      const createdFilter = action.payload ==='created'? state.allDogs.filter(dog => dog.created) : state.allDogs.filter(dog => !dog.created)
      return {
        ...state,
        dogs: action.payload === 'All' ? state.allDogs : createdFilter
      };
    
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload
      };

   

    case CLEAN_DETAIL:
      return {
        ...state,
        allDogs: {}
      }


    default:
      return {
        ...state
      };
  }

};

export default rootReducer;