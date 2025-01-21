import express from "express";
import { createRoom, getRoom } from "./room";
import { createUser, getUser } from "./user";
import { getRoomMessages, getRoomUpdates, sendMessage } from "./message";
import cors from "cors";

const app = express();

app.use(cors());

app.post("/room", async (req, res) => {
  try {
    const room = await createRoom();
    res.status(201).json(room);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create room, please try again." + error });
  }
});

app.get("/room", async (req, res) => {
  try {
    const room = await getRoom(req.query.id as string);
    res.status(200).json(room);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get room, please try again." + error });
  }
});

app.post("/user", async (req, res) => {
  try {
    const user = await createUser(req.query.name as string);
    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create user, please try again." + error });
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await getUser(parseInt(req.query.id as string, 10));
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get user, please try again." + error });
  }
});

app.post("/message", async (req, res) => {
  try {
    const message = await sendMessage({
      roomId: req.query.roomId as string,
      authorId: parseInt(req.query.authorId as string, 10),
      message: req.query.message as string,
    });
    res.status(201).json(message);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send message, please try again." + error });
  }
});

app.get("/roomUpdates", async (req, res) => {
  try {
    const messages = await getRoomUpdates(
      req.query.roomId as string,
      parseInt(req.query.lastMessageId as string, 10)
    );
    res.status(200).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get room updates, please try again." + error });
  }
});

app.get("/roomMessages", async (req, res) => {
  try {
    const messages = await getRoomMessages(req.query.roomId as string);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      error: "Failed to get room messages, please try again." + error,
    });
  }
});

app.listen(5252, () => {
  console.log("Server is running on port 5252");
});
