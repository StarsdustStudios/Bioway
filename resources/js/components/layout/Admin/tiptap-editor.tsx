'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Image from '@tiptap/extension-image';

import {
  IconBold,
  IconItalic,
  IconCode,
  IconHighlight,
  IconList,
  IconListNumbers,
  IconH1,
  IconH2,
  IconH3,
  IconQuote,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconLink,
  IconTextPlus,
  IconMinus,
  IconSuperscript,
  IconSubscript,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconAlignJustified,
  IconH4,
  IconH5,
  IconH6,
} from '@tabler/icons-react';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function RichTextEditorDialog({text} : { text: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Highlight,
      Superscript,
      Subscript,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: text,
  });

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button className="col-span-4 text-start" variant="outline">Open Rich Text Editor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="w-full">
          <DialogTitle className="w-full">Edit Content</DialogTitle>
        </DialogHeader>
        <div className="w-full rounded-xl border border-neutral-8flex-grow flex flex-col">
          <div className="w-full flex flex-wrap items-center gap-1 px-4 py-2 border-b border-neutral-700">
            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
              <IconH1 size={16} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
              <IconH2 size={16} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
              <IconH3 size={16} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}>
              <IconH4 size={16} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleHeading({ level: 5 }).run()}>
              <IconH5 size={16} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleHeading({ level: 6 }).run()}>
              <IconH6 size={16} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleBulletList().run()}>
              <IconList size={16} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
              <IconListNumbers size={16} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
              <IconQuote size={16} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleBold().run()}>
              <IconBold size={16} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleItalic().run()}>
              <IconItalic size={16} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleHighlight().run()}>
              <IconHighlight size={16} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleSuperscript().run()}>
              <IconSuperscript size={16} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleSubscript().run()}>
              <IconSubscript size={16} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => {
              const url = window.prompt('Enter URL');
              if (url) editor?.chain().focus().setLink({ href: url }).run();
            }}>
              <IconLink size={16} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().setTextAlign('left').run()}>
              <IconAlignLeft size={16} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().setTextAlign('center').run()}>
              <IconAlignCenter size={16} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().setTextAlign('right').run()}>
              <IconAlignRight size={16} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().setTextAlign('justify').run()}>
              <IconAlignJustified size={16} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().setHorizontalRule().run()}>
              <IconMinus size={16} />
            </Button>

            <Button variant="ghost" size="icon" onClick={addImage}>
              <IconTextPlus size={16} />
            </Button>
          </div>

          <div className="flex-grow overflow-auto">
            <EditorContent editor={editor} className="prose prose-invert px-4 py-2 max-w-screen h-[400px]" />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Save</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
