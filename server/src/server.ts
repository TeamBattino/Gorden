import express from "express";
import { createRoom, getRoom } from "./room";
import { createUser, getUser } from "./user";

const app = express();

app.post("/room", async (req, res) => {
    try {
        const room = await createRoom();
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ error: "Failed to create room, please try again." + error });
    }
});

app.get("/room", async (req, res) => {
    try {
        const room = await getRoom(req.query.id as string);
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ error: "Failed to get room, please try again." + error });
    }
});

app.post("/user", async (req, res) => {
    try {
        const user = await createUser(req.query.name as string);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user, please try again." + error });
    }
});

app.get("/user", async (req, res) => {
    try {
        const user = await getUser(req.query.id as unknown as number);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to get user, please try again." + error });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});