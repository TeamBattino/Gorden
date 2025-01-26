import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { RoomService } from "./services/roomService";
import { UserService } from "./services/userService";
import { MessageService } from "./services/messageService";

class Server {
  private app: express.Application;
  private roomService: RoomService;
  private userService: UserService;
  private messageService: MessageService;

  constructor() {
    this.app = express();
    this.roomService = new RoomService();
    this.userService = new UserService();
    this.messageService = new MessageService();
    this.configureMiddleware();
    this.defineRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    this.app.use(cors());
  }

  private defineRoutes(): void {
    this.app.post("/room", this.asyncHandler(this.createRoomHandler.bind(this)));
    this.app.get("/room", this.asyncHandler(this.getRoomHandler.bind(this)));
    this.app.post("/user", this.asyncHandler(this.createUserHandler.bind(this)));
    this.app.get("/user", this.asyncHandler(this.getUserHandler.bind(this)));
    this.app.post("/message", this.asyncHandler(this.sendMessageHandler.bind(this)));
    this.app.get("/roomUpdates", this.asyncHandler(this.getRoomUpdatesHandler.bind(this)));
    this.app.get("/roomMessages", this.asyncHandler(this.getRoomMessagesHandler.bind(this)));
  }

  private configureErrorHandling(): void {
    this.app.use((err: any, req: Request, res: Response, x: NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ error: "An unexpected error occurred, please try again." });
    });
  }

  private asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
    };
  }

  private async createRoomHandler(req: Request, res: Response): Promise<void> {
    const room = await this.roomService.createRoom();
    res.status(201).json(room);
  }

  private async getRoomHandler(req: Request, res: Response): Promise<void> {
    const room = await this.roomService.getRoom(req.query.id as string);
    res.status(200).json(room);
  }

  private async createUserHandler(req: Request, res: Response): Promise<void> {
    const user = await this.userService.createUser(req.query.name as string);
    res.status(201).json(user);
  }

  private async getUserHandler(req: Request, res: Response): Promise<void> {
    const user = await this.userService.getUser(parseInt(req.query.id as string, 10));
    res.status(200).json(user);
  }

  private async sendMessageHandler(req: Request, res: Response): Promise<void> {
    const message = await this.messageService.sendMessage({
      roomId: req.query.roomId as string,
      authorId: parseInt(req.query.authorId as string, 10),
      message: req.query.message as string,
    });
    res.status(201).json(message);
  }

  private async getRoomUpdatesHandler(req: Request, res: Response): Promise<void> {
    const messages = await this.messageService.getRoomUpdates(
      req.query.roomId as string,
      parseInt(req.query.lastMessageId as string, 10)
    );
    res.status(200).json(messages);
  }

  private async getRoomMessagesHandler(req: Request, res: Response): Promise<void> {
    const messages = await this.messageService.getRoomMessages(req.query.roomId as string);
    res.status(200).json(messages);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

const server = new Server();
server.start(5252);