import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

//https://developers.cloudflare.com/images/transform-images/transform-via-url/
interface SVGProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  icon: string;
}

export const SVG = (props: SVGProps) => {
  const iconPath = `/icons/${props.icon}.svg`;

  return <img {...props} src={iconPath} />;
};
