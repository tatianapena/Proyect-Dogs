import { Home, Landing, Detail, Form} from './views';
import { Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';


// import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className='App'>
      {location.pathname !== '/' && <NavBar />} 

      <Route exact path='/' render={()=> <Landing />} /> 
      <Route path='/home' render={()=> <Home />} />
      <Route path='/detail/:id' render={()=> <Detail />} />
      <Route path='/create' render={()=> <Form />} />
    
    </div>
  );
}

export default App;
//utilizo render porq me permite pasar props a las rutas eje <Home unaProp="valor" />
// location.pathname diferente de ("/") va a mostrar el NavBar 