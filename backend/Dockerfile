FROM golang:latest

WORKDIR $GOPATH/src/github.com/MarcDwyer/backend

COPY . .

RUN go get -d -v ./...

RUN go install -v ./...

EXPOSE 1867

CMD ["backend"]