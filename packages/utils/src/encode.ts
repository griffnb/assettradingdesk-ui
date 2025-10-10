import { isNumeric } from "./numbers";

export const idEncode = (id: number): string => {
  id = id * 1234567;

  const c = "izsRQwNvVEmAXLJDquMIjWxbZPYUrKfkBchptaGOTgSyoHnFdCle";
  const idString = id.toString();
  let x = "";
  let n = "";
  let y = "";
  for (let i = 0; i < idString.length; i++) {
    x = x.concat(idString.charAt(i));

    if (!isNumeric(x)) {
      n = n.concat(x);
      x = "";
      continue;
    }

    const xNumber = parseFloat(x);

    if (idString.charAt(i + 1) != null && isNumeric(idString.charAt(i + 1))) {
      y = x.concat(idString.charAt(i + 1));
    } else {
      y = x;
    }

    const yNumber = parseFloat(y);

    if (yNumber > c.length - 1 || xNumber == 0) {
      n = n.concat(c.charAt(xNumber));
      x = "";
    } else if (yNumber >= 10) {
      n = n.concat(c.charAt(yNumber));
      i++;
      x = "";
    } else {
      n = n.concat(c.charAt(yNumber));
      x = "";
    }
  }
  return n;
};

export const idDecode = (encString: string): number => {
  // was already a number
  if (parseFloat(encString) >= 0) {
    return parseFloat(encString);
  }

  const c = "izsRQwNvVEmAXLJDquMIjWxbZPYUrKfkBchptaGOTgSyoHnFdCle";
  let n = "";
  for (let i = 0; i < encString.length; i++) {
    if (c.indexOf(encString.charAt(i)) < 0) {
      n = n.concat(encString.charAt(i));
      continue;
    }
    n = n.concat(c.indexOf(encString.charAt(i)).toString());
  }

  return parseInt(n) / 1234567;
};
