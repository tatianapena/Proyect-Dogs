import CardsContainer from '../../components/CardsContainer/CardsContainer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getDogs} from '../../redux/actions';
import Page from '../../components/Page/Page';

import style from './Home.module.css'

const Home = () => {

  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);

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


  return (
    <div className={style.home}> 
     
     <div>
     <button onClick={handlerClick}>Load all Dogs</button>
      <select>
        <option value='asc'>Ascendant</option>
        <option value='desc'>descendant</option>
      </select>

      <select>
        <option value='All'>Temperaments</option>    
      </select>

      <select>
        <option value='All'>Weight</option>    
      </select>

      <select>
        <option value='create:false'>Created By Api</option>    
        <option value='create:true'>Created By Form</option>    
      </select>

      <Page
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        page={page}
      />  
     </div>
    
      <CardsContainer />

    </div>
  )

}

export default Home;