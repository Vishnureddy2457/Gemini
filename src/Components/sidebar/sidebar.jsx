import React, { useContext, useState } from "react"
import './sidebar.css'
import { assets } from "../../assets/assets"
import { Context } from "../../context/context"


const Sidebar=()=>{

    const[extended,setextended]=useState(false)
    const {onsent,prevPrompt,setrecentPrompt,newchat}=useContext(Context)

    const loadprompt= async(prompt) => {
        setrecentPrompt(prompt)
       await onsent(prompt)
    }
    return(
        <div className="sidebar">
            <div className="top">
                <img  onClick={()=>setextended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
                <div onClick={()=>newchat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended?<p>New chat</p>:null}
                </div>
                {extended
                ?
                <div className="recent">
                    <p className="recent-title">Recent</p>
                    {prevPrompt.map((item,index)=>{
                        return(
                            <div onClick={()=>loadprompt(item)} className="recent-entry">
                            <img src={assets.message_icon} alt="" />
                            <p>{item.slice(0,16)}..</p>
                        </div>

                        )
                    })}
                    {/* <div className="recent-entry">
                        <img src={assets.message_icon} alt="" />
                        <p>What is react</p>
                    </div> */}

                </div>
                :null
}

            </div>
            <div className="bottom" >
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended?<p>HELP</p>:null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended?<p>Activity</p>:null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended?<p>Settings</p>:null}
                </div>

            </div>

        </div>
    )
}
export default Sidebar