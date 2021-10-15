const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.status(201).send(messages);
})

app.get("/messages/:id", function (request, response) {
  const messageId = parseInt(request.params.id);
  const filteredMessagesById = messages.find((message) => message.id === messageId);
  if (filteredMessagesById) {
    response.status(200).send(filteredMessagesById);
  } else {
    response.status(404).send("Sorry! we cannot find this given id!!");
  }
} )

app.listen(3000, () => {
   console.log("Listening on port 3000")
});
