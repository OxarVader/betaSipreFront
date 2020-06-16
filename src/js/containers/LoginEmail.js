/*
import React, { useRef, useState, useEffect, Component } from 'react';
import ApiLogin from '../api/login_api'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import DialogoEspera from '../components/DialogoEspera'


const LoginEmail = ({ custom, ...props }) => {

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

    return (
        <section className="fondo_login">
            < DialogoEspera mensaje="Verificando su cuenta, espere un momento..." />
            <div className="container container_login">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Iniciar Sesión</h3>
                        </div>
                        <div className="card-body">
                            <Formik 
                                {...props}
                                initialValues={{ email: "", usuario: "" }}
                                validationSchema={Yup.object({
                                    email: Yup.string()
                                        .required("Escribe el email")
                                        .email("Escribe un email valido"),
                                    usuario: Yup.string()
                                        .required("Escribe el nombre del usuario")
                                })
                                }
                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                    envia_email(values);
                                }
                                }
                            >

                                <Form>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-at fa-2x"></i></span>
                                        </div>
                                        <Field type="email" name="email" placeholder="Correo Electrónico Corporativo Región" />
                                        <ErrorMessage name={"email"}  >{msg => <div style={{ color: "#FFFF00" }}>{msg}</div>}</ErrorMessage>
                                    </div>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user fa-2x"></i></span>
                                        </div>
                                        <Field type="text" name="usuario" placeholder="Nombre del usuario" />
                                        <ErrorMessage name={"usuario"}  >{msg => <div style={{ color: "#FFFF00" }}>{msg}</div>}</ErrorMessage>

                                    </div>
                                    <div className="alert alert-danger" role="alert" hidden={errores == ""}>
                                        {errores}
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Enviar" className="btn float-right login_btn" />
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default LoginEmail*/