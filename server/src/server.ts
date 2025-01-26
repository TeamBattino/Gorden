import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import http from "http";
import { RoomService } from "./services/roomService";
import { UserService } from "./services/userService";
import { MessageService } from "./services/messageService";
import { Creatable, Readable, MessageSendingService } from "./interfaces";
import { WebSocketService } from "./services/webSocketService";

class Server {
  private app: express.Application;
  private httpServer: http.Server;
  private roomService: Creatable & Readable<any, string>;
  private userService: Creatable & Readable<any, number>;
  private messageService: MessageSendingService & Readable<any, string>;
  private webSocketService: WebSocketService;

  constructor(
    roomService: Creatable & Readable<any, string>,
    userService: Creatable & Readable<any, number>,
    messageService: MessageSendingService & Readable<any, string>
  ) {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.roomService = roomService;
    this.userService = userService;
    this.messageService = messageService;
    this.webSocketService = new WebSocketService(
      this.httpServer,
      messageService
    );
    this.configureMiddleware();
    this.defineRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private defineRoutes(): void {
    this.app.post(
      "/rooms",
      this.asyncHandler(this.handleCreateRoom.bind(this))
    );
    this.app.get("/rooms", this.asyncHandler(this.handleGetRoom.bind(this)));
    this.app.post(
      "/users",
      this.asyncHandler(this.handleCreateUser.bind(this))
    );
    this.app.get("/users", this.asyncHandler(this.handleGetUser.bind(this)));
    this.app.post(
      "/messages",
      this.asyncHandler(this.handleSendMessage.bind(this))
    );
    this.app.get(
      "/room-updates",
      this.asyncHandler(this.handleGetRoomUpdates.bind(this))
    );
    this.app.get(
      "/room-messages",
      this.asyncHandler(this.handleGetRoomMessages.bind(this))
    );
  }

  private configureErrorHandling(): void {
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        console.error("Server error:", err.stack);
        res
          .status(500)
          .json({ error: "An unexpected error occurred, please try again." });
      }
    );
  }

  private asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
    };
  }

  private async handleCreateRoom(req: Request, res: Response): Promise<void> {
    await this.roomService.create().then((room) => res.status(201).json(room));
  }

  private async handleGetRoom(req: Request, res: Response): Promise<void> {
    const roomId = req.query.id as string;
    const room = await this.roomService.getById(roomId);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }
    res.status(200).json(room);
  }

  private async handleCreateUser(req: Request, res: Response): Promise<void> {
    const name = req.body.name;
    if (!name) {
      res.status(400).json({ message: "Name is required" });
      return;
    }
    const user = await this.userService.create(name);
    res.status(201).json(user);
  }

  private async handleGetUser(req: Request, res: Response): Promise<void> {
    const userId = Number(req.query.id);
    const user = await this.userService.getById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  }

  private async handleSendMessage(req: Request, res: Response): Promise<void> {
    const { roomId, authorId, message: messageText } = req.body;

    if (!roomId || !authorId || !messageText) {
      res
        .status(400)
        .json({ message: "Room ID, Author ID, and message are required" });
      return;
    }

    const message = await this.messageService.sendMessage({
      roomId,
      authorId: Number(authorId),
      message: messageText,
    });
    res.status(201).json(message);
  }

  private async handleGetRoomUpdates(
    req: Request,
    res: Response
  ): Promise<void> {
    const { roomId, lastMessageId } = req.query;
    const messages = await this.messageService.getRoomUpdates(
      roomId as string,
      Number(lastMessageId)
    );
    res.status(200).json(messages);
  }

  private async handleGetRoomMessages(
    req: Request,
    res: Response
  ): Promise<void> {
    const roomId = req.query.roomId as string;
    const messages = await this.messageService.getRoomMessages(roomId);
    res.status(200).json(messages);
  }

  public start(port: number): void {
    this.httpServer.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      this.webSocketService.start();
    });
  }
}

const roomService = new RoomService();
const userService = new UserService();
const messageService = new MessageService();

const server = new Server(roomService, userService, messageService);
server.start(5252);
