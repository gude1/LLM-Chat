"use client";

import React from "react";
import MessageRenderer from "@/components/MessageRenderer";
import { Button } from "@/components/Button";
import { Copy, Edit } from "lucide-react";

interface SenderChatMsgItemProps {
  content?: string;
  onEditClick?: (content: string) => void;
  onCopyClick?: (content: string) => void;
  id?: string;
}

const SenderChatMsgItem: React.FC<SenderChatMsgItemProps> = ({
  content,
  onEditClick,
  onCopyClick,
}) => {
  const handleEditClick = () => {
    if (onEditClick && content) onEditClick(content);
  };

  const handleCopyClick = () => {
    if (onCopyClick && content) onCopyClick(content);
  };

  return (
    <div className="flex flex-row w-full mb-8 justify-end">
      <div className="max-w-[80%] flex flex-col">
        <div className="p-2 bg-border rounded-xl">
          <MessageRenderer content={content} />
        </div>
        <div className="self-end flex mt-2">
          <Button
            variant={"ghost"}
            onClick={handleCopyClick}
            className="w-7 h-7 p-0 bg-border mr-2 flex items-center justify-center"
          >
            <Copy width={10} />
          </Button>
          <Button
            variant={"ghost"}
            onClick={handleEditClick}
            className="w-7 h-7 p-0 bg-border mr-2 flex items-center justify-center"
          >
            <Edit width={10} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SenderChatMsgItem);
