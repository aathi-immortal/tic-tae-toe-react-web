
import { useEffect, useState } from "react";
import "./App.css";
import Message from "./model/Message";



import { Board } from "./New-day-1/Board";
import { ScoreBoard } from "./New-day-1/ScoreBoard";
import WebSocketService from "./services/WebScoketService";


function App()
{
    const [board,setBoard] = useState(Array(9).fill(null));
    const [chance,setChance]   = useState('x');
    const [emptyBlock,setEmptyBlock] = useState(9);
    const [score,setScore] = useState({xScore:0,yScore:0});
    const WIN_CONDITIONS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    let socketService = new WebSocketService();
  useEffect(()=>
  {
    socketService.connect();
  },[])    
    const checkWinner = () => {
      
      for (let i = 0; i < WIN_CONDITIONS.length; i++) {
        const [x, y, z] = WIN_CONDITIONS[i];
  
        // Iterate through win conditions and check if either player satisfies them
        if (board[x] && board[x] === board[y] && board[y] === board[z]) {
            // setGameOver(true);
          
          return board[x];
        }
        
      }
      if(emptyBlock == 0)
      {
        return 0;
      }
      return null;
      
      
    } 
    
    

    function isGameOver()
    {
        
      let status = checkWinner();
      let xScore = score.xScore;
      let yScore = score.yScore;
      if(status == "x")
      {
        
        status = "winner is :" + status;
        xScore += 1;
      }
      else if(status == "o")
      {
        
        status = "winner is:" + status;
        yScore += 1;
      }
      else if(status == 0)
      {
        status = "draw";
      }

      if(status != null)
      {
        setTimeout(()=>
        {
          setScore({xScore:xScore,yScore:yScore});
          alert(status + xScore + "  " + yScore);
          resetBoard();  
        },10)
        
      } 
    function resetBoard()
    {
        setBoard(Array(9).fill(null));    
        setEmptyBlock(9);
    }

    }

    
    function swapChance()
    {
      setChance(chance == "x" ? "o" :"x")
    }
    function sendUpdateBoard()
    {
      let message = new Message();
            message.setRoomId(123);
            message.setMessageContent(board);
            socketService.sendMessage(message);
    }
    function handleButtonClick(butonIndex)
    {
      
      let newBoard = board.map((value,index)=>
      {
          // return value = (index == butonIndex && value == null) ? chance:value;
          if(index == butonIndex && value == null)
          {
            
            setEmptyBlock(emptyBlock - 1);
            return chance;
          }
          return value;
      });
      setBoard(newBoard);
      
    }
    document.addEventListener("newBoard",(event)=>
    {
      console.log(event.message);
    })
    useEffect(()=>
    { 
      
       
        sendUpdateBoard()
      swapChance();
      
      console.log(emptyBlock);
      isGameOver();
    },[board]);
  return (
    <div className="first-page-body">
      <div className="board-block">
          
            <ScoreBoard score={score} chance={chance}/>
            <Board board ={board} onClick={handleButtonClick}/>
      </div>
        
    </div>

  );
}

export default App;


