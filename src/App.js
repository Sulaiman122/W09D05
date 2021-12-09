import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Posts from './components/Posts'
import Post from './components/Post'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/signup' element={<SignUp />}/>
        <Route exact path="/post/:id" element={<Post/>}/>
        <Route exact path="/posts" element={<Posts/>}/>
        <Route path='*' element={<h1>wrong path boy</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
