import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Marker from "@editorjs/marker";
import MyParagraph from "@editorjs/paragraph";
import { Fragment, useRef, useState } from "react";

const Editor = (props) => {
  const [data, setData] = useState(null);
  const editorInstance = useRef();
  const editor = new EditorJS({
    /**
     * Id of Element that should contain the Editor
     */
    holder: "editor",

    /**
     * Available Tools list.
     */
    tools: {
      paragraph: MyParagraph,
      heading: {
        class: Header,
        config: {
          placeholder: "Enter your header",
          levels: [2, 3, 4],
          defaultLevel: 3,
        },
      },
      Marker: Marker,
    },

    /**
     * This Tool will be used as default
     */
    defaultBlock: "paragraph",
    /**
     * Previously saved data that should be rendered
     */
    data: {},
    /**
     * Placeholder
     */
    placeholder: "Let`s write an awesome story!",
    /**
     * Common Inline Toolbar settings
     * - if true (or not specified), the order from 'tool' property will be used (default)
     * - if an array of tool names, this order will be used
     */
    inlineToolbar: true,
    // inlineToolbar: ["link", "marker", "bold", "italic"],

    /**
     * onReady callback
     */
    onReady: () => {
      editorInstance.current = editor;
    },
    /**
     * onChange callback
     */
    // onChange: (api, event) => {
    //   console.log("Now I know that Editor's content changed!", event);
    // },
  });

  const onSave = () => {
    editor
      .save()
      .then((outputData) => {
        console.log("Article data: ", outputData);
        setData(outputData);
        editor.clear();
        editor.destroy();
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  };
  console.log(data);

  return (
    <div className="text-center">
      <h2>Editor Js</h2>
      <div id="editor" className="border max-w-xs mx-auto mb-2"></div>
      <button
        onClick={onSave}
        className="p-1 bg-slate-200 rounded cursor-pointer"
      >
        Save
      </button>
      {data?.blocks?.length > 0 && (
        <div className="border max-w-xs mx-auto mt-5">
          {data?.blocks?.map((dt) => (
            <Fragment key={dt.id}>
              {dt.type === "heading" && dt.data.level === 2 && (
                <h2 className="font-bold text-2xl">{dt.data.text}</h2>
              )}
              {dt.type === "heading" && dt.data.level === 3 && (
                <h3 className="font-bold text-xl">{dt.data.text}</h3>
              )}
              {dt.type === "heading" && dt.data.level === 4 && (
                <h4 className="font-bold text-lg">{dt.data.text}</h4>
              )}
              {dt.type === "paragraph" && <p>{dt.data.text}</p>}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Editor;
