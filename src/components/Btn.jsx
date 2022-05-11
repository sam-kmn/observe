const Btn = (props) => <button {...props} className={`bg-inherit px-3 py-1 border rounded-lg hover:scale-110 transition duration-300  ${props.className}`}>{props.children}</button>
export default Btn