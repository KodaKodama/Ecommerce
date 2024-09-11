import { DataProvider } from "./GlobalState";
import Header from "./components/headers/Header"
import Pages from "./components/mainpages/Pages"
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <DataProvider>
      <Router>
      <div className="app">
       <Header />
      <Pages />
      </div>
      </Router>
    </DataProvider>
    
   
  )
}

export default App
