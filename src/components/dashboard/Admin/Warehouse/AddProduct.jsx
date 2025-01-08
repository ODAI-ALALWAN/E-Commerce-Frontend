import Modal from "../../../../ui/Model"
import CreateProduct from "./CreateProduct"

export default function AddProduct() {
  return (
    <>
    <Modal>
        <Modal.Open  opens='CreateProduct' >
          <button 
          className='bg-sky-500 hover:bg-sky-700 m-3 rounded-md p-2 text-white text-l mt-10 md:mt-4 flex gap-2 justify-center items-center'
          >
            <span>Create Product</span> 
         </button>
        </Modal.Open>
          <Modal.Window name='CreateProduct'>
            <CreateProduct/>
          </Modal.Window>
    </Modal>
    </>
  )
}
