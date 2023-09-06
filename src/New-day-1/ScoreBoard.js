import "./scoreBoard.css";
export function ScoreBoard({score,chance})
{
    return(
        <div className="score-bar">
            <span className={`score xScore ${chance =="x" ?"":"inactive" }`}>x - {score.xScore}</span>
            <span className={`score  yScore ${chance =="o" ?"":"inactive" }`}>o - {score.yScore}</span>
        </div>
    )
}