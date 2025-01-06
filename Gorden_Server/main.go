package main

import (
	"context"
	"fmt"
	"log"
	"net"

	pb "../Gorden_Common/message.proto" // Replace with the correct module path where your .proto file is

	"google.golang.org/grpc"
)

// server is used to implement demo.GreeterServer.
type server struct {
	pb.UnimplementedGreeterServer
}

// SayHello implements demo.GreeterServer
func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloResponse, error) {
	log.Printf("Received: %v", in.GetName())
	return &pb.HelloResponse{Message: "Hello " + in.GetName()}, nil
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})
	fmt.Println("Server listening on port 50051")
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
