import { AnimatePresence, motion } from "framer-motion";

import { useRouter } from "next/router";

const PageTransition = ({
  children,
  transition = {
    pageInitial: { opacity: 0, scale: 0.995, y: 30 },
    pageAnimate: { opacity: 1, scale: 1, y: 0 },
    pageExit: { backgroundColor: "white", opacity: 0 },
  },
}) => {
  const router = useRouter();
  return (
    <AnimatePresence>
      <motion.div
        key={router.query}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
