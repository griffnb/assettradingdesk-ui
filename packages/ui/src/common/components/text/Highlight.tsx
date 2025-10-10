import clsx from "clsx";
import { useMemo } from "react";

type HighlightProps = {
  text: string;
  keywords: string[];
  className?: string;
};

export const Highlight = (props: HighlightProps) => {
  const keywordSet = useMemo(
    () => new Set(props.keywords.map((k) => k.toLowerCase())),
    [props.keywords],
  );

  const parts = useMemo(() => {
    const regex = new RegExp(`\\b(${props.keywords.join("|")})\\b`, "gi");
    return props.text.split(regex).filter(Boolean);
  }, [props.text, props.keywords]);

  return (
    <>
      {parts.map((part, i) =>
        keywordSet.has(part.toLowerCase()) ? (
          <strong key={i} className={clsx("contents", props.className)}>
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
};
