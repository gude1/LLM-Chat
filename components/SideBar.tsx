"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import {
  Menu,
  Plus,
  History,
  CloudUpload,
  Book,
  Share,
  Trash,
} from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import CircularProgress from "@/components/CircularProgress";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 overflow-y-auto pb-5 z-50 h-full flex flex-col border-r border-border w-full md:w-64 bg-background text-white shadow-lg transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Header with Logo */}
        <div className="h-14 flex justify-center flex-col px-5">
          <Image
            width={79.68}
            height={48}
            src={"/images/unic.png"}
            alt="University logo"
          />
        </div>

        {/* Sidebar body */}
        <div className="flex flex-col flex-[1]">
          <Button className="rounded-full max-w-56 mx-5 justify-start font-inter font-semibold text-sm leading-4 text-[#2D2D2D]">
            <Plus width={20} className="mr-[10px]" />
            New Chat
          </Button>

          <Button
            variant={"ghost"}
            className="mt-5 justify-start px-5 h-[3.25rem] font-inter text-[0.9375rem] rounded-none leading-[1.134375rem]"
          >
            <History width={18} className="mr-3" />
            Recents
          </Button>

          <Accordion
            type="single"
            collapsible
            className="px-5 font-inter min-h-[3.25rem]"
          >
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="font-medium text-[0.9375rem] justify-between leading-[1.134375rem]">
                <div className="flex flex-row items-center">
                  <Book width={18} className="mr-3" /> Library
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Button
                  variant={"ghost"}
                  className="justify-start pl-7 w-full h-[3.25rem] text-silver-gray hover:bg-transparent hover:text-dim-gray font-inter text-[0.9375rem] rounded-none leading-[1.134375rem] "
                >
                  Lists
                </Button>
                <Button
                  variant={"ghost"}
                  className="justify-start pl-7 w-full h-[3.25rem] text-silver-gray hover:bg-transparent hover:text-dim-gray font-inter text-[0.9375rem] rounded-none leading-[1.134375rem] "
                >
                  Personas
                </Button>

                <Button
                  variant={"ghost"}
                  className="justify-start pl-7 w-full h-[3.25rem] text-silver-gray hover:bg-transparent hover:text-dim-gray font-inter text-[0.9375rem] rounded-none leading-[1.134375rem] "
                >
                  Projects
                </Button>
                <Button
                  variant={"ghost"}
                  className="justify-start pl-7 w-full h-[3.25rem] text-silver-gray hover:bg-transparent hover:text-dim-gray font-inter text-[0.9375rem] rounded-none leading-[1.134375rem] "
                >
                  Prompts
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button
            variant={"ghost"}
            className="justify-start h-[3.25rem] px-5 font-inter text-[0.9375rem] rounded-none leading-[1.134375rem]"
          >
            <CloudUpload width={18} className="mr-3" />
            App Files
          </Button>
        </div>
        <div className="rounded-md mx-5 max-w-[13.625rem] mt-2 overflow-hidden">
          {/* Section one */}
          <div className="flex flex-row items-center justify-between bg-gray h-[3.9375rem] p-4">
            <div className="flex flex-col">
              <span className="text-white font-inter font-medium text-[0.9375rem] leading-[1.4rem]">
                125,000 tokens left
              </span>
              <span className="font-inter text-dim-gray mt-1 text-xs font-medium">
                ~145,000 words
              </span>
            </div>

            <CircularProgress percentage={10} />
          </div>

          {/* Section two */}
          <div className="bg-[#282828] h-[2.0625rem] items-center px-4">
            <span className="font-inter font-medium text-xs leading-[0.9075rem] text-[#8E8E8E]">
              See My Plan
            </span>
          </div>
        </div>

        <Button
          variant={"ghost"}
          className="justify-start mt-2 px-5 h-[3.25rem] font-inter text-[0.9375rem] rounded-none leading-[1.134375rem]"
        >
          <Share width={14} className="mr-3" />
          Shared
        </Button>

        <Button
          variant={"ghost"}
          className="justify-start px-5 h-[3.25rem] font-inter text-[0.9375rem] rounded-none leading-[1.134375rem]"
        >
          <Trash width={18} className="mr-3" />
          Recently Deleted
        </Button>
      </aside>

      {/* Mobile Toggle Button */}
      <Button
        variant="outline"
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-800 text-white p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </Button>

      {/* Overlay for small devices when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
