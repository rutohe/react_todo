import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [schedule, setSchedule] = useState([])
  const [modalOpen,setModalOpen] = useState(false);
  const [input,setInput] = useState("")

  return (
    <>
      <button
      type='button'
      className='open-btn'
      onClick={()=>setModalOpen(true)}
      >
        create schedule 
      </button>
      {schedule.map((item,index) => {
        return <p key={index}>{item}</p>
      })}
      {modalOpen && 
      <div 
        className='overlay'
        onClick={()=>{setModalOpen(false)}}
      >
        <div
          className="modal"
          onClick={(e) => e.stopPropagation()}//親への伝播ストップ
        >
          <h1>Fill in your schedule</h1>
          <div className='input-wrapper'><input 
          type="text"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          /></div>
          <button
            type='button'
            className='submit-btn'
            onClick={()=>{
              setModalOpen(false)
              setSchedule((schedule)=>[...schedule,input])
              setInput("")}
            }
          >
            add schedule
          </button>
        </div>
      </div>
      }
    </>
  )
}

export default App
