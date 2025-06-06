import React, { use, useContext, useState } from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
function Sidebar() {
  const [extended, setExtended] = useState(false);
  const {perviousPrompts, onSent, setRecentPrompts,newChat} = useContext(Context);
  const loadPrompt = async (item)=>{
    setRecentPrompts(item);
    await onSent(item);
  }
  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={assets.menu_icon} alt="" />
        <div className="new-chat" onClick={()=> newChat()}>
          <img  src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? 
          <div className="recent">
            <p className="recent-title">Recent</p>
            {perviousPrompts.map((item,index)=>{
              return(
                <div onClick={()=>loadPrompt(item)} className="recent-entry" key={index}>
                <img src={assets.message_icon} alt="" />
                <p >{item.slice(0,18)} ...</p>
              </div>
              )
            })}
            
          </div>
         : null}
      </div>
      <div className="sidebar_bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
             {extended ? <p>Help</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
             {extended ? <p>Activity</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
             {extended ? <p>Settings</p>:null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
