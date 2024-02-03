"use client";
import { connected } from "process";
import {useSocket} from "./provider";
import {use, useEffect, useMemo, useRef, useState} from "react";
import Link from "next/link";
import Chat from "../_components/chat";


export default function Home() {
    const { socket, isConnected } = useSocket();
    // const inputRef = useRef<HTMLInputElement>(null);

    const [message , setMessage] = useState<{
        from: string;
        content: string;
        time:number;
    }[]>([]);

    useEffect(() => {
        if (isConnected) {
            socket?.on("message", (message: {
                from: string;
                content: string;
                time: number;
            }) => {
                setMessage((prev)=>{
                    return [...prev, message]
                });
            });

            socket?.emit("history")
        }else {
            socket?.off("message")
        }
    }, [isConnected])
    
    return (
        <div>
            <Chat info={{message, socket, isConnected}}/>
            {/* <Link href={"/"}>Go to Home</Link>
            <h1>Socket Status: {isConnected ? "Connected" : "Disconnected"}</h1>
            <h2>Messages: {data?.user.name}</h2>
            <input type="text" name="one" onKeyDown={(event)=>{
                if (event.key === "Enter") {
                    console.log(inputRef);
                    socket.emit("message", {
                        from: data?.user.name || "Anonymous",
                        content: inputRef.current?.value || ""
                    });
                }
            }} ref={inputRef}/>

            <button onClick={() => {
                console.log(inputRef);
                
                socket.emit("message", {
                from: sezioni?.user.name || "Anonymous",
                content: inputRef.current?.value || ""
            })}}>
                Send Test Message
            </button>
            <ul>
                {message.reverse().map((msg, i) => (
                    <li key={i}>{msg.from}: {msg.content}</li>
                ))}
            </ul> */}
        </div>
    );
}