import React, { useContext } from "react"
import './main.css'
import { assets } from "../../assets/assets"
import { Context } from "../../context/context"
// import onKeyPress from 
const Main=()=>{

    const{onsent,recentPrompt,showResult,loading,resultData,setinput,input} =useContext(Context)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onsent();
        }
    }
    return(
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>    
            <div className="main-contain">

                {!showResult
                ?<>
                <div className="greet">
                  <p><span>Hello, Dev</span></p>  
                  <p>How can I help you Today?</p>
                </div>
                <div className="div cards">
                    <div className="card">
                        <p>sugget beautiful places to see an upcoming road trip</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Briefly summarize this concept</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div> <div className="card">
                        <p>Brainstrom team bonding actovities for our work retreat</p>
                        <img src={assets.message_icon} alt="" />
                    </div> <div className="card">
                        <p>Improve the readabality  of the following</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
                </>
                :<div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result_data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading?<div className="loader">
                            <hr /><hr /><hr />
                            </div>:<p dangerouslySetInnerHTML={{__html:resultData}}></p>}
    
                    </div>
                    
                </div>
}
                
                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e)=>setinput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here" onKeyDown={handleKeyDown}/>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        <img onClick={()=>onsent()}src={assets.send_icon}alt="" />
                    </div>
                    <p className="bottom-info">
                    Gemini may display inaccurate info,including about the people,so double-check its responses.Your privacy and Gemini Apps </p>
                </div>
               
            </div>

        </div>
    )
}
export default Main