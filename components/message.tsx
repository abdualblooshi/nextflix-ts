import { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MessageProps {
  message: string;
  setMessageVisible: (visible: boolean) => void;
  messageVisible: boolean;
  status: string;
}

const Message: React.FC<MessageProps> = ({
  message,
  setMessageVisible,
  messageVisible,
  status,
}) => {
  const close = useCallback(() => {
    setMessageVisible(false);
  }, [setMessageVisible]);

  // auto close message after 5 seconds
  useEffect(
    () => {
      const timer = setTimeout(() => {
        setMessageVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <AnimatePresence>
      {messageVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ delay: 0.2 }}
          className="fixed top-12 left-0 w-full flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${
              status === "success" ? "bg-green-600" : "bg-red-600"
            } w-full lg:w-1/2 h-16 rounded-md flex justify-between items-center px-4`}
          >
            <p className="text-white text-md">{message}</p>
            <button onClick={close} className="text-white text-md">
              X
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Message;
