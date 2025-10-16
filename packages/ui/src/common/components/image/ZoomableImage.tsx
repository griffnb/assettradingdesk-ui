import { Button } from "@/ui/shadcn/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/ui/shadcn/ui/dialog";
import { cn } from "@/utils/cn";
import { DialogClose } from "@radix-ui/react-dialog";

import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

export default function ZoomableImage({
  src,
  largeSrc = src,
  alt,
  className,
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  largeSrc?: string;
}) {
  if (!src) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          src={src}
          alt={alt || ""}
          className={cn("cursor-pointer", className)}
        />
      </DialogTrigger>

      <DialogContent
        showCloseButton={true}
        className="flex h-[calc(100dvh-100px)] !max-w-fit flex-col gap-2 border-0 bg-transparent p-0 shadow-none"
      >
        <img
          src={largeSrc}
          alt={alt || ""}
          className="h-[calc(100dvh-100px)] object-contain"
        />
        <DialogClose asChild>
          <Button variant="outline" className="mx-auto">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
