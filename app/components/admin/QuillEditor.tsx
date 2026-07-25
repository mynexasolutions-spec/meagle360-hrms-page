"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";
import { uploadImage } from "../../lib/uploadImage";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function QuillEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block"],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image(this: { quill: import("quill").default }) {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = async () => {
              const file = input.files?.[0];
              if (!file) return;
              const quill = this.quill;
              const range = quill.getSelection(true);
              try {
                const url = await uploadImage(file);
                quill.insertEmbed(range.index, "image", url, "user");
                quill.setSelection(range.index + 1, 0);
              } catch (err) {
                window.alert(err instanceof Error ? err.message : "Upload failed.");
              }
            };
            input.click();
          },
        },
      },
    }),
    [],
  );

  return (
    <div className="admin-quill">
      <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules} />
    </div>
  );
}
