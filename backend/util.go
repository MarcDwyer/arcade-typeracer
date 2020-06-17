package main

import (
	"math/rand"
	"time"
)

func randomTxtData(td []TextData) TextData {
	rand.Seed(time.Now().Unix())
	return td[rand.Intn(len(td))]
}
