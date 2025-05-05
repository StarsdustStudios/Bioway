import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Image from '@tiptap/extension-image';
import { Button } from '@/components/ui/button';
import {
    IconBold,
    IconItalic,
    IconHighlight,
    IconList,
    IconListNumbers,
    IconH1,
    IconH2,
    IconH3,
    IconQuote,
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

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function TiptapEditor({ value, onChange }: Props) {
    const [open, setOpen] = useState(false);
    const [linkDialogOpen, setLinkDialogOpen] = useState(false);
    const [linkURL, setLinkURL] = useState('');
    const [linkText, setLinkText] = useState('');

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
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
      });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) return null;

    const handleClick = () => {
        setOpen(true);
        // editor?.commands.focus();
        console.log('handleclick');
    };

    const closeLinkDialog = () => {
        setLinkDialogOpen(false);
        console.log('handlecloseclick');
    };

    const setLink = () => {
        if (linkText && linkURL) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: linkURL }).run();
        }
        closeLinkDialog(); // Close the dialog after setting the link
    };

    const addImage = () => {
        const url = window.prompt('Enter image URL');
        if (url) {
          editor?.chain().focus().setImage({ src: url }).run();
        }
      };

    return (
        <>
            {/* Preview */}
            <div
                className="border rounded w-full col-span-4 p-2 min-h-[120px] cursor-pointer bg-white"
                onClick={handleClick}
                dangerouslySetInnerHTML={{ __html: value || '<p class="text-gray-400">Click to edit...</p>' }}
            />

            {/* Fullscreen Custom Dialog */}
            {open && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-screen h-screen rounded-none shadow-lg">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-semibold w-screen">Edit Content</h2>
                            <Button onClick={() => setOpen(false)} variant="outline">
                                Close
                            </Button>
                        </div>

                        {/* Toolbar */}
                        <div className="rounded-xl border border-neutral-8flex-grow flex flex-col">
          <div className="flex flex-wrap items-center gap-1 px-4 py-2 border-b border-neutral-700">
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
          </div>

                        {/* Editor Content */}
                        <div className="flex flex-col h-full">
                            <div
                                className="flex-1 overflow-y-auto p-2 min-h-[200px] h-[calc(100vh-180px)] prose"
                                onClick={() => editor?.commands.focus()}
                            >
                                <EditorContent editor={editor} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Link Dialog */}
            {linkDialogOpen && (
                <div className="fixed inset-0 z-5 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold">Set Link</h2>
                        <div className="mt-4">
                            <label className="block text-sm">Link Text</label>
                            <input
                                type="text"
                                value={linkText}
                                onChange={(e) => setLinkText(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm">URL</label>
                            <input
                                type="text"
                                value={linkURL}
                                onChange={(e) => setLinkURL(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <Button onClick={closeLinkDialog} variant="outline">
                                Cancel
                            </Button>
                            <Button onClick={setLink} variant="secondary">
                                Set Link
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}