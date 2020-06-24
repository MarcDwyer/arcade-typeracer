import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import { PayloadTypes } from "./enums.ts";
import { textData } from "./typing_data.ts"

type Data = {
    type: string;
    payload: any;
}
export default async function WsHandler(ws: WebSocket, msg: string) {
    const data: Data = JSON.parse(msg)

    switch(data.type) {
        case PayloadTypes.singleTypingText:
            const randomTxt = textData[Math.floor(Math.random() * textData.length)]
           await ws.send(JSON.stringify({type: PayloadTypes.singleTypingText, payload: randomTxt}))
           break;
        case PayloadTypes.joinRoom:
            
        default:
            console.log("No case found for " + data.type)
        }
}