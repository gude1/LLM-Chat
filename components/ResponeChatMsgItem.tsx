"use client";

import React from "react";
import { Button } from "@/components/Button";
import MessageRenderer from "@/components/MessageRenderer";
import { Copy } from "lucide-react";

interface ResponeChatMsgItemProps {
  content?: string;
  onCopyClick?: (content: string) => void;
  id?: string;
}

const ResponeChatMsgItem: React.FC<ResponeChatMsgItemProps> = ({
  content,
  onCopyClick,
}) => {
  const handleCopyClick = () => {
    if (onCopyClick && content) onCopyClick(content);
  };

  return (
    <div className="flex flex-col w-full justify-end">
      <MessageRenderer content={content} />
      <div className="flex my-2">
        <Button
          variant={"ghost"}
          onClick={handleCopyClick}
          className="w-9 h-9 p-0 bg-border mr-2 flex items-center justify-center"
        >
          <Copy width={14} />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ResponeChatMsgItem);
