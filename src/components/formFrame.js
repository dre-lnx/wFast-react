import React from "react";
import logo from '../assets/logo.svg';

const FormFrame = () => {
    return (
    
    <div className="login-container-sm">
        <form>
            <div className="form-y-layout">
                <div className="header">
                    <img src={logo} alt="wfast logo" className="formLogo"/>
                </div>
                <input type="text" placeholder="E-mail ou usuário"/>
                <input type="password" placeholder="Senha"/>
                <input type="submit" value="Entrar"/>
                <a href="google.com" className="form-link">Ainda não tem uma conta?</a>
                <a href="google.com" className="form-link">Esqueci minha senha</a>
            </div>
        </form>
    </div>
    );
}

export default FormFrame;