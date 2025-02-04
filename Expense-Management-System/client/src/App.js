import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login.js';
import { Navigate } from 'react-router-dom';
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Protectedroute><HomePage/></Protectedroute>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  );
}


export function Protectedroute(props){
    if(localStorage.getItem('user')){
      return props.children;
    }
    else{
      return <Navigate to="/login"/>
    }
}

export default App;
