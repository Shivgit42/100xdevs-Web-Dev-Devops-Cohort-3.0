import { useEffect } from "react";
import { useRef } from "react";

export const usePrev = (value) => {
  console.log("current value " + value);
  const ref = useRef();

  useEffect(() => {
    console.log("ref updated to value " + value);
    ref.current = value;
  }, [value]);

  console.log("returned " + ref.current);
  return ref.current;
};

//? alternate option
/*
export const usePrev = (value, initial) => {
  const ref = useRef({target: value, previous: initial})

  if(ref.current.target !== value){
    ref.current.previous = ref.current.target
    ref.current.target = value
  }

  return ref.current.previous
}
  */
