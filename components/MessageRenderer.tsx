import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageProps {
  content?: string;
}

const MessageRenderer: React.FC<MessageProps> = ({ content = "string" }) => {
  return (
    <div className="text-white max-w-full font-inter px-2 md:px-4 overflow-hidden">
      <ReactMarkdown
        className="w-full break-words"
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");

            if (!match) {
              return (
                <code
                  className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm break-words"
                  {...rest}
                >
                  {children}
                </code>
              );
            }

            return (
              <div className="relative w-full max-w-full overflow-x-auto">
                <SyntaxHighlighter
                  language={match[1]}
                  style={vscDarkPlus}
                  className="rounded-md my-2 text-sm md:text-base w-full"
                  customStyle={{
                    padding: "1rem",
                    margin: "0.5rem 0",
                    maxWidth: "100%",
                  }}
                  wrapLongLines={true}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            );
          },
          p: ({ children }) => (
            <p className="text-sm md:text-base my-2">{children}</p>
          ),
          h1: ({ children }) => (
            <h1 className="text-xl md:text-2xl font-bold my-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg md:text-xl font-semibold my-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base md:text-lg font-medium my-2">
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside my-2 text-sm md:text-base">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside my-2 text-sm md:text-base">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="my-1 ml-2">{children}</li>,
          table: ({ children }) => (
            <div className="overflow-x-auto w-full my-4">
              <table className="min-w-full table-auto border-collapse">
                {children}
              </table>
            </div>
          ),
          pre: ({ children }) => (
            <pre className="overflow-x-auto w-full">{children}</pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MessageRenderer;
