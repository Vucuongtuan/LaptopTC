import React, { useEffect, useState } from "react";
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
  const [editorData, setEditorData] = useState<string>(
    dataBody || "<p>Hello !</p>"
  );
  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    handleContentChange(data);
  };
  useEffect(() => {
    setEditorData(dataBody || "<p>Hello !</p>");
  }, [dataBody]);

  const handleEditorReady = (editor: any) => {
    editor.setData(editorData);
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfig}
      data={editorData}
      onReady={handleEditorReady}
      onChange={handleEditorChange}
    />
  );
}
