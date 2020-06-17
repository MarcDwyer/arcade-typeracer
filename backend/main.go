package main

import (
	"log"
	"net/http"
)

type textData struct {
	name string
	text string
}

var typingText = []textData{
	{name: "tutorial", text: "Hello, I am Marc, and I am a master gamer. I own noobs in online video games and stuff. Be afraid."},
	{name: "john_wick", text: "A fourteen million dollar bounty on his head, and every interested party in the city wants a piece of it, i'd say the odds are about even."},
}

func main() {
	hub := newHub()

	http.HandleFunc("/ws/", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w, r)
	})

	log.Fatal(http.ListenAndServe(":1337", nil))
}
