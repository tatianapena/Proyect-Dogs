import { Link } from 'react-router-dom';
// import "./landing.styles.css";

const Landing = () => {
  return (
    <div>
      <h1>WELCOME</h1>
      <Link to='/home'>
        <button>Log In</button>
      </Link>
    </div>
  )
}

export default Landing;