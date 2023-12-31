import Card from '../Card/Card';
import style from './CardsContainer.module.css';


const CardsContainer = ({currentDogs}) => {
  console.log(currentDogs)


  return ( // se va hacer un recorrido de la propiedad allDogs que nos traemos del estado global
    <div className={style.cardsContainer}>
      {currentDogs && currentDogs.map(dog => { //Esto significa que si allDogs tiene un valor que se evalúa como "verdadero" (es decir, no es nulo, undefined, o falso), entonces el código dentro del bloque será ejecutado.
        return <Card 
        id={dog.id}
        image={dog.image}
        name={dog.name}
        Temperaments={dog.Temperaments}
        weight={dog.weight}
        />
      })
    }
    </div>
  ) 
}

export default CardsContainer;