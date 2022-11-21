import './App.css';
import {BrowserRouter, Route, Routes, Switch} from 'react-router-dom';
import Home from './components/Home.jsx';
import LandingPage from './components/LandingPage.jsx'
import CharacterCreate from './components/CharacterCreate.jsx'
import Detail from './components/Detail.jsx'
import UpdateComponent from './components/UpdateComponent';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Routes>
        <Route exact path='/' element={<LandingPage/>} />
        <Route  exact path='/home' element={<Home/>} />
        <Route exact path='/home/:id' element={<Detail/>} />
        <Route exact path='/character' element={<CharacterCreate/>} />
        <Route exact path='/update/:id'element={<UpdateComponent/>} />
              </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
