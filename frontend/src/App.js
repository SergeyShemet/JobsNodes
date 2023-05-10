import React, { useState, useEffect }  from 'react';
import { Link, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import { Card } from './components/card.component';
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import AuthService from './services/auth.service';
import Login from './components/login.component';
import BoardUser from './components/board-user.component';
import Profile from './components/profile.component';


function App() {
  const [currentUser, setCurrentUser] = useState(undefined);    //undefined-пользователь при загрузке приложения
  

  useEffect(() => {                             //стрелочная функция после рендеринга вместо старого componentDidMount()
    const user = AuthService.getCurrentUser();  //Получаем данные текущего пользователя из локального хранилища
    if (user) {
          setCurrentUser(user);         //если данные получены, обновляем переменную через state
        } 
  },[])

  const logOut = () => {                //функция для выхода пользователя
     console.log("Logging out");
     AuthService.logout();
     setCurrentUser(undefined);
  }

  return (<>
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark text-white">
      <div className="container py-2">
        <Link to={"/"} className="navbar-brand">JOBSNODES</Link>
        {(currentUser) ?   (
          <div className="navbar-nav ms-auto">
            <li className='nav-item'><Link to={"/profile"} className="nav-link">Профиль ({currentUser.firstName+' '+currentUser.lastName})</Link></li>
            <li className='nav-item'><a href="/login" className="nav-link" onClick={logOut}>Выйти</a></li>
            </div>
            ) : (
              <div className="navbar-nav ms-auto"><li className='nav-item text-primary-emphasis'>Пожалуйста, войдите в систему</li></div>
              )
        }
        </div>
      </nav>

      <div className="container pt-3">
        <Routes>
          <Route path="/" element={<BoardUser {...currentUser} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
    </>
  );

}

export default App;
