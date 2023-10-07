import { GET_DOGS, GET_DOGS_BY_NAME, GET_DOGS_BY_ID, ORDER, FILTER_CREATED } from './action-types';

const initialState = {
  allDogs: [],
  dogs: [],

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
        allDogs: action.payload
      };
    
    case GET_DOGS_BY_ID:
      return {
        ...state,
        allDogs: action.payload
      };
    
    case ORDER:
    
      if(action.payload === "A"){
        sorted = state.allDogs.sort((a,b) => (a.name > b.name ? 1 : -1))
    }
    if(action.payload === "D"){
        sorted = state.allDogs.sort((a,b) => (b.name > a.name ? 1 : -1))
    }
      return {
        ...state,
        allDogs: [...sorted]
        
      };

    case FILTER_CREATED: 
      const createdFilter = action.payload ==='created'? state.allDogs.filter(dog => dog.created) : state.allDogs.filter(dog => !dog.created)
      return {
        ...state,
        dogs: action.payload === 'All' ? state.allDogs : createdFilter
      };
    
      
    default:
      return {
        ...state
      };
  }

};

export default rootReducer;