/*import React, { useRef, useState, useEffect, Component } from 'react';
import { BrowserRouter, Switch, Route, useHistory, Redirect } from 'react-router-dom';
import Api from '../api/siscorps_api'
import ApiLogin from '../api/login_api';

const Inicio = () => {
    const [autorizado, SetAutorizado] = useState(true);
    const [bienvenida, SetBienvenida] = useState("");

    const esta_autorizado = async () => {
        const aut = await Api.verificarAutorizacion();
        if (!aut) {
            SetAutorizado(false);
            window.location.reload();
        }

        const datos_token = ApiLogin.getTokenDatos();

        const bienvenida = `Bienvenid@  ${JSON.parse(datos_token).usuario}  usuario de la region ${JSON.parse(datos_token).region}`
        SetBienvenida(bienvenida)
    }



    useEffect(() => {
        esta_autorizado();
    }, []);



    return (
    <div>
            {(autorizado == false) ? <Redirect to="/login_email" /> :

                <div>
                    <a> {bienvenida}</a>
            </div> 
            }
    </div>
    )
};

export default Inicio;*/