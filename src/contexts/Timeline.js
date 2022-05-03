import { createContext, useContext, useState } from "react";

const TimelineContext = createContext()


export const TimelineProvider = ({children}) => {

  const [timeline, setTimeline] = useState('all')

  return (
    <TimelineContext.Provider value={[timeline, setTimeline]} >
      {children}
    </TimelineContext.Provider>
  )
}


export const useTimeline = () => {
  const context = useContext(TimelineContext)
  if (context === undefined) throw Error("Context must be used inside of Provider.")
  return context
}
