import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";

type AnimatedCounterProps = {
  from: number;
  to: number;
};

export const Counter = ({ from, to }: AnimatedCounterProps) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration: 1 });
    }
  }, [count, inView, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};
