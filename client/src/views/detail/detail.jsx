import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDogsById } from '../../redux/actions';

const Detail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const dogsDetail = useSelector(state => state.dogsDetail)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getDogsById(id))
  }, [id]); // mi array de dependencias es el ID porq va cambiando, es decir, cada vez q cambia el ID despacha la acción.
  
  if(isLoading){
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'rgb(23,35,26)', display: 'flex', width: '100vw', justifyContent: 'center', paddingTop: '96px' }}>
        <div style={{ color: 'white', fontSize: '2rem' }}>Loading...</div>
      </div>
    );
  } else {
      return (
        <div>
          <h1>DETAIL</h1>
          
        </div>
      )
    }
};

export default Detail;