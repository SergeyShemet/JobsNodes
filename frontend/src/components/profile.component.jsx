import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";


export default function Profile(props) {
    const [userReady, setReady] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const [redirected, setRedirected] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (!user) setRedirected("/login");
        setCurrentUser(user);  
        setReady(true);
        UserService.getAllUsers(user.id).then(response => {
            setUsers(response.data);
         
        });
        
    }, []);


    if (redirected) return <Navigate to={redirected} />;
    if (!userReady) return <h1>Загрузка...</h1>;
    return (
        <div className="container">
            {(userReady) ?
            <div> 
                <header className="mt-4 p-5 bg-primary text-white rounded">
                    <h3><strong>Профиль пользователя</strong></h3>
                </header>
                <div className="mt-4">
                    <h1><strong><p>{currentUser.firstName+' '+currentUser.lastName}</p></strong></h1>
                    <p><strong>Токен:</strong>{" "}{currentUser.accessToken.substring(0,20)}...{" "}{currentUser.accessToken.substr(currentUser.accessToken.length-20)}</p>
                    <p><strong>ID:</strong>{" "}{currentUser.id}</p>
                    <p><strong>Список подчинённых:</strong></p>
                </div>
            </div> : null}
            {(users.length > 0) ?
                <div>
                {users.map(user => (<li key={user.id}>{user.firstName} {user.middleName} {user.lastName} (id: {user.id})</li>))}
                </div> : <p>Подчинённых нет.</p>
            }
        </div>
    );
}

