// {}はreturnいるらしい　癖でつけがちだから忘れずやること
import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const now = new Date()
  const dateObj = {
    year:now.getFullYear(),
    month:now.getMonth() + 1,
    day:now.getDate(),
    hour:now.getHours(),
    minute:now.getMinutes()
  }
  const [modalOpen,setModalOpen] = useState(false)
  const [input,setInput] = useState("")
  const [isEdit,setIsEdit] = useState({editing:false,row:-1})
  const [deadline,setDeadline] = useState(dateObj)
  const [isLine,setIsLine] = useState(true)



  const [schedule,setSchedule] = useState(()=>{
    const savedSchedule = localStorage.getItem('schedule')
    return (savedSchedule) ? JSON.parse(savedSchedule) : [{text:"",checked:false,deadline:{year:now.getFullYear(),month:1,day:1,hour:0,minute:0},isDeadLine:true}]
  })
  useEffect(() => {
    localStorage.setItem(
      'schedule',
      JSON.stringify(schedule)
    )
    console.log(localStorage);
    
  }, [schedule])
  const modalInit = () => {
    setInput("")
    setIsEdit({editing:false,row:-1})
    setDeadline(dateObj)
    setIsLine(true)
  }
  const inputEnter = () => {
    if (!input.trim()) return
      setModalOpen(false)
      if(isEdit.editing){
        setSchedule((schedule)=>
          schedule.map((item,index)=>{
            return index === isEdit.row ? {text:input,checked:item.checked,deadline:deadline,isDeadLine:isLine} : item
          })
        )
      }
      else{
        setSchedule((schedule)=>[...schedule,{text:input,checked:false,deadline:deadline,isDeadLine:isLine}])
      }
      modalInit();
    }
  return (
    <>
      <button
      type='button'
      className='open-btn'
      onClick={()=>{
        setModalOpen(true)
        modalInit()
      }}
      >
        create schedule 
      </button>
      <div className='schedule-wrapper'>
      {schedule.map((item,index) => {
        return <div key={index} className={item.checked ? 'row done' :'row'}>
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
          <p className='schedule-name'>{item.text}</p>
          <button 
            type='button'
            className='edit-btn'
            onClick={()=>{
              setModalOpen(true)
              setIsEdit({editing:true,row:index})
              setInput(item.text)
              setDeadline(item.deadline)
              setIsLine(item.isDeadLine)
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
          <p className='deadline'>{(item.isDeadLine) ? `${item.deadline.year}年${item.deadline.month}月${item.deadline.day}日${item.deadline.hour}時${item.deadline.minute}分まで` : '期限なし'}</p>
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
          <div className={(!isLine) ? 'date-wrapper no-deadline' : 'date-wrapper'}>
            <input
              type="checkbox"
              checked={isLine}
              onChange={()=>{
                setIsLine(!isLine)
              }}
            />
            <input 
              type="number"
              min={now.getFullYear()}
              max={now.getFullYear() + 10}
              value={deadline.year}
              disabled={!isLine ? true : false}
              onChange={(e)=>{
                return setDeadline({...deadline,year:Number(e.target.value)})
              }}
            />
            年
            <input
              type='number'
              min="1"
              max="12"
              value={deadline.month}
              disabled={!isLine ? true : false}
              onChange={(e)=>{
                return setDeadline({...deadline,month:Number(e.target.value)})
              }}
            />
            月
            <input
              type='number'
              min="1"
              max="31"
              value={deadline.day}
              disabled={!isLine ? true : false}
              onChange={(e)=>{
                return setDeadline({...deadline,day:Number(e.target.value)})
              }}
            />
            日
            <input
              type='number'
              min="0"
              max="23"
              value={deadline.hour}
              disabled={!isLine ? true : false}
              onChange={(e)=>{
                return setDeadline({...deadline,hour:Number(e.target.value)})
              }}
            /> 
            時
            <input
              type='number'
              min="0"
              max="59"
              value={deadline.minute}
              disabled={!isLine ? true : false}
              onChange={(e)=>{
                return setDeadline({...deadline,minute:Number(e.target.value)})
              }}
            />
          </div>
          <div className='input-wrapper'>
            <input 
              type="text"
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              onKeyUp={(e)=>{
                if(e.key == 'Enter'){
                  inputEnter()
                }
              }}
            />
          </div>
          <button
            type='button'
            className='submit-btn'
            onClick={()=>{
              inputEnter();
            }}
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
