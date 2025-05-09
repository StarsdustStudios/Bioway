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
import { Main } from '../main';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function TiptapEditor({ value, onChange }: Props) {
    const [open, setOpen] = useState(false);
    const [linkDialogOpen, setLinkDialogOpen] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            Highlight,
            Superscript,
            Subscript,
            Image.configure({
                inline: true, 
                allowBase64:true,
                HTMLAttributes: {
                    class: 'block max-w-full h-auto border-rounded-lg mx-auto',
                },
              }),            
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: value,
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) return null;

    const handleClick = () => {
        if (!open) { // Open only if not already open
            setOpen(true);
        }
    };

    const addImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();

                // Image type validation (only allow images)
                if (!file.type.startsWith('image/')) {
                    alert('Please select a valid image file');
                    return;
                }

                reader.onloadend = () => {
                    const base64Image = reader.result;
                    // Insert image into the editor
                    editor.chain().focus().setImage({ src: base64Image }).run();
                };

                reader.onerror = () => {
                    alert('Error occurred while reading the image file');
                };

                // Convert image file to Base64
                reader.readAsDataURL(file);
            }
        };

        input.click();
    };

    const saveContent = () => {
        onChange(editor.getHTML());
        setOpen(false);
    };

    const handleToolbarClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent closing the editor dialog when clicking toolbar buttons
    };

    return (
        <>
            {/* Preview */}
            <div
                className="border rounded w-full col-span-4 p-2 min-h-[120px] cursor-pointer bg-background"
                onClick={handleClick}
                dangerouslySetInnerHTML={{ __html: value || '<p class="text-gray-400">Click to edit...</p>' }}
            />

            {/* Fullscreen Custom Dialog */}
            {open && (
                <div className="fixed inset-0 z-50 bg-backround bg-opacity-50 flex justify-center items-center">
                    <div className="bg-background w-screen h-screen rounded-none shadow-lg">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-semibold w-screen">Edit Content</h2>
                            <div className="flex gap-2">
                                {/* Save button */}
                                <Button onClick={saveContent} variant="outline">
                                    Save
                                </Button>

                                {/* Close button */}
                                <Button onClick={() => setOpen(false)} variant="outline">
                                    Close
                                </Button>
                            </div>
                        </div>
                        {/* Toolbar */}
                        <div className="rounded-xl border border-neutral-8flex-grow flex flex-col">
                            <div className="flex flex-wrap items-center gap-1 px-4 py-2 border-b border-neutral-700">
                                {[1, 2, 3, 4, 5, 6].map((level) => (
                                    <Button
                                        key={level}
                                        variant={editor.isActive('heading', { level }) ? 'secondary' : 'ghost'}
                                        size="icon"
                                        onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                                    >
                                        {{
                                            1: <IconH1 size={16} />,
                                            2: <IconH2 size={16} />,
                                            3: <IconH3 size={16} />,
                                            4: <IconH4 size={16} />,
                                            5: <IconH5 size={16} />,
                                            6: <IconH6 size={16} />,
                                        }[level]}
                                    </Button>
                                ))}
                                <Button variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleBulletList().run()}>
                                    <IconList size={16} />
                                </Button>
                                <Button variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                                    <IconListNumbers size={16} />
                                </Button>
                                <Button variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                                    <IconQuote size={16} />
                                </Button>
                                <Button variant={editor.isActive('bold') ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleBold().run()}>
                                    <IconBold size={16} />
                                </Button>
                                <Button variant={editor.isActive('italic') ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleItalic().run()}>
                                    <IconItalic size={16} />
                                </Button>
                                <Button variant={editor.isActive('highlight') ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleHighlight().run()}>
                                    <IconHighlight size={16} />
                                </Button>
                                <Button variant={editor.isActive('superscript') ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleSuperscript().run()}>
                                    <IconSuperscript size={16} />
                                </Button>
                                <Button variant={editor.isActive('subscript') ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().toggleSubscript().run()}>
                                    <IconSubscript size={16} />
                                </Button>
                                <Button variant={editor.isActive('link') ? 'secondary' : 'ghost'} size="icon" onClick={() => {
                                    const url = window.prompt('Enter URL');
                                    if (url) editor.chain().focus().setLink({ href: url }).run();
                                }}>
                                    <IconLink size={16} />
                                </Button>
                                <Button variant={editor.isActive({ textAlign: 'left' }) ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().setTextAlign('left').run()}>
                                    <IconAlignLeft size={16} />
                                </Button>
                                <Button variant={editor.isActive({ textAlign: 'center' }) ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().setTextAlign('center').run()}>
                                    <IconAlignCenter size={16} />
                                </Button>
                                <Button variant={editor.isActive({ textAlign: 'right' }) ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().setTextAlign('right').run()}>
                                    <IconAlignRight size={16} />
                                </Button>
                                <Button variant={editor.isActive({ textAlign: 'justify' }) ? 'secondary' : 'ghost'} size="icon" onClick={() => editor.chain().focus().setTextAlign('justify').run()}>
                                    <IconAlignJustified size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
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
        </>
    );
}
