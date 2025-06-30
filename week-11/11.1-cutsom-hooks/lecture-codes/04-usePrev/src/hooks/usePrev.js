import { useEffect } from "react";
import { useRef } from "react";

export const usePrev = (value) => {
  console.log("re-render happend with new value " + value);
  const ref = useRef();

  useEffect(() => {
    console.log("updated the current ref to be " + value);
    ref.current = value;
  }, [value]);

  console.log("returned " + ref.current);
  return ref.current;
};

export default usePrev;

//it return first, useeffect gets called later
