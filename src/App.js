import { Routes, Route, Link } from 'react-router-dom'
import {HomePage} from './pages/HomePage'
import { Counter } from "./pages/--apps/Counter";
import { Modal } from "./pages/--apps/Modal";
import { Quiz } from "./pages/--apps/Quiz";
import { UsersBase } from "./pages/--apps/UsersBase/UsersBase";
import { CurrencyConvertor } from "./pages/--apps/CurrencyConvertor/CurrencyConvertor";
import { PhotoCollection } from "./pages/--apps/PhotoCollection/PhotoCollection";
import { Timer } from "./pages/--apps/Timer/Timer";
// import { Todo } from "./pages/--apps/-Todo/Todo";
// 
import styled from 'styled-components';



const ToBack = styled.div`
	position: fixed;
	top: 30px;
	left: 50px;
	height: 100px;
  font-size: 50px;
  a {
    color: #000;
	}
`

function App() {
  return (
    <>
      <ToBack>
        <Link to='/'>&#8592;</Link>
      </ToBack>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<HomePage />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/users" element={<UsersBase />} />
        <Route path="/currency-convertor" element={<CurrencyConvertor />} />
        <Route path="/photo-collection" element={<PhotoCollection />} />
        {/* <Route path="/Todo" element={<Todo />} /> */}
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </>
  );
}

export default App;
