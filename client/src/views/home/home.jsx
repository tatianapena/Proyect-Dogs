import CardsContainer from '../../components/CardsContainer/CardsContainer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getDogs, orderCards, filterCreated} from '../../redux/actions';
import Page from '../../components/Page/Page';

import style from './Home.module.css'

const Home = () => {

  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  

  const [currentPage, setCurrentPage] = useState(1);//empieza en 1 porq siempre arranco en la primera página
  const [dogsPerPage, setDogsPerPage] = useState(8);//cuantos dogs quiero mostrar por página
  const indexOfLastDog = currentPage * dogsPerPage // la respuesta de esta operación en un principio va ser 8.
  const indexOfFirstDog = indexOfLastDog - dogsPerPage // va dar 0
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
 

  const page = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]) // mi array de dependencia va vacio porq mi acción no necesita de nadie para su montaje


  const handlerClick = (event) => {
    event.preventDefault();
    dispatch(getDogs());
  }

  const handleOrder = (event) => {
    dispatch(orderCards(event.target.value));
  }

  const hanlderFilterCreated = (event) => {
    dispatch(filterCreated(event.target.value));
  }
 

  return (
    <div className={style.home}> 
     
     <div>
     <button onClick={handlerClick}>Load all Dogs</button>

      <select onChange={handleOrder}>
        <option value='Select'>Order By Name </option>
        <option value="A">Ascendente</option>
        <option value="D">Descendente</option>
      </select>

      <select >
        <option value='All'>Temperaments</option>    
      </select>

      <select>
        <option value='All'>Weight</option>    
      </select>
    

      <select onChange={hanlderFilterCreated}>
        <option value='Select'>Created By:</option>
        <option value='All'>All</option> 
        <option value='created'>Created</option>    
        <option value='api'>Existing</option>    
      </select>

      <Page
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        page={page}
      />  
     </div>
      <CardsContainer currentDogs={currentDogs} />

    </div>
  )

}

export default Home;