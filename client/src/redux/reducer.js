
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
      if(action.payload === 'weight'){
       const weightFilter = state.allDogs.filter(dog => dog.weight?.includes(action.payload))
       return {
        ...state,
        allDogs: weightFilter
      }
      } 
      
    
    case TEMPERAMENT_FILTER: 
    console.log(action.payload, 'me llamo')
    if (action.payload) {
      const filterTemp = state.dogs.filter(dog =>
        dog.Temperaments?.includes(action.payload)
      );
      
      return {
        ...state,
        allDogs: filterTemp
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