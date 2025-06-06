import React, { useContext } from 'react'
import './main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context';

const Main = () => {
  const { onSent,recentPrompts, setRecentPrompts, showResult, loading, resultData, input, setInput } = useContext(Context);
  const cardClick = (e)=>{
    const prompt = e.target.innerText;
    setRecentPrompts(prompt);
    onSent(prompt);
  }
  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ?<>  <div className="greet">
            <p><span>Hello,Jayant</span></p>
            <p>How can i help you today?</p>
          </div>
          <div className="cards" onClick={(e)=>cardClick(e)}>
            <div className="card">
              <p>Suggest beautiful places to see on an upcoming road trip</p>
              <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card">
              <p>Briefly summarize this concept: urban planning</p>
              <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
              <p>Brainstorm team bonding activities for our work retreat</p>
              <img src={assets.message_icon} alt="" />
            </div>
            <div className="card">
              <p>Improve the readability of the following code</p>
              <img src={assets.code_icon} alt="" />
            </div>
          </div>
          </>: <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompts}</p>

            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? <div className="loader">
                <hr />
                <hr />
                <hr />
              </div> : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>}
            </div>
          </div>
          }
        <div className="main-bottom">
            <div className="search-box">
              <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter prompt here' />
              <div>
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
               {input? <img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
              </div>
            
            </div>
              <p className="bottom-info">
                You can also upload images, audio, and files to get more accurate responses.
              </p>
          </div>
      </div>
    </div>
  )
}

export default Main