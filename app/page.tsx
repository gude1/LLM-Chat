/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ResponeChatMsgItem from "@/components/ResponeChatMsgItem";
import SenderChatMsgItem from "@/components/SenderChatMsgItem";
import TextEditor, { TextEditorHandle } from "@/components/TextEditor";
import { useLLmChatStream } from "@/hooks/useLLmChatStream";
import { copyToClipBoard, generateUniqueId } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Message = {
  role: "user" | "assistant";
  id: string;
  content: string;
};

export default function Home() {
  const { response, isLoading, sendMessage, cancelStream } = useLLmChatStream();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStreamId, setCurrentStreamId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const texteditorRef = useRef<TextEditorHandle>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle stream response changes
  useEffect(() => {
    if (!response || !currentStreamId) return;
    handleMessageStreamResponse();
  }, [response, currentStreamId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMessageStreamResponse = () => {
    setMessages((prevMessages) => {
      const messageIndex = prevMessages.findIndex(
        (msg) => msg.id === currentStreamId
      );

      if (messageIndex === -1) {
        // Add new message if not found
        return [
          ...prevMessages,
          {
            role: "assistant",
            content: response,
            id: currentStreamId!,
          },
        ];
      }

      // Update existing message
      const newMessages = [...prevMessages];
      newMessages[messageIndex] = {
        ...newMessages[messageIndex],
        content: response,
      };
      return newMessages;
    });
  };

  const handleSubmit = async (html: string) => {
    try {
      const newMessageId = generateUniqueId();
      setCurrentStreamId(newMessageId);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "user",
          content: html,
          id: generateUniqueId(),
        },
      ]);

      await sendMessage(html);
    } catch (err) {
      console.error("Chat submission error:", err);
      alert("Failed to send message. Please try again.");
    }
  };

  const onChatEditClick = (txt: string) => {
    texteditorRef.current?.setEditorContent(txt);
  };

  const onChatCopyClick = async (content: string) => {
    const result = await copyToClipBoard(content);
    if (result) {
      toast.success("Content copied!");
    }
  };

  return (
    <>
      <main className="flex flex-col mb-64">
        <div className="flex flex-col w-[92%] pt-4 max-w-[56.25rem] self-center">
          {messages.map((message) =>
            message.role === "assistant" ? (
              <ResponeChatMsgItem
                key={message.id}
                content={message.content}
                onCopyClick={onChatCopyClick}
              />
            ) : (
              <SenderChatMsgItem
                key={message.id}
                content={message.content}
                onCopyClick={onChatCopyClick}
                onEditClick={onChatEditClick}
              />
            )
          )}
        </div>
      </main>
      <footer className="pb-4 fixed z-40 bg-background px-5 bottom-0 left-0 right-0 md:ml-64 flex justify-center">
        <TextEditor
          onSubmit={handleSubmit}
          ref={texteditorRef}
          loading={isLoading}
          onCancel={cancelStream}
        />
      </footer>
      <div ref={messagesEndRef} />
    </>
  );
}
