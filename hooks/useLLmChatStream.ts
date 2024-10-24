import { useState, useCallback, useRef } from "react";

type StreamResponse = {
  response: string;
  isLoading: boolean;
  error: Error | null;
};

export const useLLmChatStream = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<string>("");
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (message: string): Promise<StreamResponse> => {
      setIsLoading(true);
      setError(null);
      setResponse("");

      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch("/api/llm-chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (!response.body) {
          throw new Error("No response body");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantResponse = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          assistantResponse += chunk;
          setResponse(assistantResponse);
        }

        return {
          response: assistantResponse,
          isLoading: false,
          error: null,
        };
      } catch (error) {
        const errorInstance =
          error instanceof Error
            ? error
            : new Error("An unknown error occurred");
        setError(errorInstance);
        return {
          response: "",
          isLoading: false,
          error: errorInstance,
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const cancelStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);

  return {
    response,
    isLoading,
    error,
    sendMessage,
    cancelStream,
  };
};
