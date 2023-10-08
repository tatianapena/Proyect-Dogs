import { GET_DOGS, GET_DOGS_BY_NAME, GET_DOGS_BY_ID, ORDER, FILTER_CREATED, CREATE_DOGS } from './action-types';

const initialState = {
  dogs: [],
  allDogs: [],
 
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

    case FILTER_CREATED: 
      const createdFilter = action.payload ==='created'? state.allDogs.filter(dog => dog.created) : state.allDogs.filter(dog => !dog.created)
      return {
        ...state,
        dogs: action.payload === 'All' ? state.allDogs : createdFilter
      };
    
    case CREATE_DOGS:
      return {
        ...state,
        dogs:[...state.dogs, ...action.payload] //me trae todos lo perros, pero tambien me trae los que acabo de crear.
      };
    
      
    default:
      return {
        ...state
      };
  }

};

export default rootReducer;