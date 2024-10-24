export type StreamChunk = {
  id: string;
  content: string;
};

export type Message = {
  role: "user" | "assistant";
  id: string;
  content: string;
};
