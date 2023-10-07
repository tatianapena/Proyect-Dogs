import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDogsById } from '../../redux/actions';
import style from '../Detail/Detail.module.css';

const Detail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.allDogs)


  useEffect(() => {
  
    dispatch(getDogsById(id))
  }, [id]); 

  return (
    <div className={style.card} >
      <img className={style.image} src={allDogs.image} alt='dogs name' />
      <h1 className={style.name}>{allDogs.name}</h1>
      <p className={style.temp}>ID: {allDogs.id}</p>
      <p className={style.temp}>Height: {allDogs.height} cms</p>
      <p className={style.temp}>Weight: {allDogs.weight} kg</p>
      {/* <p> {allDogs.temperament}</p> */}
      <p className={style.temp}>Life of Span: {allDogs.life_span}</p>
    </div>
  )
    
};



export default Detail;