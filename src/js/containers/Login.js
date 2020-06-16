/*import React, { useRef, useState, useEffect, Component } from 'react';
import { BrowserRouter, Switch, Route, useHistory, Redirect  } from 'react-router-dom';

import ApiLogin from '../api/login_api'



const Login = ({ custom, ...props }) => {
    const [ruta, SetRuta] = useState("")

    let history = useHistory();

    const iniciar_sesion = async (token_email) => {
        try {
            const valor_login = await ApiLogin.getLogin(token_email);
            console.log(valor_login);
            SetRuta("/")
            window.location.reload();
        }
        catch (error) {
            console.log("No es posible iniciar sesion")
            SetRuta("/login_email")
            window.location.reload();
        }
    }


    useEffect(() => {
        iniciar_sesion(props.match.params.token)

    }, []);
    
    return (
        <div>
            Autenticando..  
            {ruta == "" ? "" :
                <Redirect from="/" to={ruta} />

            }
            </div>
        )
};

export default Login*/