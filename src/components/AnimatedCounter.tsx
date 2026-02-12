import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: string;
  label: string;
}

const AnimatedCounter = ({ target, label }: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  const numericPart = parseInt(target.replace(/[^0-9]/g, ""), 10);
  const suffix = target.replace(/[0-9,]/g, "");

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericPart));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, numericPart]);

  const display = count.toLocaleString() + suffix;

  return (
    <div ref={ref}>
      <div className="text-2xl font-bold text-white tracking-tight">
        {display}
      </div>
      <div className="text-sm text-white/40 mt-0.5">{label}</div>
    </div>
  );
};

export default AnimatedCounter;
