import { React } from "react";
import logo from '../assets/logo.svg';
import ReactDOM from 'react-dom';

const SignUp = () => {
    return (
    <div className="form-y-layout" id="signUp-form">
        <input type="text" placeholder="Nome de usuário"/>
        <input type="text" placeholder="E-mail"/>
        <input type="password" placeholder="Senha"/>
        <input type="submit" value="Criar Conta"/>
    </div>
    )
};

export default SignUp;