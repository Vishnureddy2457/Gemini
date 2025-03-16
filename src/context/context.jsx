import run from "../config/gemini";
import { createContext, useState } from "react";

// const { createContext } = require("react");

export const Context=createContext();

const ContextProvider=(props)=>{

    const[input,setinput]=useState("");
    const[recentPrompt,setrecentPrompt]=useState("");
    const[prevPrompt,setprevPrompt]=useState([]);
    const[showResult,setshowResult]=useState(false);
    const[loading,setloading]=useState(false);
    const[resultData,setresultData]=useState("")

    const delayPara=(index,nextWord,accumulatedText)=>{
        setTimeout(function (){
            setresultData(accumulatedText)
        },75*index)

    }

    const newchat=()=>{
        setloading(false)
        setshowResult(false)

    }

    const onsent=async (prompt) =>{

        setresultData("")
        setloading(true)
        setshowResult(true)
        let response;
        if(prompt !==undefined){
            response=await runchat(prompt);
            setrecentPrompt(prompt)
        }
        else{
            setprevPrompt(prev=>[...prev,input])
            setrecentPrompt(input)
            response=await run(input)

        }
        // setrecentPrompt(input)
        // setprevPrompt(prev=>[...prev,input])
    //    const response = await run(input)

       let responseArray=response.split("**")
       let newResponse ="";
       for(let i=0;i<responseArray.length;i++){
        if(i===0 || i%2 !==1){
            newResponse+=responseArray[i]
        }
        else{
            newResponse+="<b>"+responseArray[i]+"</b>"
        }
       }
       let newResponse2 = newResponse.split("*").join("</br>")

     let newResponseArray=newResponse2.split(" ");
     let accumulatedText=""
     for(let i=0; i<newResponseArray.length;i++){
        // console.log(newResponseArray)
        const nextWord=newResponseArray[i];
        accumulatedText +=nextWord +" "
        delayPara(i,nextWord+" ",accumulatedText)
     }
       setresultData(newResponse2)
       setloading(false)
       setinput("")

    }
    // console.log(resultData)
// onsent("what is the hightest programming lanuage")
    const contextValue = {
        prevPrompt,
        setprevPrompt,
        onsent,
        setrecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setinput,
        newchat



    }
    return(
        <Context.Provider value={contextValue}>
             {props.children}
        </Context.Provider>
    )
}


export default ContextProvider