import { RiCloseCircleFill } from 'react-icons/ri'
import '../index.css'
import { cloneElement, createContext, useContext, useState } from 'react'


export const ModalContext = createContext()


function Modal({ children  }) {
  const [openName , setOpenName] = useState('')

  const close = () => setOpenName('')
  const open = setOpenName;

  return <ModalContext.Provider value={{openName , close , open}}>{children}</ModalContext.Provider>

}

function Open ( { children , opens : opensWindowName } ) {
  const { open } = useContext(ModalContext)


  // This is used to pass events to children who cannot access it (this property is called cloning)
  return cloneElement( children , {onClick: () => open (opensWindowName) })
}


function Window ({children , name }) {

    const { openName , close  } = useContext(ModalContext)

    if ( name !== openName) return null

    return (  
      <div className="containers Overlay">
        <div className="Modal">
            <button 
            className='bg-sky-500 hover:bg-sky-700  rounded-md p-1 text-white text-l m-5 flex justify-center items-center'
            onClick={close}><RiCloseCircleFill/> </button>
            {children}
        </div>
      </div>  
    )
}

Modal.Open = Open
Modal.Window = Window


export default Modal