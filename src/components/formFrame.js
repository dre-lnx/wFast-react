import React from "react";

const FormFrame = () => {
    return (
    
    <div class="login-container-sm">
        <form>
            <div class="form-y-layout">
                <input type="text" placeholder="E-mail ou usuário"/>
                <input type="password" placeholder="Senha"/>
                <input type="submit" value="Sign In"/>
            </div>
            <a href="">Ainda não possuo conta</a>
        </form>
    </div>
    );
}

export default FormFrame;