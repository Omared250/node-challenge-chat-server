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

const isValidMessage = (newMessage) => {
  if(newMessage.text && newMessage.from) {
    return true;
  } else {
    return false;
  }
}

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

app.post("/messages", function (request, response) {
  const messageNewId = Math.max(...messages.map((m) => m.id));
  
  const newMessage = {
    id : messageNewId + 1,
    from : request.body.from,
    text : request.body.text,
  }

  if (!isValidMessage(newMessage)) {
    response.status(404).send("Sorry!!, the message is not completed!!");
    return;
  }

  messages.push(newMessage);
  response.status(201).send("The new message have been created!!")
})

app.delete("/messages/:id", function (request, response) {

  const messageId = parseInt(request.params.id);

  const messageFound = messages.find((message) => message.id === messageId);

  if (messageFound) {
    messages.splice(messages.indexOf(messageFound), 1);
    response.status(201).send("The message have been deleted!!!")
  } else {
    response.status(404).send("Sorry!!, This given id does not exist!!!")
  }
})

app.put("/messages/:id", function (request, response) {
  const messageId = parseInt(request.params.id);

  const findingMessage = messages.find((message) => message.id === messageId);

  findingMessage.from = request.body.from;
  findingMessage.text = request.body.text;

  response.status(201).send("Message have been update!!!");
})

app.listen(3000, () => {
   console.log("Listening on port 3000")
});
