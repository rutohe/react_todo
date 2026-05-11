// {}はreturnいるらしい　癖でつけがちだから忘れずやること
import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [modalOpen,setModalOpen] = useState(false)
  const [input,setInput] = useState("")
  const [isEdit,setIsEdit] = useState({editing:false,row:-1})


  const [schedule,setSchedule] = useState(()=>{
    const savedSchedule = localStorage.getItem('schedule')
    return (savedSchedule) ? JSON.parse(savedSchedule) : []
  })
  useEffect(() => {
    localStorage.setItem(
      'schedule',
      JSON.stringify(schedule)
    )
    console.log(localStorage);
    
  }, [schedule])
  return (
    <>
      <button
      type='button'
      className='open-btn'
      onClick={()=>{
        setInput("")
        setIsEdit({editing:false,row:-1})
        setModalOpen(true)
      }}
      >
        create schedule 
      </button>
      <div className='schedule-wrapper'>
      {schedule.map((item,index) => {
        return <div key={index} className={item.checked ? 'row done' :'row'}>
          <p>{item.text}</p>
          <input 
            type="checkbox"
            checked={item.checked}
            onChange={()=>{
              setSchedule((schedule)=>{
                return schedule.map((scheduleItem,idx)=>{
                  return index === idx
                  ? {...scheduleItem,checked: !scheduleItem.checked}
                  :scheduleItem
                })
              })
            }}  
          />
          <button 
            type='button'
            className='edit-btn'
            onClick={()=>{
              setModalOpen(true)
              setIsEdit({editing:true,row:index})
              setInput(item.text)
            }}
          >
            edit schedule
          </button>
          <button
            type='button'
            className='delete-btn'
            onClick={()=>{
              setSchedule((schedule)=>{
                return schedule.filter((item,idx)=>{
                  return index !== idx
                })
              })
            }}
          >
            delete schedule
          </button>
        </div>
      })}
      </div>
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
              if (!input.trim()) return
              setModalOpen(false)
              if(isEdit.editing){
                setSchedule((schedule)=>
                  schedule.map((item,index)=>{
                    return index === isEdit.row ? {text:input,checked:item.checked} : item
                  })
                )
              }
              else{
                setSchedule((schedule)=>[...schedule,{text:input,checked:false}])
              }
              setInput("")
              setIsEdit({editing:false,row:-1})
            }
            }
          >
            {isEdit.editing ? 'edit schedule' : 'add schedule'}
          </button>
        </div>
      </div>
      }
    </>
  )
}

export default App
