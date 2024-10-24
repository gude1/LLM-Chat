"use client";

import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useEffect,
} from "react";
import { useEditor, EditorContent, BubbleMenu, Editor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/Button";
import PaperPlane from "@/public/icons/paper-plane.svg";
import User from "@/public/icons/user.svg";
import Command from "@/public/icons/command.svg";

import {
  Plus,
  Quote,
  Bold,
  Italic,
  List,
  ListOrdered,
  StopCircle,
  Heading1,
  Heading2,
  Code,
  Strikethrough,
} from "lucide-react";
import CircularProgress from "@/components/CircularProgress";
import CommandDialog from "@/components/CommandDialog";
import WebScrappingProgressDialog from "./WebScrappingProgressDialog";
import { calculatePercentage, cn } from "@/lib/utils";
import { toast } from "sonner";

interface TextEditorProps {
  className?: string;
  limit?: number;
  loading?: boolean;
  onCancel?: () => void;
  onSubmit?: (content: string) => void;
}

export interface TextEditorHandle {
  // getEditor: () => Editor | null;
  setEditorContent: (content: string) => void;
}

const MenuButton = ({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className={`p-1 h-8 text-[#797979] w-8 hover:bg-gray-700 ${
      active ? "text-white" : ""
    }`}
  >
    {children}
  </Button>
);

const TextEditor = forwardRef<TextEditorHandle, TextEditorProps>(
  (
    {
      className,
      onSubmit,
      loading = false,
      onCancel,
      limit = 1000,
    }: TextEditorProps,
    ref
  ) => {
    const [openCommandDialog, setOpenCommandDialog] = useState(false);
    const [openWebScrapperDialog, setOpenWebScrapperDialog] = useState(false);
    const [webSearchTxt, setWebSearchTxt] = useState("");
    const [includeUrlTxt, setIncludeUrlTxt] = useState("");
    const [scrapeQueries, setScrapeQueries] = useState<Array<{ url: string }>>(
      []
    );

    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
        Placeholder.configure({
          placeholder:
            "Type '/' for quick access to the command menu. Use '||' to enter multiple prompts.",
          emptyEditorClass:
            "before:content-[attr(data-placeholder)] before:text-[#797979] before:float-left before:pointer-events-none before:h-0",
        }),
        CharacterCount.configure({
          limit,
        }),
      ],
      onUpdate(props) {
        if (props.editor.getText() == "/") {
          setOpenCommandDialog(true);
        }
      },
      editorProps: {
        attributes: {
          class:
            "min-h-[3.3125rem] mx-auto focus:outline-none border-none prose prose-invert max-w-none",
        },
      },
    });

    useImperativeHandle(
      ref,
      () => {
        return {
          setEditorContent: (content: string) =>
            editor?.commands.setContent(content),
        };
      },
      [editor]
    );

    const getRemainingCharacters = (editor: Editor) => {
      const current = editor.storage.characterCount.characters();
      return limit - current;
    };

    const handleContentChange = useCallback(async () => {
      if (editor) {
        const content = editor.getHTML();

        const includeUrlRegex =
          /\[include-url:\s*\[([^\]]+)\]\s*max_execution_time:(\d+)\s*filter:(true|false)\s*store:(true|false)\]/g;
        let match;
        const matches = [];

        // Find all matches in the content
        while ((match = includeUrlRegex.exec(content)) !== null) {
          matches.push(match); // Store each match in the array
        }

        if (matches.length > 0) {
          // Set the dialog to open when at least one command is detected
          setOpenWebScrapperDialog(true);
          console.info("matches", matches);

          for (const match of matches) {
            const url = match[1]; // Extract the URL
            const maxExecutionTime = parseInt(match[2], 10);
            const filter = match[3] === "true";

            updateScrapeQueries(url);
            try {
              // Call the scraping API
              const response = await fetch("/api/scrape", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ url, maxExecutionTime, filter }),
              });

              if (!response.ok) {
                throw new Error("Failed to fetch content from the URL.");
              }

              const data = await response.json();
              const availablespace = getRemainingCharacters(editor);
              // Replace the command with the fetched content
              const updatedContent = content.replace(match[0], data.content);

              if (updatedContent.length >= limit) {
                toast.error(
                  "content was truncated to acommodate character limit",
                  {
                    duration: 2000,
                    cancel: true,
                  }
                );
              }
              editor?.commands?.setContent(
                updatedContent.slice(0, availablespace)
              );
              // Optionally, focus the editor after replacement
              editor.commands.focus();
            } catch (error) {
              console.error("Error scraping URL:", error);
              toast.error("Failed to scrape the URL. Please try again.", {
                duration: 2000,
                cancel: true,
              });
            }
          }

          // Close the dialog after all scraping is done
          setOpenWebScrapperDialog(false);
          setScrapeQueries([]);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor]);

    useEffect(() => {
      // Listen for changes in the editor
      const editorListener = editor?.on("update", handleContentChange);

      return () => {
        // Clean up the listener on unmount
        editorListener?.off("update", handleContentChange);
      };
    }, [editor, handleContentChange]);

    const handleSubmit = () => {
      if (editor) {
        const content = editor.getText();

        if (!editor) {
          return;
        }
        editor.commands.clearContent();
        if (onSubmit) onSubmit(content); //if onSubmit is defined
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevent default behavior for Enter key
        handleSubmit();
      }
    };

    const onCommandDialogSubmit = () => {
      try {
        if (!webSearchTxt && !includeUrlTxt) {
          return;
        }
        const websearchval = webSearchTxt;
        const includeurl = includeUrlTxt;
        setOpenCommandDialog(false);
        setWebSearchTxt("");
        setIncludeUrlTxt("");
        editor?.commands.insertContent("<p><br /></p>"); // Insert a new paragraph or line break
        if (websearchval) {
          editor?.commands?.insertContent(
            `[include-url: [https://www.google.com?search=${websearchval}] max_execution_time:300 filter:true store:true]`
          );
          editor?.commands.insertContent("<p><br /></p>");
        }

        if (includeurl) {
          editor?.commands?.insertContent(
            `[include-url: [${includeurl}] max_execution_time:300 filter:true store:true]`
          );
          editor?.commands.insertContent("<p><br /></p>");
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong, please try again");
      }
    };

    const updateScrapeQueries = (url: string) => {
      setScrapeQueries((prevQueries) => {
        const urlExists = prevQueries.some((query) => query.url === url);
        if (!urlExists) {
          return [
            ...prevQueries,
            {
              url,
            },
          ];
        }
        return prevQueries;
      });
    };

    if (!editor) {
      return null;
    }

    return (
      <>
        <div className={cn(`w-full max-w-[60rem] ${className}`)}>
          <div className="w-full flex flex-col rounded-lg text-white border border-[#2D2D2D] overflow-hidden">
            <div className="flex items-center gap-1 px-2 py-1 border-b border-[#2D2D2D] bg-[#1A1A1A] sticky top-0 z-10">
              <MenuButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive("bold")}
              >
                <Bold size={16} />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive("italic")}
              >
                <Italic size={16} />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                active={editor.isActive("strike")}
              >
                <Strikethrough size={16} />
              </MenuButton>
              <div className="w-px h-6 bg-[#2D2D2D] mx-1" />
              <MenuButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                active={editor.isActive("heading", { level: 1 })}
              >
                <Heading1 size={16} />
              </MenuButton>
              <MenuButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                active={editor.isActive("heading", { level: 2 })}
              >
                <Heading2 size={16} />
              </MenuButton>
              <div className="w-px h-6 bg-[#2D2D2D] mx-1" />
              <MenuButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                active={editor.isActive("bulletList")}
              >
                <List size={16} />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                active={editor.isActive("orderedList")}
              >
                <ListOrdered size={16} />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                active={editor.isActive("codeBlock")}
              >
                <Code size={16} />
              </MenuButton>
            </div>

            <div className="flex relative">
              <div className="flex-grow min-w-0 max-h-64 overflow-y-auto pr-[4rem]">
                <EditorContent
                  editor={editor}
                  className="pl-5 py-5"
                  onKeyDown={handleKeyDown} // Add keydown event to trigger on Enter key
                />
              </div>

              <div className="absolute right-0 top-0 h-full flex items-start pt-5 bg-[#121212] pr-3">
                <Button
                  variant={"ghost"}
                  className="w-9 h-9 p-0 bg-transparent hover:text-white hover:bg-transparent flex items-center justify-center"
                  onClick={loading ? onCancel : handleSubmit} // Attach handleSubmit to send button
                >
                  {loading ? (
                    <StopCircle size={30} />
                  ) : (
                    <PaperPlane size={25} />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {editor && (
            <BubbleMenu
              editor={editor}
              tippyOptions={{ duration: 100 }}
              className="flex items-center gap-1 p-1 rounded-lg bg-[#1A1A1A] border border-[#2D2D2D]"
            >
              <MenuButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive("bold")}
              >
                <Bold size={16} />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive("italic")}
              >
                <Italic size={16} />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                active={editor.isActive("strike")}
              >
                <Strikethrough size={16} />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                active={editor.isActive("code")}
              >
                <Code size={16} />
              </MenuButton>
            </BubbleMenu>
          )}

          <div className="mt-5 flex justify-between items-center">
            <div className="flex flex-wrap gap-3 xl:gap-0">
              <Button
                variant={"ghost"}
                onClick={() => setOpenCommandDialog(true)}
                className="p-0 hover:bg-transparent hover:text-white mr-7 w-auto h-auto rounded-none flex items-center justify-center"
              >
                <Command className="mr-2" />
                Commands
              </Button>
              <Button
                variant={"ghost"}
                onClick={() => setOpenWebScrapperDialog(true)}
                className="p-0 hover:bg-transparent hover:text-white mr-7 w-auto h-auto rounded-none flex items-center justify-center"
              >
                <Quote size={16} className="mr-2" />
                Prompts
              </Button>
              <Button
                variant={"ghost"}
                className="p-0 hover:bg-transparent hover:text-white mr-7 w-auto h-auto rounded-none flex items-center justify-center"
              >
                <User className="mr-2" />
                Personas
              </Button>
              <Button
                variant={"ghost"}
                className="p-0 hover:bg-transparent hover:text-white mr-7 w-auto h-auto rounded-none flex items-center justify-center"
              >
                <Plus size={20} className="mr-1" />
                Add
              </Button>
            </div>

            <div className="flex items-center">
              <span className="text-[#797979] mr-3 font-normal leading-[0.983125rem] text-[0.8125rem]">
                {editor.storage.characterCount.characters()}/{limit}
              </span>
              <CircularProgress
                size={22}
                percentage={
                  calculatePercentage(
                    editor.storage.characterCount.characters(),
                    `${limit}`
                  ) || undefined
                }
                circleClassName="stroke-white"
              />
            </div>
          </div>
        </div>

        {openCommandDialog && (
          <CommandDialog
            open={openCommandDialog}
            websearchval={webSearchTxt}
            onWebSearchValChange={(event) => {
              setWebSearchTxt(event.target.value);
            }}
            includeurlval={includeUrlTxt}
            onIncludeUrlValChange={(event) => {
              setIncludeUrlTxt(event.target.value);
            }}
            onOpenChange={setOpenCommandDialog}
            onSubmit={onCommandDialogSubmit}
          />
        )}
        {openWebScrapperDialog && (
          <WebScrappingProgressDialog
            queries={scrapeQueries}
            open={openWebScrapperDialog}
            onOpenChange={setOpenWebScrapperDialog}
          />
        )}
      </>
    );
  }
);

TextEditor.displayName = "TextEditor";

export default TextEditor;
