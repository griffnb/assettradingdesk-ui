import { observer } from "mobx-react-lite";
import { IColumn, TableCellProps } from "../../types/columns";

export interface ImageCellColumn<T extends object> extends IColumn<T> {
  imageField: string;
  className?: string;
}
interface ImageCellProps<T extends object> extends TableCellProps<T> {
  column: ImageCellColumn<T>;
}

const placeholderImage = "/img/placeholder.png";

const ImageCell = observer(<T extends {}>(props: ImageCellProps<T>) => {
  let imageURL = props.record[props.column.imageField as keyof T] as string;
  if (!imageURL || imageURL === "") {
    imageURL = placeholderImage;
  }

  return <img alt="" src={imageURL} className={props.column.className} />;
});

export default ImageCell;
