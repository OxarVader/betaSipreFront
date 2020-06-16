import React, { Component, useEffect, useState } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import Layout from "../components/Layout";

//import Inicio from "../containers/Inicio";
//import LoginEmail from "../containers/LoginEmail";
//import Login from "../containers/Login";

import Inicio2 from "../containers/Inicio2";
import LoginEmail2 from "../containers/LoginEmail2";
import Login2 from "../containers/Login2";

//import Asignaciones from "../containers/Asignaciones";
//import Incidencias from "../containers/Incidencias";
//import Reportes from "../containers/Reportes";
//import Api from "../../api/siscorps_api";

const App = ({ custom, ...props }) => {
  return (
    <HashRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Inicio2} />
          <Route exact path="/login_email" component={LoginEmail2} />
          <Route exact path="/login/:token" component={Login2} />
        </Switch>
      </Layout>
    </HashRouter>
    /*
    <HashRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route exact path="/login_email" component={LoginEmail} />
          <Route exact path="/login/:token" component={Login} />          
          <Route exact path="/asignaciones" component={Asignaciones} />
          <Route exact path="/incidencias" component={Incidencias} />
          <Route exact path="/reportes" component={Reportes} />
        </Switch>
      </Layout>
    </HashRouter>
    */
  );
};

export default App;
