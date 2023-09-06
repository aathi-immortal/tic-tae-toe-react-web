import "./Box.css"

export function Box({value,onClick})
{
    const style = value === "x"?"box x":"box o";
    return(
        <button className={style} onClick={onClick}>{value} </button>
    )
}