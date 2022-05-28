import { useState } from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({ 
    presupuesto, 
    setPresupuesto,
    setIsValidPresupuesto
}) => {

    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault()
        
        //presupuesto no valido
        if(!presupuesto || presupuesto <= 0) {   /* si no hay presupuesto o el presupuesto es menor a cero */
            setMensaje('No es un presupuesto valido')
            return
        }
        setMensaje('')
        setIsValidPresupuesto(true)

        
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form onSubmit={handlePresupuesto} className='formulario'>  {/* onSubmit={handlePresupuesto} --> al presionar submit se ejecuta la funcion */}
            <div className='campo'>
                <label>Definir Presupuesto</label>

                <input
                    type='number' 
                    className='nuevo-presupuesto'
                    placeholder='Añade tu Presupuesto'
                    value={presupuesto}
                    onChange={e => setPresupuesto(Number(e.target.value))} // lee lo que el usuario va escribiendo
                />
            </div>

            <input 
                type='submit' 
                value='Añadir' 
            />
            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>} {/* && (cuando mensaje sea verdadero ejecuta el codigo de la derecha).. es como un ternario pero con una sola condicion */}
        </form>
    </div>
  )
}

export default NuevoPresupuesto


