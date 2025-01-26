# Gorden Server

## How to Run

1. **Install Dependencies**:
    ```bash
    npm install
    ```

2. **Start the Server**:
    ```bash
    npm start
    ```

3. **Server will run on port 5252**:
    ```bash
    http://localhost:5252
    ```

## Available Endpoints

### Rooms

- **Create Room**
    - **URL**: `/rooms`
    - **Method**: `POST`
    - **Response**: `201 Created`
    - **Description**: Creates a new room.

- **Get Room**
    - **URL**: `/rooms?id={roomId}`
    - **Method**: `GET`
    - **Response**: `200 OK`
    - **Description**: Retrieves a room by its ID.

### Users

- **Create User**
    - **URL**: `/users`
    - **Method**: `POST`
    - **Body**: `{ "name": "User Name" }`
    - **Response**: `201 Created`
    - **Description**: Creates a new user.

- **Get User**
    - **URL**: `/users?id={userId}`
    - **Method**: `GET`
    - **Response**: `200 OK`
    - **Description**: Retrieves a user by their ID.

### Messages

- **Send Message**
    - **URL**: `/messages`
    - **Method**: `POST`
    - **Body**: `{ "roomId": "roomId", "authorId": 1, "message": "Hello World" }`
    - **Response**: `201 Created`
    - **Description**: Sends a message to a room.

- **Get Room Messages**
    - **URL**: `/room-messages?roomId={roomId}`
    - **Method**: `GET`
    - **Response**: `200 OK`
    - **Description**: Retrieves all messages for a room.

- **Get Room Updates**
    - **URL**: `/room-updates?roomId={roomId}&lastMessageId={lastMessageId}`
    - **Method**: `GET`
    - **Response**: `200 OK`
    - **Description**: Retrieves messages for a room after a specific message ID.

## WebSocket Events

- **Connection**: `connection`
    - **Description**: Triggered when a user connects.

- **Join Room**: `joinRoom`
    - **Payload**: `{ "roomId": "roomId" }`
    - **Description**: Joins a user to a specific room.

- **Send Message**: `sendMessage`
    - **Payload**: `{ "roomId": "roomId", "authorId": 1, "message": "Hello World" }`
    - **Description**: Sends a message to a room.

- **New Message**: `newMessage`
    - **Payload**: `{ "roomId": "roomId", "authorId": 1, "message": "Hello World" }`
    - **Description**: Broadcasts a new message to the room.

- **Disconnect**: `disconnect`
    - **Description**: Triggered when a user disconnects.
