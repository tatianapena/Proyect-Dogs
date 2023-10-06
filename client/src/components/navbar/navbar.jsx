import { Link } from 'react-router-dom';
import style from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className={style.nav}>
      <Link to= '/home'>Home</Link>
      <Link to= '/create'>Create Dog</Link>
      <div className={style.searchBox}>
        <form>
          <input  placeholder='Search' />
          <button className={style.searchButton}>SEARCH</button>
        </form>
      </div>
      
    </div>
  )
}

export default NavBar;
