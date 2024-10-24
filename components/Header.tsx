import { Button } from "@/components/Button";
import { Avatar, AvatarFallback } from "@/components/Avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/Tabs";
import {
  ChevronDown,
  SquarePen,
  Copy,
  ArrowDownToLine,
  CornerUpRight,
} from "lucide-react";

const Header = () => {
  return (
    <>
      {/* Header One */}
      <div className="h-14 hidden md:flex fixed z-40 bg-background overflow-x-auto px-5 whitespace-nowrap left-0 right-0  justify-between items-center top-0 md:ml-64 border-b border-gray">
        <div />
        <div className="flex">
          <Button
            variant={"ghost"}
            className="rounded-none h-full font-inter font-medium text-sm leading-[1.05875rem]"
            aria-label="Go to Dashboard"
          >
            Dashboard
          </Button>

          <Button
            variant={"ghost"}
            className="rounded-none h-full ml-8 font-inter font-medium text-sm leading-[1.05875rem]"
            aria-label="View My Apps"
          >
            My Apps
          </Button>
          <Button
            variant={"ghost"}
            className="rounded-none h-full ml-8 font-inter font-medium text-sm leading-[1.05875rem]"
            aria-label="Open App Store"
          >
            App Store
          </Button>
          {/* Add more buttons if needed */}
        </div>
        <div className="h-10 flex items-center">
          <Avatar className="w-[2.125rem] h-[2.125rem] ml-2 mr-0">
            <AvatarFallback className="bg-primary font-inter font-medium leading-[0.9075rem]">
              AP
            </AvatarFallback>
          </Avatar>

          <ChevronDown
            width={18}
            fill="white"
            className="shrink-0 transition-transform duration-200"
          />
        </div>
      </div>
      {/* Header Two */}
      <div className="h-14 fixed hidden md:flex z-40 bg-background items-center justify-between overflow-x-auto px-5 whitespace-nowrap left-0 right-0 top-14 md:ml-64 border-b border-gray">
        <Button
          variant={"ghost"}
          className="rounded-none font-inter font-semibold text-base leading-[1.21rem]"
        >
          Front-End Task
          <SquarePen strokeWidth={3.5} width={14} className="ml-3" />
        </Button>

        <Tabs
          defaultValue="Sequential"
          className="rounded-lg overflow-hidden w-auto min-w-64 mr-4"
        >
          <TabsList className="grid grid-cols-3 bg-border p-0">
            <TabsTrigger
              className="rounded-none font-inter font-semibold text-white text-sm leading-[1.05875rem] data-[state=active]:bg-white data-[state=active]:text-background h-full"
              value="Stream"
            >
              Stream
            </TabsTrigger>
            <TabsTrigger
              value="Parallel"
              className="rounded-none font-inter font-semibold text-white text-sm leading-[1.05875rem] data-[state=active]:bg-white data-[state=active]:text-background h-full"
            >
              Parallel
            </TabsTrigger>
            <TabsTrigger
              value="Sequential"
              className="rounded-none font-inter font-semibold text-white text-sm leading-[1.05875rem] data-[state=active]:bg-white data-[state=active]:text-background h-full"
            >
              Sequential
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex">
          <Button
            variant={"ghost"}
            className="w-9 h-9 p-0 bg-border mr-[0.625rem] flex items-center justify-center"
          >
            <Copy width={14} />
          </Button>
          <Button
            variant={"ghost"}
            className="w-9 h-9 p-0 bg-border mr-[0.625rem] flex items-center justify-center"
          >
            <ArrowDownToLine width={14} />
          </Button>

          <Button
            variant={"ghost"}
            className="w-9 h-9 p-0 bg-border flex items-center justify-center"
          >
            <CornerUpRight width={14} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
