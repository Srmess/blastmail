'use client';

import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function QuillEditor() {
    const [value, setValue] = useState('');

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link', 'image'],
            [{ color: [] }, { background: [] }],
        ],
    };

    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'align', 'link', 'image', 'color', 'background'];

    return (
        <div className="max-w-[500px] overflow-hidden border-amber-950 bg-background">
            <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} className="custom-quill" />
        </div>
    );
}
