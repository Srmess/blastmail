'use client';

import { cn } from '@/lib/utils';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export function RichTextEditor({ setValue, value, readonly = false }: { value: string; setValue: (e: string) => void; readonly?: boolean }) {
    const modules = {
        toolbar: readonly
            ? false
            : [
                  [{ header: [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  [{ align: [] }],
                  ['link', 'image'],
                  [{ color: [] }, { background: [] }],
              ],
    };

    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'align', 'link', 'image', 'color', 'background'];

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
            readOnly={readonly}
            className={cn('custom-quill', readonly ? 'h-full [&>div]:max-h-full! [&>div]:border-0! [&>div>div]:px-4!' : 'max-h-[calc(100%-67px)]')}
        />
    );
}
