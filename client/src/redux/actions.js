
import { GET_DOGS, GET_DOGS_BY_NAME, GET_DOGS_BY_ID, ORDER, FILTER_CREATED, WEIGHT_FILTER, POST_DOGS, TEMPERAMENT_FILTER, GET_TEMPERAMENTS, CLEAN_DETAIL} from './action-types';
import axios from 'axios';




export const getDogs = () => {

  const endpoint = 'http://localhost:3001/dogs'
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint)
      if(!data.length) throw Error('There are not Dogs')

      dispatch({type: GET_DOGS, payload: data}) // le va a despachar una action al reducer para q pueda modificar/cambiar lo que quiero del estado global
    } catch (error) {
        console.log(error.message);
    }
  };
};

export const getDogsByName = (name) => {
  const endpoint = 'http://localhost:3001/dogs/?name='+name;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      dispatch({type: GET_DOGS_BY_NAME, payload: data})
    } catch (error) {
        console.log(error.message);
    }
  };
};

export const getDogsById = (id) => {
  
  const endpoint = `http://localhost:3001/dogs/${id}`;
  return async (dispatch) =>{
    try {
      const {data} = await axios.get(endpoint)
    
      dispatch({type: GET_DOGS_BY_ID, payload: data })
    } catch (error) {
        console.log(error.message);
    } 
  };
};


export const orderCards = (order) => {
  return {
    type: ORDER,
    payload: order
  }
}

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload
  }
}

export const weightFiltered = (payload) => {
  return {
    type: WEIGHT_FILTER,
    payload
  }
}

export const temperamentFilter = (temperament) => {
  return async function(dispatch){

    try {
      dispatch({
        type: TEMPERAMENT_FILTER,
        payload: temperament
      })
    } catch (error) {
      console.log(error.message);
    }
  }
}


  export const getTemperaments =  () => {
    const endpoint = 'http://localhost:3001/temperaments';
    return async (dispatch) => {
      try {
        const {data} = await axios.get(endpoint)
        console.log(data, 'hola') 
        dispatch({ type: GET_TEMPERAMENTS, payload: data})
      } catch (error) {
          console.log(error.message);
      }
    }
  };

// export const postDogs = (payload) => {
//    const endpoint = 'http://localhost:3001/dogs';
//    return async (dispatch) => {
   
//    }
// };

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL}
}


// return async function (dispatch){
//   const response = await axios.post('http://localhost:3001/dogs',payload)
//   console.log(response)
//   return response;
// }; 