/**
  Verifies that a value is `null` or `undefined`, an empty string, or an empty
  array.

  Constrains the rules on `isNone` by returning true for empty strings and
  empty arrays.

  If the value is an object with a `size` property of type number, it is used
  to check emptiness.

  ```javascript
  isEmpty(null);             // true
  isEmpty(undefined);        // true
  isEmpty('');               // true
  isEmpty([]);               // true
  isEmpty({ size: 0});       // true
  isEmpty({});               // false
  isEmpty('Adam Hawkins');   // false
  isEmpty([0,1,2]);          // false
  isEmpty('\n\t');           // false
  isEmpty('  ');             // false
  isEmpty({ size: 1 })       // false
  isEmpty({ size: () => 0 }) // false
  ```

  @method isEmpty
  @static
  @for @ember/utils
  @param {Object} obj Value to test
  @return {Boolean}
  @public
*/
export default function isEmpty(obj: unknown): boolean {
  if (obj === null || obj === undefined) {
    return true;
  }

  if (
    typeof (obj as HasLength).length === "number" &&
    typeof obj !== "function"
  ) {
    return !(obj as HasLength).length;
  }

  if (isProxy(obj)) {
    if (Object.keys(obj).length === 0) {
      return true;
    }
  }

  return false;
}

function isProxy(obj: any): boolean {
  if (!obj || (typeof obj !== "object" && typeof obj !== "function")) {
    return false;
  }

  try {
    // Proxies with the `preventExtensions` trap can block this operation
    Object.preventExtensions(obj);
    return false;
  } catch (e) {
    return true;
  }
}

interface HasLength {
  length: number;
}
