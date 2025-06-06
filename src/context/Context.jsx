import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();
const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompts, setRecentPrompts] = useState("");
    const [perviousPrompts, setPreviousPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index,nextWord) =>{
      setTimeout(function() {
        setResultData((prev)=> prev + nextWord);
      },75* index);

    }
    const newChat =()=>{
      setLoading(false);
      setShowResult(false);
    }

    const onSent =  async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let res;
        if(prompt !==undefined){

          res = await main(prompt);
          setRecentPrompts(prompt);
        }
        else{
          setPreviousPrompts((prev) => [...prev, input]);
          setRecentPrompts(input);
          res = await main(input);

        }
       let resArray = res.split("**");
       let newRes="";
       for(let i=0; i<resArray.length; i++){
           if(i ===0 || i%2 !== 1){
               newRes += resArray[i];
           }
           else{
               newRes += "<b>" + resArray[i] + "</b>";
           }
       }
       let newRes2 = newRes.split("*").join("</br>")
       let newResArray = newRes2.split(" ");
       for(let i=0; i<newResArray.length; i++){
        const nextWord = newResArray[i];
        delayPara(i,nextWord+" ");
       }
         setLoading(false);
        setInput("");
    }
    const contextValue = {
        perviousPrompts,
        setPreviousPrompts,
        onSent,
        recentPrompts,
        setRecentPrompts,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
}
export default ContextProvider;