import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Link from '@tiptap/extension-link';
import { Button } from '@/components/ui/button';
import { IconAlignCenter, IconAlignJustified, IconAlignLeft, IconAlignRight, IconBold, IconH1, IconH2, IconH3, IconHighlight, IconItalic, IconList, IconListNumbers, IconLink, IconPilcrow } from '@tabler/icons-react';

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
            BulletList,
            OrderedList,
            ListItem,
            Link,
            Highlight,
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
        editor?.commands.focus();
    };

    const openLinkDialog = () => {
        setLinkDialogOpen(true);
    };

    const closeLinkDialog = () => {
        setLinkDialogOpen(false);
    };

    const setLink = () => {
        if (linkText && linkURL) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: linkURL }).run();
        }
        closeLinkDialog(); // Close the dialog after setting the link
    };

    return (
        <>
            {/* Preview */}
            <div
                className="border rounded w-full col-span-4 p-2 min-h-[120px] cursor-pointer"
                onClick={handleClick}
                dangerouslySetInnerHTML={{ __html: value || '<p class="text-gray-400">Click to edit...</p>' }}
            />

            {/* Fullscreen Custom Dialog */}
            {open && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="w-screen h-screen rounded-none shadow-lg">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-semibold w-screen">Edit Content</h2>
                            <Button onClick={() => setOpen(false)} variant="outline">
                                Save
                            </Button>
                        </div>

                        {/* Toolbar */}
                        <div className="bg-white dark:bg-black flex gap-2 p-2 border-b">
                            {/* Text Formatting */}
                            <Button
                                type="button"
                                variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'}
                                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            >
                                <IconH1 size={16} />
                            </Button>
                            <Button
                                type="button"
                                variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
                                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            >
                                <IconH2 size={16} />
                            </Button>
                            <Button
                                type="button"
                                variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'outline'}
                                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            >
                                <IconH3 size={16} />
                            </Button>
                            <Button
                                type="button"
                                variant={editor.isActive('bold') ? 'default' : 'outline'}
                                onClick={() => editor.chain().focus().toggleBold().run()}
                            >
                                <IconBold size={16} />
                            </Button>
                            <Button
                                type="button"
                                variant={editor.isActive('italic') ? 'default' : 'outline'}
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                            >
                                <IconItalic size={16} />
                            </Button>
                            <Button
                                type="button"
                                variant={editor.isActive('highlight') ? 'default' : 'outline'}
                                onClick={() => editor.chain().focus().toggleHighlight().run()}
                            >
                                <IconHighlight size={16} />
                            </Button>
                            <Button
                                type="button"
                                variant={editor.isActive('link') ? 'default' : 'outline'}
                                onClick={openLinkDialog} // Open the link dialog
                            >
                                <IconLink size={16} />
                            </Button>

                            {/* Lists */}
                            <Button
                                type="button"
                                variant={editor.isActive('bulletList') ? 'default' : 'outline'}
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                            >
                                <IconList size={16} />
                            </Button>
                            <Button
                                type="button"
                                variant={editor.isActive('orderedList') ? 'default' : 'outline'}
                                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            >
                                <IconListNumbers size={16} />
                            </Button>

                            {/* Paragraph & Align */}
                            <Button
                                type="button"
                                variant={editor.isActive('paragraph') ? 'default' : 'outline'}
                                onClick={() => editor.chain().focus().setParagraph().run()}
                            >
                                <IconPilcrow size={16} />
                            </Button>
                            <Button
                                type="button"
                                variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'outline'}
                                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            >
                                <IconAlignLeft size={16} />
                            </Button>
                            <Button
                                type="button"
                                variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'outline'}
                                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            >
                                <IconAlignCenter size={16} />
                            </Button>
                            <Button
                                type="button"
                                variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'outline'}
                                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            >
                                <IconAlignRight size={16} />
                            </Button>
                            <Button
                                type="button"
                                variant={editor.isActive({ textAlign: 'justify' }) ? 'default' : 'outline'}
                                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                            >
                                <IconAlignJustified size={16} />
                            </Button>
                        </div>

                        {/* Editor Content */}
                        <div className="bg-white dark:bg-black flex flex-col h-full">
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
                    <div className="p-6 rounded-lg shadow-lg w-96">
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
