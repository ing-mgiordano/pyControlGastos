import CerrarBtn from '../img/cerrar.svg'

const VentadaModal = ({ setVentanaModal }) => {

    const ocultarModal = () => {
        console.log('ocultando...')
        setVentanaModal(false)
    }

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img 
            src={CerrarBtn} 
            alt="cerrar modal"
            onClick={ocultarModal}
        />
      </div>
    </div>
  )
}

export default VentadaModal
