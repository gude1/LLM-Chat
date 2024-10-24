import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog";
import { X } from "lucide-react";
import { Progress } from "@/components/Progress";

interface WebScrappingProgressDialogProps {
  open?: boolean;
  queries?: { url: string }[];
  onOpenChange?(open: boolean): void;
}
const WebScrappingProgressDialog: React.FC<WebScrappingProgressDialogProps> = ({
  open,
  queries = [],
  onOpenChange,
}) => {
  const numOfWebsites = queries.length;
  const renderQueries = () => {
    if (!queries) return null;
    return queries.map((item) => {
      return (
        <div className="px-6" key={item.url}>
          <div className="flex h-[3.6875rem] justify-between">
            <div className="flex items-center">
              <div className="flex justify-center mr-4 bg-emerald-green-opaque items-center w-6 h-6 rounded-full">
                <X size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-inter text-[#ECECEC] font-semibold text-sm leading-[1.05875rem]">
                  {item.url}
                </span>
                <span className="font-inter text-[#9B9B9B] font-medium text-xs leading-[0.9075rem]">
                  {item.url}
                </span>
              </div>
            </div>
            <span className="ml-4 font-inter font-medium text-xs  self-center leading-[0.9075rem] text-emerald-green">
              Accessing
            </span>
          </div>

          <Progress value={40} className="h-[0.1875rem] bg-[#3C3C3C]" />
        </div>
      );
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] p-0 pb-[15px] rounded-lg overflow-hidden bg-border max-w-[33.9375rem]">
        <DialogHeader className="px-5 bg-[#2D2D2D] h-[3.3125rem] flex flex-row items-center">
          <DialogTitle className="flex items-center text-[#9B9B9B] font-inter font-medium text-sm leading-[0.9075rem]">
            Searching {numOfWebsites} of {numOfWebsites} website(s)
          </DialogTitle>
        </DialogHeader>
        {renderQueries()}
      </DialogContent>
    </Dialog>
  );
};
export default WebScrappingProgressDialog;
