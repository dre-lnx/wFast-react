import { React } from "react";
import logo from '../assets/logo.svg';
import ReactDOM from 'react-dom';

const SignIn = () => {
    return (
        <div className="form-y-layout" id="signIn-form">
        <div className="header">
            <img src={logo} alt="wfast logo" className="formLogo"/>
        </div>
        <input type="text" placeholder="E-mail ou usuário"/>
        <input type="password" placeholder="Senha"/>
        <input type="submit" value="Entrar"/>
        <button className="form-link">Ainda não tem uma conta?</button>
        <button className="form-link">Esqueci minha senha</button>
    </div>
    )
};

export default SignIn;