import style from "./Login.module.css";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, error: authError, loading } = useAuthentication();

const handleSubmit = async (e) => {
    e.preventDefault();

 const user = {
    email,
    password,
  };
      const res = await login(user);
      console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={style.login}>
      <h1>Entre com sua conta</h1>
      <p>Entre com seu usuario</p>
      <form onSubmit={handleSubmit}>   
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!loading && (
          <input type="submit" value={"Entrar"} className="btn" />
        )}
        {loading && (
          <input type="submit" value={"Aguarde..."} disabled className="btn" />
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
