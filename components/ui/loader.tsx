import { motion } from "framer-motion";

const Loader = () => (
  <motion.div
    className="loader"
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    style={{
      border: "8px solid rgba(255, 255, 255, 0.3)",
      borderTop: "8px solid #3498db",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
    }}
  />
);

export default Loader;
