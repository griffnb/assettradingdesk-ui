import { observer } from "mobx-react-lite";
import { ReactNode, useState } from "react";

interface CodeBlockProps {
  title: string;
  color?: "light" | "medium" | "dark";
  children: ReactNode;
  collapsable?: boolean;
  collapsed?: boolean;
}

//TODO switch to CVA
export const CodeBlock = observer(function CodeBlock(props: CodeBlockProps) {
  const [show, setShow] = useState(!props.collapsed);
  const BGColorTop = () => {
    if (props.color === "medium") {
      return "bg-gray-500 text-white";
    }
    if (props.color === "dark") {
      return "bg-gray-800 text-white";
    }
    if (props.color === "light") {
      return "bg-gray-300 text-gray-600";
    }
    return "bg-gray-500 text-white";
  };

  const BGColorBody = () => {
    if (props.color === "medium") {
      return "bg-gray-600";
    }
    if (props.color === "dark") {
      return "bg-gray-800 text-white";
    }
    if (props.color === "light") {
      return "bg-gray-200 text-gray-600";
    }
    return "bg-gray-600 text-white";
  };

  const BorderColor = () => {
    if (props.color === "medium") {
      return "border-gray-700";
    }
    if (props.color === "dark") {
      return "border-gray-900";
    }
    if (props.color === "light") {
      return "border-gray-300";
    }
    return "border-gray-700";
  };

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div
      className={`group my-6 overflow-hidden rounded-lg shadow-md ${BGColorTop()}`}
      data-show={show ? "true" : "false"}
    >
      <div className="not-prose">
        <div
          onClick={toggleShow}
          className={`flex flex-wrap items-start gap-x-4 border-b pb-2 ${BorderColor()} ${BGColorBody()} px-4`}
        >
          <h3 className="mr-auto pt-3 text-xs font-semibold">
            {props.title}

            {props.collapsable && (
              <i
                className={`fa fa-chevron-down ml-auto flex size-4 flex-col items-center justify-center transition-transform duration-200 ease-out group-[data-show="true"]:-rotate-180`}
              ></i>
            )}
          </h3>
        </div>
        <div className="group">
          <div className="relative">
            <pre className="overflow-x-auto p-4 text-xs">{props.children}</pre>
          </div>
        </div>
      </div>
    </div>
  );
});
