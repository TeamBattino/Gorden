import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { MessageSendingService } from "../interfaces";

export class WebSocketService {
  private io: SocketIOServer;
  private messageService: MessageSendingService;

  constructor(httpServer: HttpServer, messageService: MessageSendingService) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: "*", // Adjust this for production to only allow your client origin
        methods: ["GET", "POST"],
      },
    });
    this.messageService = messageService;
    this.initializeWebSocketHandlers();
  }

  private initializeWebSocketHandlers(): void {
    this.io.on("connection", (socket: Socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("joinRoom", (roomId: string) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room: ${roomId}`);
      });

      socket.on(
        "sendMessage",
        async (messagePayload: {
          roomId: string;
          authorId: number;
          message: string;
        }) => {
          try {
            const message = await this.messageService.sendMessage(
              messagePayload
            );
            this.io.to(messagePayload.roomId).emit("newMessage", message);
          } catch (error) {
            console.error("Error sending message via WebSocket:", error);
            socket.emit("messageError", "Failed to send message");
          }
        }
      );

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  public start(): void {
    console.log("WebSocket service started.");
  }
}
