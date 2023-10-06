import { GET_DOGS, GET_DOGS_BY_NAME, GET_DOGS_BY_ID } from './action-types';

const initialState = {
  allDogs: [],
  dogsDetail: {}
}


const rootReducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_DOGS: 
      return {
        ...state, 
        allDogs: action.payload,
    
      };
    
    case GET_DOGS_BY_NAME:
      return {
        ...state,
        allDogs: action.payload
      };
    
    case GET_DOGS_BY_ID:
      return {
        ...state,
        dogsDetail: action.payload
      };
      
    default:
      return {
        ...state
      };
  }

};

export default rootReducer;