
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
      return {
        ...state, 
        dogs: action.payload,
        allDogs: action.payload // esto es para que siempre me guarde una copia, por ejemplo en lo casos donde quiero filtrar sobre lo ya filtrado 
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
      if(action.payload === "maxWeight"){
        sorted = state.dogs.sort((a,b) => (b.weight > a.weight ? 1 : -1)) // sacar el peso max
      }
      if(action.payload === "minWeight"){
        sorted = state.dogs.sort((a,b) => (a.weight > b.weight ? 1 : -1)) // sacar el peso min 
      }
       return {
        ...state,
        dogs: [...sorted]
      }
   
    
    case TEMPERAMENT_FILTER: 
    
    if (action.payload) {
      const filterTemp = state.dogs.filter(dog => {
      for(let i in dog.Temperaments) {
        if(dog.Temperaments[i].name === action.payload ) {
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