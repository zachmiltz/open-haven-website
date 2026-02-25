"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const promptChips = [
  "Is Holochain right for my use case?",
  "How do I connect NextGraph to ActivityPub?",
  "What's the learning curve for Murmurations?",
]

interface Message {
  role: "user" | "assistant"
  content: string
}

export function ProtocolChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  const sendMessage = (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = { role: "user", content }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Demo response
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content:
          "Thanks for your question! The Protocol Advisor chatbot is coming soon. In the meantime, you can explore our protocol directory or join the community discussions to get help with your specific use case.",
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  return (
    <>
      {/* Chat Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <Bot className="h-5 w-5" />
        <span className="hidden sm:inline">Ask the Protocol Advisor</span>
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed right-6 bottom-6 z-50 flex h-[500px] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all",
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-8 scale-95 opacity-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3">
          <div className="flex items-center gap-2 text-primary-foreground">
            <Bot className="h-5 w-5" />
            <span className="font-semibold">Protocol Advisor</span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col justify-center">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  Hi! I can help you understand these protocols.
                </h3>
                <p className="text-sm text-muted-foreground">
                  Check compatibility with your existing stack, or guide
                  implementation decisions. What are you building?
                </p>
              </div>

              <div className="space-y-2">
                {promptChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => sendMessage(chip)}
                    className="w-full rounded-lg border border-border bg-background p-3 text-left text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2 text-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage(input)
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about protocols..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
