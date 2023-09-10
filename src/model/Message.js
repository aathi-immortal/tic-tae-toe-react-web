class Message
{
    constructor()
    {
        this.reciver = null;
        this.messageContent = null;
        this.roomId = null;
        this.sender = null;
    }
    setReciver(name)
    {
        this.reciver = name;
    }
    setMessageContent(message)
    {
        this.messageContent = message;
    }
    setRoomId(roomId)
    {
        this.roomId = roomId;
    }
    setSender(name)
    {
        this.sender = name;
    }
}
export default Message;