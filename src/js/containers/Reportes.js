/*import React, { useRef, useState, useEffect, Component } from 'react';
import Api from '../api/siscorps_api'

import DialogoEspera from '../components/DialogoEspera'


const Reportes = () => {

   

    const getReporte = async (tipo) => {
        try {
            $('#IM_Modal_Espera').modal();   
            const fileURL = await Api.getReporte(tipo);
            window.open(fileURL);
        }
        catch (erro) {

        }
        finally {
            $('#IM_Modal_Espera').modal("hide");
        }
    }


    useEffect(() => {
       
    }, []);

    return (
        <div>
            <DialogoEspera mensaje="Genarando el reporte, espere un momento..." />
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-header" style={{ background: "beige" }}>
                    Reportes
                </div>
                <ul className="list-group list-group-flush">
                    <li onClick={() => { getReporte("e"); }} className="list-group-item">Prenomina Efectivo e</li>
                    <li onClick={() => { getReporte("t"); }} className="list-group-item">Prenomina Transferencia t</li>
                </ul>
            </div>
           
        </div>
    )
};

export default Reportes*/