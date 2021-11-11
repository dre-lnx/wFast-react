import { React, useState, useEffect } from "react";
import logo from '../assets/logo.svg';
import ReactDOM from 'react-dom';

const FormFrame = () => {

    const[form, setForm] = useState(false);

    useEffect(() => {
        console.log(form);
    }, [form])

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (

    
    
    <div className="login-container-sm">
        <form onSubmit = {(e) => handleSubmit(e)}>
                <div className="form-y-layout" id="signIn-form">
                <div className="header">
                    <img src={logo} alt="wfast logo" className="formLogo"/>
                </div>
            {
                form === false &&
                <>
                <input type="text" placeholder="E-mail ou usuário"/>
                <input type="password" placeholder="Senha"/>
                <input type="submit" value="Entrar"/>
                <button className="form-link" onClick={() => {setForm(true)}}>Ainda não tem uma conta?</button>
                <button className="form-link">Esqueci minha senha</button>
            </>
            }
            </div>
            {form === true &&
            <div className="form-y-layout" id="signUp-form">
                <input type="text" placeholder="Nome de usuário"/>
                <input type="text" placeholder="E-mail"/>
                <input type="password" placeholder="Senha"/>
                <input type="submit" value="Criar Conta"/>
                <button className="form-link"  onClick={() => {setForm(false)}}>Já possuo uma conta</button>
            </div>
            }
        </form>
    </div>
    );
}

export default FormFrame;