import { useEffect, useState } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import VentadaModal from './components/VentadaModal'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'



function App() {
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [ventanaModal, setVentanaModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltro, setGastosFiltro] = useState([])

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      setVentanaModal(true)
    
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])  //JSON.stringify (convierne objetos en strings porq en LS solo puedo almacenar strings)
  }, [gastos])

  useEffect(() => {
    if(filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltro(gastosFiltrados)
    }
  }, [filtro])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if(presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])

  const handleNuevoGasto = () => {
    setVentanaModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    if(gasto.id) {
      //editar gasto
      const gastosActualizados = gastos.map(gastoState => 
        gastoState.id === gasto.id ? 
        gasto : gastoState
      )
      setGastos(gastosActualizados)
      setGastoEditar({})
    }
    if(!gasto.id) {
      gasto.id = generarId()
      gasto.fecha = Date.now()  //me retorna la fecha en la que se crea el elemento
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false)     
    setTimeout(() => {
      setVentanaModal(false)
    }, 500);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => 
      gasto.id !== id
    )
    setGastos(gastosActualizados)
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
            <Filtros
              filtro={ filtro }
              setFiltro={ setFiltro }
            />
            <ListadoGastos 
              gastos={ gastos }
              setGastoEditar={ setGastoEditar }
              eliminarGasto={ eliminarGasto }
              filtro={ filtro }
              gastosFiltro={ gastosFiltro }
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
                          gastoEditar = { gastoEditar }
                          setGastoEditar = { setGastoEditar }
                      />}

    </div>
  )
}

export default App
