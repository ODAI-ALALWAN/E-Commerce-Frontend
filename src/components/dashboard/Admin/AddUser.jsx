
import {  FaUserPlus } from 'react-icons/fa'
import Modal from "../../../ui/Model"
import CreateUserForm from "./CreateUserForm"


export default function AddUser() {
   

  return (
    <div>
          <Modal>
          <Modal.Open  opens='CreateUser' >
          
          <button 
          className='bg-sky-500 hover:bg-sky-700 m-3  rounded-md p-2 text-white text-l mt-10 md:mt-4 flex gap-2 justify-center items-center'
          >
            <span>Create User</span> <FaUserPlus/>
         </button>
          </Modal.Open>
          <Modal.Window name='CreateUser'>
            <CreateUserForm/>
          </Modal.Window>
          </Modal>

    </div>
  )
}
