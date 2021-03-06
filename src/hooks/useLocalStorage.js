import { useState, useEffect } from "react"


const useLocalStorage = (key, defaultValue) => {

  const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) || defaultValue)

  const saveValue = (newData) => {
    localStorage.setItem(key, JSON.stringify(newData))
    window.dispatchEvent(new Event("storage." + key));
  }

  useEffect(() => {
    window.addEventListener('storage.' + key, () => {
      setValue(JSON.parse(localStorage.getItem(key)) || defaultValue)   
    })
  }, [key, defaultValue])

  return [value, saveValue]
}


export default useLocalStorage



// const getLocalStorage = (key, defaultValue = '') => {
//   const stored = localStorage.getItem(key)
//   const value = JSON.parse(stored)
//   return value || defaultValue
// }