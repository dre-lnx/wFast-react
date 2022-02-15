import React from 'react'

//Inicializa componente de página não encontrada
const PageNotFound = () => {
  return (
    <div className="container">
      <div class="row">
        <div class="col d-flex justify-content-around">
        <div class="alert alert-warning" role="alert">
            Página não encontrada!
        </div>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
