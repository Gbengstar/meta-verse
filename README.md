## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ sudo docker compose up --build

```

## Api Documentation

<a href="https://documenter.getpostman.com/view/33875381/2sA3QqfYGc" target="_blank">Click here to open this project Postman documentation</a>

## Web socket

Websocket connection can be established through http://localhost:3000

Real time socket events can be the app include:

1. ALL_EVENT
2. ZERO_TO_HUNDRED_DOLLAR_EVENT
3. ONE_HUNDRED_TO_FIVE_HUNDRED_DOLLAR_EVENT
4. FIVE_HUNDRED_TO_TWO_THOUSAND_DOLLAR_EVENT
5. TWO_THOUSAND_TO_FIVE_THOUSAND_DOLLAR_EVENT
6. FIVE_THOUSAND_AND_ABOVE_DOLLAR_EVENT

Users automatically join the following rooms once socket connection is established:

1. ALL_ROOM
2. SENDER_AND_RECEIVER_ROOM
3. SENDER_ONLY_ROOM
4. RECEIVER_ONLY_ROOM
5. ZERO_TO_HUNDRED_DOLLAR_ROOM
6. ONE_HUNDRED_TO_FIVE_HUNDRED_DOLLAR_ROOM
7. FIVE_HUNDRED_TO_TWO_THOUSAND_DOLLAR_ROOM
8. TWO_THOUSAND_TO_FIVE_THOUSAND_DOLLAR_ROOM
9. FIVE_THOUSAND_AND_ABOVE_DOLLAR_ROOM
