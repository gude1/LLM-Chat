import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";
import { Label } from "@/components/Label";
import Command from "@/public/icons/command.svg";

import { Link, Globe } from "lucide-react";

interface CommandDialogProps {
  open?: boolean;
  websearchval?: string | number | readonly string[];
  onWebSearchValChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  includeurlval?: string | number | readonly string[];
  onIncludeUrlValChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit?: () => void;
  onOpenChange?(open: boolean): void;
}

const CommandDialog: React.FC<CommandDialogProps> = ({
  open,
  onOpenChange,
  websearchval,
  onWebSearchValChange,
  includeurlval,
  onIncludeUrlValChange,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] p-0 rounded-lg overflow-hidden bg-border max-w-[33.9375rem]">
        <DialogHeader className="border-b py-3 px-4 border-charcoal-gray">
          <DialogTitle className="flex items-center font-inter font-medium text-sm leading-[1.05875rem]">
            <Command className="mr-2" />
            Commands
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="bg-background flex flex-col sm:flex-row pt-5 pl-5 pr-[0.9125rem] pb-[0.9125rem] rounded-lg">
            <div className="flex flex-col  border-red-700 flex-[1] overflow-hidden">
              <div className="flex items-center text-white">
                <Globe size={14} className="mr-[0.625rem]" />
                <Label className="uppercase font-inter font-semibold text-xs leading-[0.9075rem] text-white">
                  Web Search
                </Label>
              </div>
              <Textarea
                value={websearchval}
                onChange={onWebSearchValChange}
                className="mt-4 h-[40px] p-0 text-white focus-visible:ring-offset-0  border-none outline-none focus-visible:ring-0 rounded-none flex placeholder:text-medium-gray resize-none"
                placeholder="Search Term"
              />
            </div>
            <div className="flex flex-row border-red-600 items-end">
              <Button
                variant="outline"
                className="text-white h-[1.875rem] border-[#333333] rounded-lg pfont-inter font-medium text-xs leading-[1.4rem] hover:border-white hover:bg-transparent hover:text-white mr-2"
              >
                Advanced
              </Button>

              <Button
                variant="outline"
                onClick={onSubmit}
                className="bg-[#333333] h-[1.875rem] text-white border-none rounded-lg ont-inter font-medium text-xs leading-[1.4rem]"
              >
                Insert
              </Button>
            </div>
          </div>

          <div className="bg-background mt-2 flex flex-col sm:flex-row pt-5 pl-5 pr-[0.9125rem] pb-[0.9125rem] rounded-lg">
            <div className="flex flex-col  border-red-700 flex-[1] overflow-hidden">
              <div className="flex items-center text-white">
                <Link size={14} className="mr-[0.625rem]" />
                <Label className="uppercase font-inter font-semibold text-xs leading-[0.9075rem] text-white">
                  Include url
                </Label>
              </div>
              <Textarea
                value={includeurlval}
                onChange={onIncludeUrlValChange}
                className="mt-4 h-[40px] p-0 text-white focus-visible:ring-offset-0  border-none outline-none focus-visible:ring-0 rounded-none flex placeholder:text-medium-gray resize-none"
                placeholder="Enter URL"
              />
            </div>
            <div className="flex flex-row border-red-600 items-end">
              <Button
                variant="outline"
                className="text-white h-[1.875rem] border-[#333333] rounded-lg pfont-inter font-medium text-xs leading-[1.4rem] hover:border-white hover:bg-transparent hover:text-white mr-2"
              >
                Advanced
              </Button>

              <Button
                variant="outline"
                onClick={onSubmit}
                className="bg-[#333333] h-[1.875rem] text-white border-none rounded-lg ont-inter font-medium text-xs leading-[1.4rem]"
              >
                Insert
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommandDialog;
