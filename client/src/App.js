import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home.jsx';
import LandingPage from './components/LandingPage.jsx'
import CharacterCreate from './components/CharacterCreate.jsx'
import Detail from './components/Detail.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route  exact path='/home' component={Home} />
        <Route exact path='/home/:id' component={Detail} />
        <Route exact path='/character' component={CharacterCreate} />
              </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
