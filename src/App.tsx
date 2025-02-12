import Onboarding from "@/components/onboarding";
import { useState } from "react";
import { motion } from "framer-motion";
import OnboardingDialog from "./components/onboarding-dialog";

const steps = [
  {
    id: 1,
    title: "Teachers on Tigat have multiple ways to earn.",
    subtitle: "Which of the following services are you planning to offer? (Select all that apply)*",
    type: "multiple",
    options: [
      { id: "a", label: "I plan to publish a class on Tigat", value: "class" },
      { id: "b", label: "I plan to offer 1-on-1 Sessions", value: "sessions" },
      { id: "c", label: "I plan to sell one or more digital products", value: "products" },
    ],
    required: true,
  },
  {
    id: 2,
    title: "What category are you interested in teaching?*",
    subtitle:
      "Select the category that best applies to your first offering on Tigat, whether it's a class, 1-on-1, or digital product. You are welcome to offer classes, 1-on-1s, or digital products in other categories in the future.",
    note: "At this time, Tigat is only accepting content from new teachers in the categories listed below. Head to our Teacher Help Center to learn more about what we don't permit for classes, 1-on-1s, or digital products.",
    type: "search",
    options: [{ id: "design", label: "Design", value: "design" }],
    required: true,
  },
  {
    id: 3,
    title: "Your Online Presence: YouTube*",
    subtitle:
      "We'd like to know where else your audience can find you online. We may use this information to identify teachers for potential collaboration opportunities.",
    note: "You do not need to have a social presence to teach on Tigat. Keep in mind your social media accounts cannot violate Tigat's Community Guidelines.",
    type: "single",
    options: [
      { id: "yes", label: "Yes", value: "yes" },
      { id: "no", label: "No", value: "no" },
    ],
  },
  {
    id: 4,
    title: "Your Online Presence: Instagram*",
    subtitle: "Do you have an Instagram account?",
    type: "single",
    options: [
      { id: "yes", label: "Yes", value: "yes" },
      { id: "no", label: "No", value: "no" },
    ],
  },
];

export default function App() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen">
      <motion.button
        onClick={() => setShowDialog(true)}
        className="bg-[#00FF7F] text-black px-8 py-3 rounded-lg font-medium inline-flex items-center gap-2 group "
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Get Started</span>
      </motion.button>
      <OnboardingDialog isOpen={showDialog} onClose={() => setShowDialog(false)} />
    </div>
  );
}
