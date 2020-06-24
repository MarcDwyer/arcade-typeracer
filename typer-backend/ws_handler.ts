import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import { PayloadTypes } from "./case_types.ts";
import { textData } from "./typing_data.ts"

type Data = {
    type: string;
    payload: any;
}
export default async function wsHandler(ws: WebSocket, msg: string) {
    const data: Data = JSON.parse(msg)

    switch(data.type) {
        case PayloadTypes.typing_text:
            const randomTxt = textData[Math.floor(Math.random() * textData.length)]
            console.log(randomTxt)
           await ws.send(JSON.stringify({type: PayloadTypes.typing_text, payload: randomTxt}))
           break;
        default:
            console.log("No case found for " + data.type)
        }
}