import { Button } from "react-bootstrap";
import { useState } from "react";

const Login = ({ setLogin }) => {
  //State elements
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  const checkLogin = (e) => {
    e.preventDefault();

    if (user === "admin" && password === "admin") {
      setLogin(true);
    } else {
      console.log("Está mal");
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <h2 className="bold grey-color">Login</h2>
      <form className="form" onSubmit={checkLogin}>
        <label className="form-label grey-color">Usuario</label>
        <input
          className="form-control"
          required
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        ></input>
        <label className="form-label mt-3 grey-color">Contraseña</label>
        <input
          className="form-control"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {error && <div className="error">Hay un error</div>}
        <div className="d-flex justify-content-center align-items-center w-100 mt-3">
          <Button type={"submit"}>Entrar</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
