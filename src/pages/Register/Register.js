import style from "./Register.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useEffect, useState } from "react";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

 const user = {
    displayName: name,
    email,
    password,
  };

    if (password !== confirmPassword) {
      setError("As senhas não conferem");
    } else {
      setError("");
    }

      const res = await createUser(user);
      console.log(res);
    if (password === confirmPassword) {
      setSuccess("Usuário cadastrado com sucesso");
      console.log([user]);
    } else {
      setSuccess("");
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={style.register}>
      <h1>Cadastre-se para postar</h1>
      <p>crie seu usuario</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="name"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
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
        <label>
          <span>Confirme sua senha:</span>
          <input
            type="password"
            name="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
       {!loading && (<input type="submit" value={"Cadastrar"} className="btn" />)}
        {loading && (<input type="submit" value={"Aguarde..."} disabled className="btn" />)}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}

export default Register;
