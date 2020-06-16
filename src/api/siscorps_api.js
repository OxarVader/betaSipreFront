import ApiLogin from "./login_api";

//const ruta_inicial = "https://localhost:44376/api";
const ruta_inicial = "http://10.0.1.12:8000/api";

class Api {
  async verificarAutorizacion() {
    const ruta = `${ruta_inicial}/Cuentas/Verification`;
    const token = ApiLogin.getToken();

    const query = await fetch(ruta, {
      method: "POST",
      body: JSON.stringify({ token: token }),
      headers: { "Content-Type": "application/json" },
    });
    if (query.ok) {
      return true;
    }
    return false;
  }

  async getBuscarEmpleados(valor_buscado) {
    const ruta = `${ruta_inicial}/perso?valor_buscado=${valor_buscado}`;

    const query = await fetch(ruta, {
      method: "get",
      headers: ApiLogin.authHeader(),
    });

    const data = await query.json();
    return data;
  }

  async getUltimaAsignacion(cve_empl) {
    const ruta = `${ruta_inicial}/PersoUltimaAsignacion?cve_empl=${cve_empl}`;

    const query = await fetch(ruta, {
      method: "get",
      headers: ApiLogin.authHeader(),
    });

    const data = await query.json();

    if (query.ok) {
      return await data;
    }

    throw new Error(data.message);
  }

  // ** Se mostraran todos los servicios para esa region ** //
  async getServicios() {
    const ruta = `${ruta_inicial}/servicio/?valor_buscado=Todas`;
    const query = await fetch(ruta, {
      headers: ApiLogin.authHeader(),
    });

    const data = await query.json();
    return data;
  }

  async getMotivos() {
    const ruta = `${ruta_inicial}/CMotivo`;
    const query = await fetch(ruta, {
      headers: ApiLogin.authHeader(),
    });

    const data = await query.json();
    return data;
  }

  async getPuestos() {
    const ruta = `${ruta_inicial}/cpuesto/`;
    const query = await fetch(ruta, {
      headers: ApiLogin.authHeader(),
    });

    const data = await query.json();
    return data;
  }

  async getTurnos() {
    const ruta = `${ruta_inicial}/cturno/`;
    const query = await fetch(ruta, {
      headers: ApiLogin.authHeader(),
    });

    const data = await query.json();
    return data;
  }

  async getTabulador(nivel, rango) {
    const ruta = `${ruta_inicial}/ctabula/?nivel=${nivel}&rango=${rango}`;

    const query = await fetch(ruta, {
      headers: ApiLogin.authHeader(),
    });

    const data = await query.json();
    if (query.ok) {
      return await data;
    }

    throw new Error(data.message);
  }

  async getConceptos() {
    const ruta = `${ruta_inicial}/CConcepto`;
    const query = await fetch(ruta, {
      headers: ApiLogin.authHeader(),
    });

    const data = await query.json();
    return data;
  }

  async getPeriodoActivo() {
    const ruta = `${ruta_inicial}/CPeriodoActivo`;

    const query = await fetch(ruta, {
      headers: ApiLogin.authHeader(),
    });

    const data = await query.json();

    if (query.ok) {
      const periodo = {
        anio: data.ano,
        qna: data.quincena,
        fecha_ini: new Date(data.fecha_ini),
        fecha_ter: new Date(data.fecha_ter),
        fecha_pag: new Date(data.fecha_pag),
        fecha_ini_format: new Date(data.fecha_ini)
          .toISOString()
          .substring(0, 10),
        fecha_ter_format: new Date(data.fecha_ter)
          .toISOString()
          .substring(0, 10),
      };
      return await periodo;
    }

    throw new Error(data.message);
  }

  async postAsignacion(datos) {
    const ruta = `${ruta_inicial}/PersoAsignacion/`;
    const query = await fetch(ruta, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: ApiLogin.authHeader(),
    });

    if (query.ok) {
      return;
    }
    const data = await query.json();
    throw new Error(data.message);
  }

  async putAsignacion(cve_empl, datos) {
    const ruta = `${ruta_inicial}/PersoAsignacion/${cve_empl}`;
    const query = await fetch(ruta, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: ApiLogin.authHeader(),
    });

    if (query.ok) {
      return;
    }
    const data = await query.json();
    throw new Error(data.message);
  }

  async deleteAsignacion(cve_empl, fecha_ini) {
    const ruta = `${ruta_inicial}/PersoAsignacion/${cve_empl}?fecha_ini=${fecha_ini}`;
    const query = await fetch(ruta, {
      method: "DELETE",
      headers: ApiLogin.authHeader(),
    });

    if (query.ok) {
      return;
    }

    const data = await query.json();
    throw new Error(data.message);
  }

  async getPersoIncidencia(cve_empl, cve_con) {
    const ruta = `${ruta_inicial}/PersoIncidencia?cve_empl=${cve_empl}&cve_con=${cve_con}`;

    const query = await fetch(ruta, {
      method: "get",
      headers: ApiLogin.authHeader(),
    });

    const data = await query.json();

    if (query.ok) {
      return await data;
    }
    throw new Error(data.message);
  }

  async postIncidencia(datos) {
    const ruta = `${ruta_inicial}/PersoIncidencia/`;
    const query = await fetch(ruta, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: ApiLogin.authHeader(),
    });

    if (query.ok) {
      return;
    }
    const data = await query.json();
    throw new Error(data.message);
  }

  async deleteIncidencia(cve_empl, cve_con) {
    const ruta = `${ruta_inicial}/PersoIncidencia/${cve_empl}?cve_con=${cve_con}`;
    const query = await fetch(ruta, {
      method: "DELETE",
      headers: ApiLogin.authHeader(),
    });

    if (query.ok) {
      return;
    }

    const data = await query.json();
    throw new Error(data.message);
  }

  async getReporte(tipo_pago) {
    const ruta = `${ruta_inicial}/Reporte?tipo_pago=${tipo_pago}`;
    const response = await fetch(ruta, {
      headers: ApiLogin.authHeader(),
    });

    const data_blob = await response.blob();
    var url = window.URL || window.webkitURL;
    const fileURL = url.createObjectURL(data_blob);

    return fileURL;
  }
}

export default new Api();
