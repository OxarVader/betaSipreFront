import React, { useRef, useState, useEffect, Component } from 'react';
//import ApiLogin from '../api/login_api'
//import { Formik, Form, Field, ErrorMessage } from 'formik';
//import * as Yup from 'yup';

//import DialogoEspera from '../components/DialogoEspera'


const LoginEmail2 = ({ custom, ...props }) => {

    /*
    ApiLogin.logout();

    const [errores, SetErrores] = useState("")

    
    const envia_email = async (valores) => {
        $("#IM_Modal_Espera").modal();
            let error = "";
            let alerta = "Te hemos enviado a tu correo Institucional una liga, dale clic para acceder al sistema."
        const a = await ApiLogin.postLoginEmail(valores);
        if ('error' in a) {
            error = a.error;
            alerta = 'Ocurrio un error'
        }
        else {
            alert(alerta);
        }
        SetErrores(error);
        $("#IM_Modal_Espera").modal('hide');
    }

    */

    return (
        <section className="fondo_login">
            <div className="container container_login">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Iniciar Sesión</h3>
                        </div>
                        <div className="card-body">
                            página de login2
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default LoginEmail2