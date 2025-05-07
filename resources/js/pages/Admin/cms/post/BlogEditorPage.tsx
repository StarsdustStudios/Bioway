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
  IconImageInPicture,
  IconPhoto,
} from '@tabler/icons-react';
import ItemDataProvider from '@/context/item-data-context';
import { Header } from '@/components/layout/header';
import { ThemeSwitch } from '@/components/theme-switch';
import { ProfileDropdown } from '@/components/ui/profile-dropdown';
import { Main } from '@/components/layout/main';
import { router } from '@inertiajs/react';


interface Props {
  id: number;
  contents: string | { contents: string };
  category_id: number,
  title: string,
  hero_image: string,
  slug: string,
}

export default function BlogEditorPage({ data }: { data: Props }) {
  const [editorContent, setEditorContent] = useState(data.contents);

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
    content: data.contents,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && data.contents !== editor.getHTML()) {
      // Check if content has changed, then set it again
      const contentToSet = typeof data.contents === 'string' ? data.contents : data.contents?.contents ?? '';
      editor.commands.setContent(contentToSet);
      console.log(editor)
      const imageTags = contentToSet.match(/<img[^>]*src="[^"]+"[^>]*>/g);
      if (imageTags) {
        console.log("Images found in content:", imageTags);
      }
    }
  }, [data.contents, editor]);
  
  
  
  

  if (!editor) return null;

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
          const base64Image = reader.result as string;
          // Insert image into the editor as base64
          editor.chain().focus().insertContent(`<img src="${base64Image}" alt="image" />`).run();
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
  
  

  return (
    <ItemDataProvider>
      <Header fixed>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="w-full border rounded-lg p-4 space-y-4 bg-background">
          {/* Header Menu */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Edit Content</h2>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const formData = new FormData();

                  formData.append('category_id', String(Number(data.category_id)));
                  formData.append('title', data.title);
                  formData.append('slug', data.slug);
                  formData.append('id', data.id);
                  formData.append('_method', 'PUT');
                  formData.append('content', editorContent);
                  router.post(route('cms.posts.update', data.id), formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                    onSuccess: () => {
                      console.log('Post saved successfully');
                      console.log(formData.get('content')); // This line shows the content that was added to FormData
                    }
                  });                }}
                variant="outline"
              >
                Save
              </Button>



              <Button onClick={() => router.visit(`/cms/posts`)} variant="outline">Close</Button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1">
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
              <IconPhoto size={16} />
            </Button>
          </div>

          {/* Editor */}
          <div className="prose max-w-none max-h-full border rounded p-3">
            <EditorContent editor={editor} />
          </div>
        </div>
      </Main>
    </ItemDataProvider>
  );
}
