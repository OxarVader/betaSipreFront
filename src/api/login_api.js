//const ruta_inicial = "https://localhost:44376/api";
const ruta_inicial = "http://10.0.1.12:8000/api";

class ApiLogin {
  async postLoginEmail(datos) {
    const ruta = `${ruta_inicial}/Cuentas/EmailLogin/`;
    const query = await fetch(ruta, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await query.json();

    if (query.ok) {
      return data;
    }

    return { error: "El usuario o la constraseña no son correctos" };
  }

  async getLogin(token_email) {
    const ruta = `${ruta_inicial}/Cuentas/Login?token_email=${token_email}`;
    const query = await fetch(ruta, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await query.json();

    if (query.ok) {
      localStorage.setItem("token_sip", data.token);
      localStorage.setItem("token_datos_sip", JSON.stringify(data));
      return data;
    }

    throw new Error(data.message);
  }

  getToken() {
    return localStorage.getItem("token_sip");
  }

  getTokenDatos() {
    const token_datos = localStorage.getItem("token_datos_sip");
    return token_datos;
  }

  logout() {
    localStorage.clear();
  }

  authHeader() {
    const token_sip = this.getToken();
    if (token_sip) {
      return {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token_sip,
      };
    } else {
      return {};
    }
  }
}

export default new ApiLogin();
