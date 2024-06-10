import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const editorConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "link",
      "bulletedList",
      "numberedList",
      "blockQuote",
      "codeBlock",
      "insertTable",
      "mediaEmbed",
      "|",
      "alignment",
      "fontColor",
      "fontBackgroundColor",
      "fontSize",
      "fontFamily",
      "|",
      "indent",
      "outdent",
      "|",
      "undo",
      "redo",
      "|",
      "highlight",
      "horizontalLine",
      "subscript",
      "superscript",
      "|",
      "removeFormat",
      "imageUpload",
    ],
    shouldNotGroupWhenFull: true,
  },
  language: "en",
  fontSize: {
    options: ["tiny", "small", "default", "big", "huge"],
  },
  image: {
    toolbar: [
      "imageTextAlternative",
      "imageStyle:full",
      "imageStyle:side",
      "linkImage",
    ],
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableProperties",
      "tableCellProperties",
    ],
  },
};
export default function TextEditor({
  handleContentChange,
  dataBody,
}: {
  handleContentChange: any;
  dataBody?: string;
}) {
  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    handleContentChange(data);
  };
  return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfig}
      data={dataBody || "<p>Hello !</p>"}
      onChange={handleEditorChange}
    />
  );
}
