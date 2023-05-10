import axios from 'axios';
const API_URL = 'http://localhost:8000/api/auth';

class AuthService {
    login(username, password) {
        username = username.trim();         //триммируем имя пользователя
        return axios.post(API_URL, {
                    username,
                    password
                }).then(response => {
                    if (response.data.accessToken) {
                        localStorage.setItem('user', JSON.stringify(response.data));
                    }
                return response.data;
        });
    }

    logout() {
        localStorage.removeItem('user');
    }
                
    isAuthenticated() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user !== null;
    }

    getCurrentUser() {
        //alert("checking local storage " + localStorage.getItem('user'));
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();
