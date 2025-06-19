import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import FormWrapper from "../components/FormWrapper";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert(data.message || "Erro ao logar.");
    }
  };

  return (
    <FormWrapper title="Login" onSubmit={handleLogin}>
      <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
      <Button type="submit" className="bg-blue-500">Entrar</Button>
    </FormWrapper>
  );
}