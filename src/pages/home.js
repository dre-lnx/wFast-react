import React from 'react'

import logo from '../assets/logo.svg'

const Home = () => {
  return (
    <div className="container">
      <div class="row">
        <div class="col home-logo">
          <img src={logo} alt="logo wfast" />
        </div>
        <div class="col">
          <h1>Bem Vindo à wFast</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id
            dui nec felis fermentum bibendum eu ac dui. Donec et venenatis est.
            Curabitur blandit, elit ac dapibus rhoncus, metus justo consequat
            tellus, semper aliquam nisl ex sit amet eros. Nulla facilisi.
            Suspendisse in dapibus sapien, sit amet ullamcorper est. Quisque
            bibendum ex cursus, euismod tortor a, blandit velit. Phasellus vitae
            ornare turpis. Mauris ultrices libero sit amet velit ullamcorper
            imperdiet. Ut tincidunt metus vel orci auctor, a sagittis libero
            tincidunt. Phasellus scelerisque accumsan tellus ac tempor. Vivamus
            sit amet justo et est feugiat laoreet. Etiam tincidunt varius justo,
            et condimentum est egestas et. Etiam ullamcorper ante vel urna
            placerat, sit amet iaculis urna tempus. Donec congue, lorem ac
            laoreet suscipit, lectus lorem blandit sapien, et consequat turpis
            ligula at risus. Aliquam id leo eget elit maximus luctus. In gravida
            orci eget quam hendrerit interdum.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
