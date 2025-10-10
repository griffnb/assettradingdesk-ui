import { JSX, useEffect, useRef, useState } from "react";

interface AnimateLoadProps {
  children: JSX.Element | JSX.Element[] | string;
  transitionClass: string;
  startAnimateClass: string;
  endAnimateClass: string;
  animationEnded?: () => void;
}

const AnimateLoad = (props: AnimateLoadProps) => {
  const [animate, setAnimate] = useState(props.startAnimateClass);
  const animationRun = useRef<boolean>(false);
  useEffect(() => {
    if (animationRun.current) {
      return;
    }
    animationRun.current = true;
    // need this tiny delay so that it renders the start animation
    setTimeout(() => {
      setAnimate(props.endAnimateClass);
    }, 10);
  }, []);

  const reset = () => {
    setAnimate(props.startAnimateClass);
    animationRun.current = false;
  };

  return (
    <div
      className={`${props.transitionClass} ${animate}`}
      onAnimationEnd={() => {
        reset();
        if (props.animationEnded) {
          props.animationEnded();
        }
      }}
      onTransitionEnd={() => {
        reset();
        if (props.animationEnded) {
          props.animationEnded();
        }
      }}
    >
      {props.children}
    </div>
  );
};

export default AnimateLoad;
