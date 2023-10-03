import {Route, Switch} from 'react-router-dom';

import Home from './views/home/home';
import Landing from './views/landing/landing';
import Form from './views/form/form';
import Detail from './views/detail/detail';

import './App.css';

function App() {
  return (
    <Switch >
      <Route exact path='/home' component={Home} />
      <Route path='/landing' component={Landing} />
      <Route path='/form' component={Form} />
      <Route path='/home/:id' component={Detail} />
    </Switch>  
  );
}

export default App;
