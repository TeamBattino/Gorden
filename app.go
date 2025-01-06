package main

import (
	"context"
	"fmt"

	"github.com/google/uuid"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// This is a cool fuction that returns a string
func (a *App) CoolFunction() string {
	return "This is a cool function"
}

type Message struct {
	Content string
	Author  string
	UUID    uuid.UUID
}

type PlainMessage struct {
	Content string
	Author  string
}

var chats []Message

func (a *App) AddToChats(i PlainMessage) {
	chats = append(chats, Message{
		Content: i.Content,
		Author:  i.Author,
		UUID:    uuid.New(),
	})
}

func (a *App) GetChats() []Message {
	return chats
}

func (a *App) InitValues() {
	chats = []Message{
		{"hello", "world", uuid.New()},
		{"how", "are", uuid.New()},
		{"you", "good", uuid.New()},
	}
}
