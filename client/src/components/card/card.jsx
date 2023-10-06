import style from './Card.module.css';
import { Link } from 'react-router-dom';


const Card = (props) => {
  const { id, image, name, temperament, weight } = props;
  return (
    <div className={style.card}>
      <img className={style.image} src={image} alt={name} />
      <h2 className={style.name}> {name}</h2>
      <p className={style.temp}>Temperaments: {temperament}</p>
      <p className={style.weight}>Weight: {weight}</p>
      <Link className={style.link} to={`/detail/${id}`}>
        <button className={style.button}>READ MORE</button>
      </Link> 
    </div>
  )
}

export default Card;