/*
import React, {useRef, useState, useEffect, Component} from 'react';
import {Redirect } from 'react-router-dom';

import { Formik, Form, Field, useField, yupToFormErrors, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Api from '../api/siscorps_api'

import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import DialogoEspera from '../components/DialogoEspera'



const InputGenerico = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className={props.col}>
      <label htmlFor={props.id || props.name}>{label}</label>
          <input className="text-input form-control" {...field} {...props} />
          <ErrorMessage name={field.name} >{msg => <div style={{ color: "#FFFF00" }}>{msg}</div>}</ErrorMessage>
    </div>
  );
};


const InputTextArea = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className={props.col}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="form-control" rows="3" {...field} {...props} />
      
      <ErrorMessage name={field.name} >{msg => 
      <div className="alert alert-warning alert-dismissible fade show" role="alert" >
      <strong>Revisa lo siguiente: </strong> {msg}
      
      </div>}
      </ErrorMessage>

    </div>
  );
};



const InputSoloLectura = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  const num_rows = props.rows ? props.rows : '1';

  return (
    <div className={props.col}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input readOnly className="text-input form-control" {...field} {...props} />
    </div>
  );
};



const TextAreaSoloLectura = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  const num_rows = props.rows ? props.rows : '1';

  return (
    <div className={props.col}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea readOnly className="form-control" rows={num_rows} {...field} {...props} />

    </div>
  );
};

const InputNumericoSoloLectura = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className={props.col}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className="input-group-prepend">
             <span className="input-group-text">$</span>
             <input readOnly className="text-input form-control" {...field} {...props} />
      </div>
     </div>
  );
};

const InputNumerico = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className={props.col}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className="input-group-prepend">
             <span className="input-group-text">$</span>
             <input className="form-control" {...field} {...props} />
      </div>
          <ErrorMessage name={field.name} >{msg => <div style={{ color: "#FFFF00" }}>{msg}</div>}</ErrorMessage>
     </div>
  );
};



  const SelectField = ({ label, ...props }) => {
    return (
      <div className={props.col}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <Select  {...props}
          options={props.options}
          name={props.field.name}
          isMulti={false}
          value={props.options ? props.options.find(option => option.value === props.field.value) : ''}
          onChange={(option) => 
            {
            props.form.setFieldValue(props.field.name, option.value)
              if (props.field.name == "cve_pue"){
              
                const nivel = option.value;
                const rango =  props.form.getFieldProps("rango").value;              
                setDatosTabulador(nivel, rango, props.form.setFieldValue);                           
              }
              if (props.field.name == "rango") {

                  const nivel = props.form.getFieldProps("cve_pue").value;;
                  const rango = option.value;
                  setDatosTabulador(nivel, rango, props.form.setFieldValue);
              }     
            }
          }
          onBlur={props.field.onBlur}
        />
            <ErrorMessage name={props.field.name}  >{msg => <div style={{ color: "#FFFF00" }}>{msg}</div>}</ErrorMessage>         
      </div>
    )
  };

const rangos = [
    { value: 1, label: "1" },
    { value: 2, label: "2" }
]

const domingos =[
  {value : "Si", label: "Si"},
  {value : "No", label: "No"}
]

const inicial_periodo = {
    anio: 1900, qna: 0,
    fecha_ini: new Date("01/01/1900"),
    fecha_ter: new Date("01/01/1900"),
    fecha_pag: new Date("01/01/1900"),
    fecha_ini_format: "",
    fecha_ter_format: ""
}

const inicial_asignacion = {
  "cve_empl": '',
  "cve_ser": '',
  "servicio": '',
  "cve_pue": '',
  "puesto": '',
  "cve_motiv": '',
  "motivo": '', 
  "domingo": '',
  "categoria": '',
  "comp_diario": '0.00',
  "nivel": '',
  "rango": '',
  "cve_tur": '',
  "turno": '',
  "habbase": '0.00',
  "habubica": '0.00',
  "fecha_ini": '1900-01-01',
  "fecha_termino": '1900-01-01',
  "observa": ''
}

const setDatosTabulador = async (nivel, rango, setFieldValue) => {
    console.log("Rango: " + nivel)
    console.log("Rango: " + rango)
  const data = await Api.getTabulador(nivel, rango);
  const domingo =  (data.habbase == data.habubica) ? "No" : "Si";
  setFieldValue("habbase", data.habbase)
  setFieldValue("habubica", data.habubica)
  setFieldValue("domingo",domingo)
}

const eliminar_Asignacion= async(valores, operacion) =>{
    if (operacion == "Eliminar") {
        try {
            $('#IM_Modal_Espera').modal();
            const data2 = await Api.deleteAsignacion(1);
        }
        catch (error) {

        }
        finally {
            $('#IM_Modal_Espera').modal("hide");
        }
  }
}




const Asignaciones = ({ custom, ...props }) => {
    const formRef = useRef()
    const formConsRef = useRef()
    const [errores, setErrores] = useState('');
    const [servicios, setServicios] = useState([])
    const [motivos, setMotivos] = useState([])
    const [puestos, setPuestos] = useState([])

    const [turnos, setTurnos] = useState([])
    const [periodo, setPeriodo] = useState(inicial_periodo)

    const [ultima_asignacion, setUltimaAsignacion] = useState(inicial_asignacion)
    const [nueva_asignacion, setNuevaAsignacion] = useState(inicial_asignacion)
    const [tipo_operacion, setTipoOperacion] = useState("Nuevo")

    const [autorizado, SetAutorizado] = useState(true);

    const esta_autorizado = async () => {
        const aut = await Api.verificarAutorizacion();
        if (!aut) {
            SetAutorizado(false);
            window.location.reload();
        }

    }


    const getPeriodo = async () => {
        const data = await Api.getPeriodoActivo();
        setPeriodo({ ...inicial_periodo, ...data });
    }


    const getBuscarEmpleados = async (inputValue, callback) => {
        if (!inputValue || inputValue.length < 4) {
            callback([]);
        }
        else {
            const data = await Api.getBuscarEmpleados(inputValue);
            const lista = [];
            data.map(({ cve_empl, nombre }) => (
                lista.push({ value: { cve_empl }, label: `[${cve_empl}]  ${nombre}` })
            ))
            callback(lista);
        }
    }

    const getUltimaAsignacion = async (cve_empl) => {

        try {
            const datos = await Api.getUltimaAsignacion(cve_empl);

            setUltimaAsignacion({ ...inicial_asignacion, ...datos })

            datos.observa = '';
            datos.domingo = (datos.habbase == datos.habubica) ? "No" : "Si";

            setNuevaAsignacion({ ...inicial_asignacion, ...datos })
            setErrores("")
        }
        catch (error) {
            setErrores(error.message)
        }
    }
    const getServicios = async () => {
        const data = await Api.getServicios();
        const lista = []
        data.map(({ cve_ser, servicio }) => (
            lista.push({ value: cve_ser, label: `[${cve_ser}]  ${servicio}` })
        ))
        setServicios(lista);
    }

    const getMotivos = async () => {
        const data = await Api.getMotivos();
        const lista = []
        data.map(({ cve_motiv, motivo }) => (
            lista.push({ value: cve_motiv, label: `[${cve_motiv}]  ${motivo}` })
        ))
        setMotivos(lista);
    }

    const getTurnos = async () => {
        const data = await Api.getTurnos();
        const lista = []
        data.map(({ cve_tur, descrip }) => (
            lista.push({ value: cve_tur, label: `[${cve_tur}]  ${descrip}` })
        ))
        setTurnos(lista);
    }

    const getPuestos = async () => {
        const data = await Api.getPuestos();
        const lista = []
        data.map(({ cve_pue, descrip }) => (
            lista.push({ value: cve_pue, label: `[${cve_pue}]  ${descrip}` })
        ))
        setPuestos(lista);
    }


    const onButtonClick = async (operacion) => {
        await setTipoOperacion(operacion);
        const validador = await formRef.current.validateForm();
        formRef.current.setTouched(validador);
        if (formRef.current.isValid) {

            $('#IM_Modal').modal();
        }
    }

    const onButtonClickEliminar = async (operacion) => {
        setTipoOperacion(operacion);
        const validador = await formConsRef.current.validateForm();
        formConsRef.current.setTouched(validador);

        if (formConsRef.current.isValid) {
            $('#E_Modal').modal();
        }
    }

    const handleChange = (selectedOption) => {
        if (selectedOption) {
            getUltimaAsignacion(selectedOption.value.cve_empl);
        }
    }


    const eliminar_Asignacion = async (valores, operacion) => {
        let errores_recib = "";

        if (operacion == "Eliminar") {
            try {
                await Api.deleteAsignacion(valores.cve_empl, valores.fecha_ini);
                formConsRef.current.resetForm({})
                getUltimaAsignacion(valores.cve_empl)
                alert("La asignacion fue eliminada con exito");
            }
            catch (error) {
                alert(error.message);
                errores_recib = error.message
            }
            finally {
                $('#E_Modal').modal('hide');
                setErrores(errores_recib)
                formConsRef.current.setSubmitting(false)
            }
        }
    }



    const guardar_modificar_Asignacion = async (valores, operacion) => {
        let errores_recib = "";

        if (operacion == "Nuevo") {
            try {
                $('#IM_Modal_Espera').modal();
                await Api.postAsignacion(valores);
                formRef.current.resetForm({})
                getUltimaAsignacion(valores.cve_empl)
                alert("Los datos fueron guardados con exito");
            }
            catch (error) {
                alert(error.message);
                errores_recib = error.message
            }
            finally {
                $('#IM_Modal').modal('hide');
                $('#IM_Modal_Espera').modal("hide");
                setErrores(errores_recib)
                formRef.current.setSubmitting(false)

            }
        }
        if (operacion == "Modificar") {
            try {
                $('#IM_Modal_Espera').modal();
                await Api.putAsignacion(valores.cve_empl, valores);
                formRef.current.resetForm({})
                getUltimaAsignacion(valores.cve_empl)
                alert("Los datos fueron guardados con exito");
            }
            catch (error) {
                alert(error.message);
                errores_recib = error.message
            }
            finally {
                $('#IM_Modal').modal('hide');
                $('#IM_Modal_Espera').modal("hide");
                setErrores(errores_recib)
                formRef.current.setSubmitting(false)
            }

        }
    }

    useEffect(() => {
        esta_autorizado();
        getPeriodo();
        //var fecha = "2019-07-01 12:00:00";
        //console.log(fecha);
        //var nueva = fecha.split(" ")[0].split("-").reverse().join("-");
        //console.log(nueva);
        getServicios();
        getMotivos();
        getPuestos();
        getTurnos();
    }, []);



    return (    
        <section id="seccion" className="mt-2">
            {(autorizado == false) ? <Redirect to="/login_email" />
                :

                <div className="container">
                    <DialogoEspera mensaje="Guardando la asignacion, espere un momento..." />
                    <div className="row">
                        <div className="col mb-4">
                            <div className="card bg-light">
                                <div className="card-header">
                                    <div className="form-row mb-0 mt-0">
                                        <div className="col-md-8 col-7">
                                            <AsyncSelect
                                                loadOptions={getBuscarEmpleados}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="card-deck">
                                        <div className="card lectura_card">
                                            <div className="card-body">
                                                <Formik {...props}
                                                    innerRef={formConsRef}
                                                    enableReinitialize
                                                    initialValues={{ ...ultima_asignacion }}
                                                    onSubmit={(values, { setSubmitting, resetForm }) => {
                                                        if (["Eliminar"].includes(tipo_operacion)) {
                                                            eliminar_Asignacion(values, tipo_operacion)
                                                        }
                                                    }}
                                                    validationSchema={Yup.object({
                                                        cve_empl: Yup.string()
                                                            .ensure()
                                                            .required("No has selaccionado a ninguna persona"),
                                                    })
                                                    }
                                                >

                                                    <Form>
                                                        <ErrorMessage name="cve_empl" >{msg => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>
                                                        <div className="form-group mb-0">
                                                            <div className="alert alert-danger" role="alert" hidden={errores == ""}>
                                                                {errores}
                                                            </div>
                                                            <div className="form-row">
                                                                <InputSoloLectura label="Cve.Serv" name="cve_ser" type="text" col='col-2' />
                                                                <InputSoloLectura label="Servicio" name="servicio" type="text" col='col-9' />
                                                            </div>
                                                            <div className="form-row">
                                                                <InputSoloLectura label="Motivo" name="motivo" type="text" col='col-9' />
                                                                <InputSoloLectura label="Domingos" name="domingo" type="text" col='col' />
                                                            </div>
                                                            <div className="form-row">
                                                                <InputSoloLectura label="Cve.Cat" name='cve_pue' type="text" col='col-2' />
                                                                <InputSoloLectura label="Categoria" name='puesto' type="text" col='col-6' />
                                                                <InputNumericoSoloLectura label="Comp.Diario" name="comp_diario" col='col-3' />
                                                            </div>
                                                            <div className="form-row">
                                                                <InputSoloLectura label="Nivel" name="nivel" type="text" col='col-4' />
                                                                <InputSoloLectura label="Rango" name="rango" type="text" col='col-4' />
                                                                <InputSoloLectura label="Turno" name='turno' type="text" col='col' />
                                                            </div>
                                                            <div className="form-row">
                                                                <InputNumericoSoloLectura label="Haber Base" name="habbase" type="text" col='col-3' />
                                                                <InputNumericoSoloLectura label="Haber Ubica" name="habubica" type="text" col='col-3  offset-3' />
                                                            </div>
                                                            <div className="form-row">
                                                                <InputSoloLectura label="Fecha Inicio" name="fecha_ini" type="date" col='col-5' />
                                                                <InputSoloLectura label="Fecha Termino" name="fecha_termino" type="date" col='col-5 offset-2' />
                                                            </div>
                                                            <div className="form-row">
                                                                <TextAreaSoloLectura label="Observaciones" name="observa" type='text-area' col='col-10' rows='5' />
                                                            </div>
                                                            <div className="card-footer">
                                                                <button type="button" onClick={() => { onButtonClickEliminar("Eliminar"); }} className="btn btn-danger">Eliminar</button>
                                                                <div className="modal fade" id="E_Modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                    <div className="modal-dialog">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title" id="exampleModalLabel">{tipo_operacion == "Eliminar" ? "Eliminar asignación" : ""}</h5>
                                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                    <span aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                {tipo_operacion == "Eliminar" ? "¿Deseas eliminar esta asignación?" : ""}
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                                                                <button type="submit" className="btn btn-primary">Aceptar</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </Form>
                                                </Formik>
                                            </div>
                                        </div>
                                        <div className="card entrada_card card-body fondo_card_n">
                                            <Formik
                                                innerRef={formRef}
                                                enableReinitialize
                                                initialValues={{ ...nueva_asignacion }}
                                                propiedades={props.form}
                                                validationSchema={Yup.object({
                                                    cve_ser: Yup.string()
                                                        .ensure()
                                                        .required("Selecciona una servicio"),
                                                    cve_motiv: Yup.string()
                                                        .required("Selecciona un motivo")
                                                        .test(
                                                            'OpModificar',
                                                            'No se puede modificar este dato en una asignacion ya guardada',
                                                            function (item) {
                                                                return (
                                                                    (tipo_operacion == "Nuevo")
                                                                    ||
                                                                    (tipo_operacion == "Modificar" &&
                                                                        (this.parent.cve_motiv == ultima_asignacion.cve_motiv))
                                                                )
                                                            }
                                                        ),
                                                    cve_pue: Yup.string()
                                                        .required("Selecciona una categoria"),
                                                    domingo: Yup.string()
                                                        .required("Selecciona Si o No")
                                                        .oneOf(["Si", "No"], "Selecciona Si o No"),
                                                    comp_diario: Yup.number()
                                                        .required("El importe es requerido")
                                                        .default(0.00)
                                                        .min(1, "El importe es muy bajo")
                                                        .max(10000, "El importe es muy alto"),
                                                    cve_tur: Yup.string()
                                                        .required("Selecciona un turno")
                                                        .test(
                                                            'OpModificar',
                                                            'No se puede modificar este dato en una asignacion ya guardada',
                                                            function (item) {
                                                                return (
                                                                    (tipo_operacion == "Nuevo")
                                                                    ||
                                                                    (tipo_operacion == "Modificar" &&
                                                                        (this.parent.cve_tur == ultima_asignacion.cve_tur))
                                                                )
                                                            }
                                                        ),
                                                    fecha_ini: Yup.string()
                                                        .test(
                                                            'OpModificar',
                                                            'No se puede modificar este dato en una asignacion ya guardada',
                                                            function (item) {
                                                                return (

                                                                    (tipo_operacion == "Nuevo")
                                                                    ||
                                                                    (tipo_operacion == "Modificar" &&
                                                                        (this.parent.fecha_ini == ultima_asignacion.fecha_ini))
                                                                )
                                                            }
                                                        )
                                                        .test(
                                                            'Fecha inicial menor',
                                                            'La fecha no puede ser menor a la fecha inicial de la ultima asignacion',
                                                            function (item) {
                                                                return (
                                                                    (this.parent.fecha_ini >= ultima_asignacion.fecha_ini)
                                                                )
                                                            }
                                                        )
                                                        .test(
                                                            'Fecha inicial dentro del periodo',
                                                            'La fecha inicial debe de estar entre el periodo actual',
                                                            function (item) {
                                                                return (
                                                                    (this.parent.fecha_ini >= periodo.fecha_ini_format
                                                                        & this.parent.fecha_ini <= periodo.fecha_ter_format)
                                                                )
                                                            }
                                                        )
                                                    ,
                                                    observa: Yup.string()

                                                        .test(
                                                            'OpModificar',
                                                            'No se pueden modificar las observaciones, estas se guardaran son su valor anterior',
                                                            function (item) {
                                                                return (
                                                                    (tipo_operacion == "Nuevo")
                                                                    ||
                                                                    (tipo_operacion == "Modificar" &&
                                                                        (this.parent.observa == undefined || this.parent.observa == ""))
                                                                )
                                                            }
                                                        )
                                                        .test(
                                                            'AsignacionesIguales',
                                                            'La nueva asignacion no puede ser igual a la ultima',
                                                            function (item) {
                                                                const nueva = this.parent
                                                                const ultima = ultima_asignacion;

                                                                return (
                                                                    (
                                                                        (tipo_operacion == "Nuevo" &&
                                                                            (nueva.cve_ser != ultima.cve_ser
                                                                                || nueva.cve_motiv != ultima.cve_motiv
                                                                                || nueva.cve_pue != ultima.cve_pue
                                                                                || nueva.comp_diario != ultima.comp_diario
                                                                                || nueva.cve_tur != ultima.cve_tur
                                                                                || nueva.fecha_ini != ultima.fecha_ini
                                                                            )
                                                                        )
                                                                        ||
                                                                        (tipo_operacion == "Modificar" &&
                                                                            (nueva.cve_ser != ultima.cve_ser
                                                                                || nueva.cve_pue != ultima.cve_pue
                                                                                || nueva.comp_diario != ultima.comp_diario
                                                                            )
                                                                        )
                                                                    )
                                                                )
                                                            }
                                                        )

                                                })}
                                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                                    if (["Nuevo", "Modificar"].includes(tipo_operacion)) {
                                                        guardar_modificar_Asignacion(values, tipo_operacion)
                                                    }
                                                }
                                                }
                                            >
                                                <Form>
                                                    <div className="form-group mb-0">
                                                        <div className="form-row">
                                                            <Field label="Servicio" name='cve_ser' component={SelectField} options={servicios} col='col' />
                                                        </div>
                                                        <div className="form-row">
                                                            <Field label="Motivo" name='cve_motiv' component={SelectField} options={motivos} col='col-9' />
                                                            <InputSoloLectura label="Domingos" name="domingo" type="text" col='col' />
                                                        </div>
                                                        <div className="form-row">
                                                            <Field label="Categoria" name='cve_pue' component={SelectField} options={puestos} col='col-7'

                                                            />
                                                            <InputNumericoSoloLectura label="Comp.Diario" name="comp_diario" col='col-3' />
                                                        </div>

                                                        <div className="form-row">
                                                            <InputSoloLectura label="Nivel" name="cve_pue" type="text" col='col-4' />
                                                            <Field label="Rango" name='rango' component={SelectField} options={rangos} col='col-4' />
                                                            <Field label="Turno" name='cve_tur' component={SelectField} options={turnos} col='col' />
                                                        </div>
                                                        <div className="form-row">
                                                            <InputNumericoSoloLectura label="Haber Base" name="habbase" type="text" col='col-3' />
                                                            <InputNumericoSoloLectura label="Haber Ubica" name="habubica" type="text" col='col-3  offset-3' />
                                                        </div>
                                                        <div className="form-row">

                                                            <InputGenerico label="Fecha Inicio" name="fecha_ini" type="date" min={periodo.fecha_ini_format} max={periodo.fecha_ter_format} placeholder="0000" col='col-4' />
                                                        </div>
                                                        <div className="form-row">
                                                            <InputTextArea label="Observaciones" name="observa" col='col-10' rows='3' />
                                                        </div>
                                                    </div>
                                                    <div className="card-footer">
                                                        <button type="button" onClick={() => { onButtonClick("Nuevo"); }} className="btn btn-success">Nuevo</button>
                                                        <button type="button" onClick={() => { onButtonClick("Modificar"); }} className="btn btn-warning">Modificar</button>
                                                        <div className="modal fade" id="IM_Modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div className="modal-dialog">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title" id="exampleModalLabel">{tipo_operacion == "Nuevo" ? "Nueva asignación" : "Modificar asignación"}</h5>
                                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        {tipo_operacion == "Nuevo" ? "¿Deseas crear la nueva asignación?" : "¿Deseas modificar la asignación?"}
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                                                        <button type="submit" className="btn btn-primary">Aceptar</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </Formik>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            }
            </section>
    );
  };
  
  export default Asignaciones

*/