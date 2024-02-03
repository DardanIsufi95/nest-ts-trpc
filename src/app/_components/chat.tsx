'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";

const Chat = ({info}: {info: any}) => {

const inputRef = useRef<HTMLInputElement>(null);
const {data} = useSession();

return (
        <div>
        <Link href={"/"}>Go to Home</Link>
        <h1>Socket Status: {info.isConnected ? "Connected" : "Disconnected"}</h1>
        {/* <h2>Messages: {data?.user.name}</h2> */}
        <input type="text" name="one" onKeyDown={(event)=>{
            if (event.key === "Enter") {
                console.log(inputRef);
                info.socket.emit("message", {
                    // from: data?.user.name || "Anonymous",
                    from : "test",
                    content: inputRef.current?.value || ""
                });
            }
        }} ref={inputRef}/>

        <button onClick={() => {
            console.log(inputRef);
            
            info.socket.emit("message", {
            from: info.socket?.user.name || "Anonymous",
            content: inputRef.current?.value || ""
        })}}>
            Send Test Message
        </button>
        <ul>
            {info.message.reverse().map((msg: any, i: any) => (
                <li key={i}>{msg.from}: {msg.content}</li>
            ))}
        </ul>
    </div>
    );
}

export default Chat;