import { React, useState } from "react";
import logo from '../assets/logo.svg';

const FormFrame = () => {

    const [signUp, setSignUp] = useState(false);

    return (
    
    <div className="login-container-sm">
        <form>
            <div className="form-y-layout" id="signUpForm">
                <div className="header">
                    <img src={logo} alt="wfast logo" className="formLogo"/>
                </div>
                <input type="text" placeholder="E-mail ou usuário"/>
                <input type="password" placeholder="Senha"/>
                <input type="submit" value="Entrar"/>
                <button className="form-link" onClick={() => {setSignUp(true)}}>Ainda não tem uma conta?</button>
                <button className="form-link">Esqueci minha senha</button>
            </div>
        </form>
    </div>
    );
}

export default FormFrame;