/*
import React, {useRef, useState, useEffect, Component} from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Form, Field, useField, yupToFormErrors, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import Api from '../api/siscorps_api'




const SelectField = ({ label, ...props }) => {
    return (
        <div className={props.col}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <Select  {...props}
                options={props.options}
                name={props.field.name}
                isMulti={false}
                value={props.options ? props.options.find(option => option.value === props.field.value) : ''}
                onChange={(option) => {
                    props.form.setFieldValue(props.field.name, option.value)             
                    if (props.field.name == "cve_con") {
                        props.setTipoCon(option.tip_pag.trim())
                        const datos = getIncidenciaPorConcepto(props.form.values.cve_empl, option.value, props.form.setFieldValue, option.tip_pag)                        
                    }
                }
                }
                onBlur={props.field.onBlur}
            />
            <ErrorMessage name={props.field.name}  >{msg => <div style={{ color: "#FFFF00" }}>{msg}</div>}</ErrorMessage>
        </div>
    )
};

const CalendarField = ({ label, ...props }) => {
    return (
        <div style={{ backgroundColor: 'beige' }} col='col-3'>
            <p>Dias: {props.field.value.length}</p>
            <label htmlFor={props.id || props.name}>{label}</label>
            <DayPicker {...props}

                month={props.fecha_ini}
                canChangeMonth={false}
                onDayClick={(day, { selected, disabled }) => {
                    if (disabled) {
                        return;
                    }
                    const dias_sel = props.form.values.fechas

                    if (selected) {
                        const index = dias_sel.findIndex(selectedDay => DateUtils.isSameDay(selectedDay, day));
                        dias_sel.splice(index, 1);
                    }
                    else {
                        dias_sel.push(day)
                    }
                    props.form.setFieldValue(props.field.name, dias_sel)
                    console.log(props.form.values.fechas)
                }}
                selectedDays={props.form.values.fechas}
                disabledDays={[
                    {
                        before: props.fecha_ini,
                        after: props.fecha_ter
                       
                    },
                ]}
            />
            <ErrorMessage name={props.field.name}  >{msg => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>
            </div>
        )
};

const InputSoloLectura = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const num_rows = props.rows ? props.rows : '1';
  
    return (
      <div className={props.col}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input readOnly className="text-input form-control" {...field} {...props} />
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



const getIncidenciaPorConcepto = async (cve_empl, cve_con, setFieldValue) => {

    try {
        const datos = await Api.getPersoIncidencia(cve_empl, cve_con);
        await setFieldValue("importe", datos.importe)
        
        const arrayFechas = datos.fechas.trim() != "" ? datos.fechas.split(';').map(item =>

            new Date(item)) : [];
        await setFieldValue("fechas", arrayFechas)
        setTipoCon()
        //setErrores("")
    }
    catch (error) {

        //setErrores(error.message)
    }
}

const inicial_calendario = {
    "mes_inicial": new Date(1900,1)
}

const inicial_incidencia = {
    "tipo_con": '',
    "region": '',
    "cve_empl": '',
    "cve_con": "-1",
    "concepto": '',
    "importe": "0.00",
    "fechas": []
}
const inicial_periodo = {
    anio: 1900, qna: 0,
    fecha_ini: new Date("01/01/1900"),
    fecha_ter: new Date("01/01/1900"),
    fecha_pag: new Date("01/01/1900"),
    fecha_ini_format: "",
    fecha_ter_format: "",
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
  
  


const Incidencias = ({ custom, ...props }) => {

    const formConsRef = useRef()
    const formRef = useRef()
    const [errores, setErrores] = useState('');
    const [tipo_operacion, setTipoOperacion] = useState("Guardar")
    const [conceptos, setConceptos] = useState([])
    const [tipo_con, setTipoCon] = useState("")

    const [periodo, setPeriodo] = useState(inicial_periodo)
    const [ultima_asignacion, setUltimaAsignacion] = useState(inicial_asignacion)  
    const [incidencias, setIncidencias] = useState(inicial_incidencia)
   
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



    const getConceptos = async () => {
        const data = await Api.getConceptos();
        const lista = [{ value: "-1", label: "Selecciona un concepto", tip_pag: '' }]
        
        data.map(({ cve_con, descrip, tip_pag }) => (
            lista.push({ value: cve_con, label: `[${cve_con}]  ${descrip}`, tip_pag: tip_pag})
        ))
        setConceptos(lista);
    }


    const getBuscarEmpleados = async (inputValue, callback) => {
        if (!inputValue || inputValue.length<4) {
          callback([]);
        }
        else{
        const data = await Api.getBuscarEmpleados(inputValue);
        const lista = [];
        data.map(({cve_empl, nombre}) => (
                lista.push({ value: {cve_empl}, label: `[${cve_empl}]  ${nombre}`})
              ))
              callback(lista);
        }
    }

    
  const getUltimaAsignacion= async(cve_empl) =>{

    try {
        const datos = await Api.getUltimaAsignacion(cve_empl);
        
        await setUltimaAsignacion({ ...inicial_asignacion, ...datos })

        const asig = { "cve_empl": datos.cve_empl, "cve_con":"-1", "fechas": [], tipo:""}
        setIncidencias({ ...inicial_incidencia, ...asig })
        //setErrores("")
    }
    catch (error) {
       // setErrores(error.message)
    }
}

    const handleChange = (selectedOption ) => {
        if (selectedOption) {
            getUltimaAsignacion(selectedOption.value.cve_empl);
        }
      }

    const onButtonClick = async (operacion) => {
        await setTipoOperacion(operacion);
        const validador = await formRef.current.validateForm();
        formRef.current.setTouched(validador);
        if (formRef.current.isValid) {

            $('#IM_Modal').modal();
        }
    }

    const guardar_eliminar_Incidencia = async (valores, operacion) => {
        let errores_recib = "";

        if (operacion == "Guardar") {
            try {
                console.log(valores.fechas)

                let fechas = "";

                valores.fechas.forEach(function (valor) {
                    let dia = valor.getDate().toString().padStart(2, "0");
                    let mes = valor.getMonth() + 1
                    mes = mes.toString().padStart(2, "0");
                    fechas = fechas +  dia + "/" + mes + "/" +  valor.getFullYear() + ",";
                });

                if (fechas.trim().length > 0) {
                    fechas = fechas.substring(0, fechas.length - 1);
                }

                const valores_guardar = {
                    "cve_empl": valores.cve_empl,
                    "cve_con": valores.cve_con,
                    "importe": valores.importe,
                    "fechas": fechas
                }
                await Api.postIncidencia(valores_guardar);
                getIncidenciaPorConcepto(valores.cve_empl, valores.cve_con, formRef.current.setFieldValue)
                alert("Los datos fueron guardados con exito");
            }
            catch (error) {
                alert(error.message);
                setErrores(errores_recib)
            }
            finally {
                $('#IM_Modal').modal('hide');
                setErrores(errores_recib)
                formRef.current.setSubmitting(false)
            }
        }
        if (operacion == "Eliminar") {
            try {
                await Api.deleteIncidencia(valores.cve_empl, valores.cve_con);
                getIncidenciaPorConcepto(valores.cve_empl, valores.cve_con, formRef.current.setFieldValue)

                alert("La incidencia fue eliminada con exito");
            }
            catch (error) {
                alert(error.message);
                errores_recib = error.message
            }
            finally {
                $('#IM_Modal').modal('hide');
                setErrores(errores_recib)
                formRef.current.setSubmitting(false)
            }
        }
    }



    useEffect(() => {
        esta_autorizado();
        getPeriodo()
        getConceptos();

    }, []);


    return(
        <section id="seccion" className="mt-2">
            {(autorizado == false) ? <Redirect to="/login_email" />
                :
                <div className="container">
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
                                                                <InputSoloLectura label="Cve.Cat" name='cve_pue' type="text" col='col-2' />
                                                                <InputSoloLectura label="Categoria" name='puesto' type="text" col='col-6' />
                                                                <InputNumericoSoloLectura label="Haber Base" name="habbase" type="text" col='col-3' />
                                                            </div>
                                                            <div className="form-row">
                                                                <InputSoloLectura label="Fecha Inicio" name="fecha_ini" type="date" col='col-5' />
                                                                <InputSoloLectura label="Fecha Termino" name="fecha_termino" type="date" col='col-5 offset-1' />
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </Formik>

                                            </div>
                                        </div>
                                        <div className="card entrada_card">
                                            <div className="card-body fondo_card_n">

                                                <Formik
                                                    innerRef={formRef}
                                                    enableReinitialize
                                                    initialValues={{ ...incidencias }}
                                                    propiedades={props.form}
                                                    validationSchema={Yup.object({
                                                        cve_empl: Yup.string()
                                                            .required("No has selaccionado a ninguna persona"),
                                                        cve_con: Yup.number()
                                                            .required("Selecciona un concepto")
                                                            .min(1, "Selecciona un concepto"),
                                                        importe: Yup.number()
                                                            .test(
                                                                'Tipo Importe',
                                                                'Si el concepto es de tipo importe, el importe debe de ser mayor a 0',
                                                                function (item) {
                                                                    return (
                                                                        (tipo_con == "I" && this.parent.importe > 0)
                                                                        || (tipo_con == "D")
                                                                    )
                                                                }
                                                            ),
                                                        fechas: Yup.array()
                                                            .test(
                                                                'Numero de dias',
                                                                'Selecciona alguna fecha',
                                                                function (item) {
                                                                    return (
                                                                        (tipo_con == "D" && this.parent.fechas.length > 0)
                                                                        || (tipo_con == "I")
                                                                    )

                                                                }
                                                          )
                                                         .test(
                                                             'Limite de dias',
                                                             'El numero maximo de dias es 14',
                                                             function (item) {
                                                                 return (
                                                                     (tipo_con == "D" && this.parent.fechas.length <= 14)
                                                                     || (tipo_con == "I")
                                                                 )
                                                             }
                                                         )
                                                    })}

                                                    onSubmit={(values, { setSubmitting, resetForm }) => {
                                                        if (["Guardar", "Eliminar"].includes(tipo_operacion)) {
                                                            guardar_eliminar_Incidencia(values, tipo_operacion)
                                                        }
                                                    }
                                                    }
                                                >
                                                    <Form>
                                                        <div className="form-group mb-0">

                                                            <div className="form-row">

                                                                <InputSoloLectura label="CveEmpl" name="cve_empl" type="text" col='col-2' />
                                                                <Field label="Concepto" name='cve_con' component={SelectField} options={conceptos} setTipoCon={setTipoCon} col='col-9' />
                                                            </div>
                                                            <div className="form-row" hidden={tipo_con != 'I'}>
                                                                <InputNumerico label="Importe" name="importe" type="number" step="0.01" placeholder="0.00" col='col-3' />
                                                            </div>
                                                            <div className="form-row" hidden={tipo_con != 'D'} >

                                                                <Field col='col-9' label="" name='fechas' component={CalendarField}
                                                                    fecha_ini={periodo.fecha_ini}
                                                                    fecha_ter={periodo.fecha_ter}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="card-footer">
                                                            <button type="button" onClick={() => { onButtonClick("Eliminar"); }} className="btn btn-danger"  >Eliminar</button>
                                                            <button type="button" onClick={() => { onButtonClick("Guardar"); }} className="btn btn-success">Guardar</button>

                                                            <div className="modal fade" id="IM_Modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title" id="exampleModalLabel">{tipo_operacion == "Guardar" ? "Guardar incidencia" : "Eliminar incidencia"}</h5>
                                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            {tipo_operacion == "Guardar" ? "�Deseas guardar la incidencia?" : "�Deseas eliminar la incidencia?"}
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                                                            <button type="submit" className="btn btn-primary">Guardar</button>
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

                </div>
            }
</section>
)
}

export default Incidencias

*/