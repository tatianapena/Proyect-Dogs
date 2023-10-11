import { Link } from 'react-router-dom';

import style from "../Landing/landing.module.css";


const Landing = () => {
  return (
    <div className={style.landing}>

      <div className={style.title_div}>
        <h1 className={style.title}>WELCOME</h1>
      </div>
      
      <div className={style.link}>
        <Link to='/home'>
          <button className={style.button}>Log In</button>
        </Link>
      </div>
      
    </div>
  )
}

export default Landing;