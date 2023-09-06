import logo from './logo.svg';
import './App.css';
import { FirstPage } from './componentes/FirstPage';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='http://localhost:3000/home' element={<FirstPage/>}/>
          </Routes>
      </Router>
          
        
    </div>
  );
}

export default App;
