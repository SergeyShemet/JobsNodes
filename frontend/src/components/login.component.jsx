import React, { useState, useRef} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService  from "../services/auth.service";

import { withRouter } from "../common/with-router";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger text-center p-2" role="alert">
                Поле обязательно для заполнения
            </div>
        );
    }
};

export function Login(props) {

    const checkBtn = useRef();
    const form = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    
    function handleLogin(e) {            //нажатие кнопки входа
        e.preventDefault();
        setMessage("");
        setLoading(true);
        
        form.current.validateAll();
  
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password)
            .then( () => {
                props.router.navigate('/');
                window.location.reload();
            }, error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    setMessage(resMessage);
                    setLoading(false)
                });
            }
             else {
                setLoading(false);
            }
    };

        return (
            <div className="col-md-12">
                <div className="card-container logincard" style={{ padding: '20px' }}>
                    <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />

                    <Form onSubmit={handleLogin} ref={form}>
                        <div className="form-group">
                        <label htmlFor="username">Логин</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            validations={[required]} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                validations={[required]} />
                        </div>

                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary btn-block  my-3" disabled={loading} >
                            {loading && (<span className="spinner-border spinner-border-sm mr-4" role="status" aria-hidden="true"></span>)}
                            <span>Войти</span>
                            </button>
                        </div>

                        {message && (<div className="form-group"><div className="alert alert-danger text-center p-2 my-2" role="alert">{message}</div></div> )}
                        <CheckButton style={{ display: "none"}} ref={checkBtn} />

                    </Form>
                </div>
            </div>
        );
    }

export default withRouter(Login);
             