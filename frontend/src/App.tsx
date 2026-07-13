import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import { Header } from './components/Layout/Header/Header';
import { Footer } from './components/Layout/Footer/Footer';
function App() {
  return (
    <>
    <BrowserRouter>
    <Header isAuthenticated= {false}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    <Footer></Footer>
    </>
  )
}

export default App;