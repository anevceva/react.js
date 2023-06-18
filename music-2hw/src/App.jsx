import { useState } from 'react'
import SongContainer from './components/SongContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SongContainer/>
    </>
  )
}

export default App
