FROM golang

WORKDIR /go/src/github.com/dkt64/heroes-static
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

CMD ["heroes-static", "-p=80"]

EXPOSE 80
