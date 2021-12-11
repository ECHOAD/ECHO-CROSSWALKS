import React from "react";
import logo from "./Img/Logo.png";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handelLogin,
    handleSignup,
    hasAccount,
    sethasAccount,
    emailError,
    passwordError,
  } = props;

  return (
    <section className="login">
      <div className="loginContainer">
        <center>
          <div>
            <img src={logo} className="ImagenLogin" alt="Logo de la Pagina" />
            <h2 style={{ color: "white" }}>ECHO CROSSWALK</h2>
          </div>
        </center>
        <div className="form-group">
          <label>
            <strong>Usuario</strong>
          </label>
          <input
            type="text"
            autoFocus
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="errorMsg">{emailError}</p>
        </div>
        <div className="form-group">
          <label>
            <strong>Contraseña</strong>
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="errorMsg">{passwordError}</p>
        </div>


        <div className="btnContainer">
          {hasAccount ? (
            <>
              <button onClick={handelLogin}>Ingresar</button>
              <p>
                ¿No tienes una Cuenta ?{" "}
                <span onClick={() => sethasAccount(!hasAccount)}>
                  Registrate
                </span>{" "}
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSignup}>Registrate</button>
              <p>
                {" "}
                ¿Ya tienes una Cuenta?{" "}
                <span onClick={() => sethasAccount(!hasAccount)}>
                  Ingresar
                </span>{" "}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
