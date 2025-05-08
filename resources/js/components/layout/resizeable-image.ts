// resizable-image.ts
import { Node, mergeAttributes } from '@tiptap/core';

export const ResizableImage = Node.create({
  name: 'resizableImage',

  group: 'block',
  selectable: true,
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: 'auto',
      },
      height: {
        default: 'auto',
      },
      alt: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[data-resizable]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes, { 'data-resizable': 'true' })];
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const wrapper = document.createElement('div');
      wrapper.contentEditable = 'false';
      wrapper.style.position = 'relative';
      wrapper.style.display = 'inline-block';

      const img = document.createElement('img');
      img.src = node.attrs.src;
      img.alt = node.attrs.alt;
      img.style.width = node.attrs.width;
      img.style.height = node.attrs.height;
      img.style.maxWidth = '100%';
      img.style.display = 'block';

      const handle = document.createElement('div');
      handle.style.width = '10px';
      handle.style.height = '10px';
      handle.style.background = '#000';
      handle.style.position = 'absolute';
      handle.style.right = '0';
      handle.style.bottom = '0';
      handle.style.cursor = 'nwse-resize';

      handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const startX = e.pageX;
        const startY = e.pageY;
        const startWidth = img.offsetWidth;
        const startHeight = img.offsetHeight;

        const onMouseMove = (moveEvent) => {
          const newWidth = startWidth + (moveEvent.pageX - startX);
          const newHeight = startHeight + (moveEvent.pageY - startY);
          img.style.width = `${newWidth}px`;
          img.style.height = `${newHeight}px`;
        };

        const onMouseUp = () => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);

          editor.chain().command(({ tr }) => {
            tr.setNodeMarkup(getPos(), undefined, {
              ...node.attrs,
              width: img.style.width,
              height: img.style.height,
            });
            return true;
          }).run();
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });

      wrapper.appendChild(img);
      wrapper.appendChild(handle);

      return {
        dom: wrapper,
        contentDOM: null,
        update(updatedNode) {
          if (updatedNode.type !== node.type) return false;
          img.src = updatedNode.attrs.src;
          img.alt = updatedNode.attrs.alt;
          img.style.width = updatedNode.attrs.width;
          img.style.height = updatedNode.attrs.height;
          return true;
        },
      };
    };
  },
});
