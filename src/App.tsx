import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OnboardingDialog from "./components/onboarding-dialog";
import { addListener, launch } from "devtools-detector";

export default function App() {
  const [showDialog, setShowDialog] = useState(false);


  return (
    <div className="flex items-center justify-center h-screen flex-col gap-8">
      <motion.button
        onClick={() => setShowDialog(true)}
        className="bg-[#00FF7F] text-black px-8 py-3 rounded-lg font-medium inline-flex items-center gap-2 group "
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Get Started</span>
      </motion.button>
      <p>DevTools status: {isOpen ? "open" : "closed"}</p>

      <OnboardingDialog isOpen={showDialog} onClose={() => setShowDialog(false)} />
    </div>
  );
}
