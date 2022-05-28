import { useRef, useState } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import VentadaModal from './components/VentadaModal'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'



function App() {
  const [gastos, setGastos] = useState([])
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

  const guardarGasto = gasto => {
    gasto.id = generarId()
    gasto.fecha = Date.now()  //me retorna la fecha en la que se crea el elemento
    setGastos([...gastos, gasto])

    setAnimarModal(false)  
        
    setTimeout(() => {
      setVentanaModal(false)
    }, 500);
  }

  return (
    <div className={ventanaModal ? 'fijar' : ''}> 

      <Header
        gastos = { gastos }
        presupuesto = { presupuesto }
        setPresupuesto = { setPresupuesto }
        isValidPresupuesto = { isValidPresupuesto }
        setIsValidPresupuesto = { setIsValidPresupuesto }
      />

      {isValidPresupuesto && (   /* si el presupuesto es valido se imprime el icono de nuevo gasto */
        <>
          <main>
            <ListadoGastos 
              gastos={gastos}
            />
          </main>
          <div  className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto} 
              alt='icono nvo gasto' 
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {ventanaModal && <VentadaModal 
                          setVentanaModal = { setVentanaModal }
                          setAnimarModal = { setAnimarModal }
                          animarModal = { animarModal }
                          guardarGasto = { guardarGasto }
                      />}

    </div>
  )
}

export default App
