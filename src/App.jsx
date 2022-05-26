import { useRef, useState } from 'react'
import Header from './components/Header'
import VentadaModal from './components/VentadaModal'
import IconoNuevoGasto from './img/nuevo-gasto.svg'



function App() {
  const [presupuesto, setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [ventanaModal, setVentanaModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const handleNuevoGasto = () => {
    setVentanaModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  return (
    <div>

      <Header
        presupuesto = { presupuesto }
        setPresupuesto = { setPresupuesto }
        isValidPresupuesto = { isValidPresupuesto }
        setIsValidPresupuesto = { setIsValidPresupuesto }
      />

      {isValidPresupuesto && (   /* si el presupuesto es valido se imprime el icono de nuevo gasto */
        <div  className='nuevo-gasto'>
          <img 
            src={IconoNuevoGasto} 
            alt='icono nvo gasto' 
            onClick={handleNuevoGasto}
          />
        </div>
      )}

      {ventanaModal && <VentadaModal 
                          setVentanaModal = { setVentanaModal }
                          setAnimarModal = { setAnimarModal }
                          animarModal = { animarModal }
                      /> }

    </div>
  )
}

export default App
