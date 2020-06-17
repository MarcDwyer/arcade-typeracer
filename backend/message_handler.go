package main

import (
	"encoding/json"
)

type PayloadStructure struct {
	RequestType string `json:"type"`
}

// ReturnPayload is what should be returned based on the RequestType
type ReturnPayload struct {
	PayloadType string   `json:"type"`
	Payload     TextData `json:"payload"`
}

type TextData struct {
	Name string `json:"name"`
	Text string `json:"text"`
	Time int    `json:"time"`
}

const (
	tText = "typingtext"
)

var typingText = []TextData{
	{Name: "tutorial", Text: "Hello, I am Marc, and I am a master gamer. I own noobs in online video games and stuff. Be afraid.", Time: 60},
	{Name: "john_wick", Text: "A fourteen million dollar bounty on his head, and every interested party in the city wants a piece of it, i'd say the odds are about even.", Time: 75},
	{Name: "lao_tzu", Text: "Do the difficult things while they are easy and do the great things while they are small. A journey of a thousand miles must begin with a single step.", Time: 120},
}

func handleMsg(c *Client, msg []byte) {
	var data PayloadStructure
	json.Unmarshal(msg, &data)
	switch data.RequestType {
	case tText:
		randomTxt := randomTxtData(typingText)
		var returnPayload = ReturnPayload{
			PayloadType: tText,
			Payload:     randomTxt,
		}
		d, _ := json.Marshal(returnPayload)
		c.send <- d
	}
}
