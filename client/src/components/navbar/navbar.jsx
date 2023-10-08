import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogsByName } from '../../redux/actions';

import style from './NavBar.module.css';


const NavBar = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleInputChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
    console.log(name)
  }
////desde el input se va a mandar el name a mi estado local, luego llega aqui al hacerle click al boton y luego va y busca esa funcion con el name en el backend.
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getDogsByName(name));
    setName('');
  }


  return (
    <div className={style.nav}>
      <Link className={style.home} to= '/home'>Home</Link>
      <Link className={style.create} to= '/create'>Create Dog</Link>
      <div className={style.searchBox}>
        <form>
          <input onChange={handleInputChange} value ={name} type= 'text' placeholder='Search...' />
          <button onClick={handleSubmit} type='submit' className={style.searchButton}>SEARCH</button>
        </form>
      </div>
      
    </div>
  )
}

export default NavBar;
