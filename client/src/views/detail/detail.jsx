import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDogsById } from '../../redux/actions';

const Detail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.allDogs)
  console.log(allDogs)

  useEffect(() => {
  
    dispatch(getDogsById(id))
  }, [id]); 

  return (
    <div>
      <h1>Nombre</h1>
      <h2>{allDogs.name}</h2>
      <img src={allDogs.image} alt={allDogs.name} />
    </div>
  )
    
};



export default Detail;