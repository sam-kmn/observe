
const Modal = ({children}) => {

  return (
    <div className="h-full w-full bg-opacity-70 bg-stone-900 fixed top-0 left-0 flex flex-row justify-center items-center">
      {children}
    </div>
  )
}

export default Modal