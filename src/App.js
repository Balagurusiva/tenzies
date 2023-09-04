import React from "react"
import Die from "./components/die.js"
import {nanoid} from "nanoid"
import Confitte from "react-confetti"

export default function App(){

    const [dice, setDice] = React.useState(allNEwDice())
    const [tenzies, setTenzies]= React.useState(false)

    React.useEffect(()=>{

        //every() function just return true or false it return true if the given condition is true in the function
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if(allHeld && allSameValue){
            setTenzies(true)
            console.log("u won")
        }
    },[dice])

    function generateNEwDie(){
        return {
            value: Math.ceil(Math.random()*6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNEwDice(){
        const newDice = []
        for(let i =0; i<10; i++){
            newDice.push(generateNEwDie())
        }
        return newDice
    }

    function rollDice(){

        if(!tenzies){
            setDice(oldDice =>oldDice.map(die=>{
                return die.isHeld?
                        die:
                        generateNEwDie()
            }))
        }else{
            setTenzies(false)
            setDice(allNEwDice())
        }
        
    }

    function holdDie(id){
        setDice(oldDice =>oldDice.map(die=>{
            return die.id===id?
                      {...die,isHeld:!die.isHeld}:
                      die
        }))
    }

    const diceElement = dice.map(die => 
        
       <Die 
         key={die.id} 
         value= {die.value}
         isHeld= {die.isHeld} 
         holdDie= {() => holdDie(die.id)}
        />)
 
 

    return(
        <main>
        {tenzies && <Confitte />}
         <h1 className="title">Tenzies</h1>
         <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
         <div className="dice-container">
             {diceElement}
          </div>
          <button 
            className="roll-dice" 
            onClick={rollDice}
            >
            {tenzies?"New Game":"Roll"}
          </button>
        </main>
    )
 }