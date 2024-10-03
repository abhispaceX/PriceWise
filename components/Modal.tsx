'use client'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FormEvent, useState } from 'react'
import Image from 'next/image'
import { addEmailAdress } from '@/lib/actions'

interface Prop{
  productId:string
}
const Modal = ({productId}:Prop) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting,setIsSubmitting]=useState(false)
    const [Email,setEmail]=useState('')

    const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setIsSubmitting(true)

        setEmail('')
        await addEmailAdress(productId,Email)

        setIsSubmitting(false)
        setIsOpen(false)
       

    }
    const handleOpen=()=>{
        setIsOpen(true)
    }
    const close=()=>{
        setIsOpen(false)
    }
  return (
    <>
     <button type='button' className='btn' onClick={handleOpen} >
        Track
        </button> 

        <Dialog open={isOpen} as="div" className="dialog-container" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="dialog-content"
            >
             
              <div className="">
        
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="p-3 border rounded-10">
                      <Image 
                        src="/assets/icons/logo.svg"
                        alt="logo"
                        width={28}
                        height={28}
                      />
                    </div>

                    <Image 
                      src="/assets/icons/x-close.svg"
                      alt="close"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={close}
                    />
                  </div>

                  <h4 className="dialog-head_text">
                    Stay updated with product pricing alerts right in your inbox!
                  </h4>

                  <p className="text-sm text-gray-600 mt-2">
                    Never miss a bargain again with our timely alerts!
                  </p>
                  <div className="mt-4">
                    <form className='flex flex-col mt-5' onSubmit={handleSubmit} >
                      <label htmlFor='email'  className='text-sm  font-medium text-gray-700' >
                          Email Address
                      </label>
                      <div className='dialog-input_container' >
                        <Image
                          src="/assets/icons/mail.svg"
                          alt="mail"
                          width={18}
                          height={18}
                        
                        />
                        <input
                        type="email"
                        required
                        id="email"
                        placeholder="Enter your email address"
                        className="dialog-input"
                        value={Email}
                        onChange={(e)=>setEmail(e.target.value)}

                    />

                      </div>
                      <button type='submit'
                        className="dialog-btn"  
                         >
                      {isSubmitting? 'Submitting..':'Track'}
                     </button>
                      
                    </form>
               
              </div>
                </div>
              </div>
             
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default Modal
