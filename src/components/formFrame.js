import { React, useState } from "react";
import logo from '../assets/logo.svg';
import ReactDOM from 'react-dom';

const FormFrame = () => {

    const[form, setForm] = useState(false);

    const setSignForm = () => {
            if(form === true) {
                const element = document.querySelector('#signIn-form');
                element.classList.add('animate__animated', 'animate__bounceOutLeft');
            }
    }

    return (

    
    
    <div className="login-container-sm">
        <form>
            <div className="form-y-layout" id="signIn-form">
                <div className="header">
                    <img src={logo} alt="wfast logo" className="formLogo"/>
                </div>
                <input type="text" placeholder="E-mail ou usuário"/>
                <input type="password" placeholder="Senha"/>
                <input type="submit" value="Entrar"/>
                <button className="form-link" onClick={() => {setForm(true)}}>Ainda não tem uma conta?</button>
                <button className="form-link">Esqueci minha senha</button>
            </div>
            <div className="form-y-layout" id="signUp-form">
                <input type="text" placeholder="Nome de usuário"/>
                <input type="text" placeholder="E-mail"/>
                <input type="password" placeholder="Senha"/>
                <input type="submit" value="Criar Conta"/>
            </div>
        </form>
    </div>
    );
}

export default FormFrame;