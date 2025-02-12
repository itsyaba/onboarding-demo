import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, X, Check, ArrowRightFromLine } from "lucide-react";
import { OnboardingProps } from "@/lib/types";

export default function Onboarding({ steps, onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState<Record<number, string[]>>({});
  const [searchValue, setSearchValue] = useState("");

  const handleSelect = (stepId: number, optionValue: string) => {
    setResults((prev) => {
      const currentSelections = prev[stepId] || [];
      const step = steps.find((s) => s.id === stepId);

      if (step?.type === "multiple") {
        const newSelections = currentSelections.includes(optionValue)
          ? currentSelections.filter((v) => v !== optionValue)
          : [...currentSelections, optionValue];
        return { ...prev, [stepId]: newSelections };
      }

      return { ...prev, [stepId]: [optionValue] };
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete(results);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-[#002333] text-white flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800">
        <motion.div
          className="h-full bg-[#00FF7F]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.9 }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{
              type: "spring",
              // stiffness: 300,
              stiffness: 300,
              damping: 30,
            }}
            className="w-full max-w-2xl "
          >
            <div className="flex items-center justify-start gap-3 mb-3">
              <div className="flex items-center gap-2 text-[#00FF7F] mb-4">
                <span className="text-xl font-bold">{currentStepData.id}</span>
                <ArrowRightFromLine className="size-5" />
              </div>

              <h2 className="text-xl font-bold mb-4 tracking-wide">{currentStepData.title}</h2>
            </div>
            {currentStepData.subtitle && (
              <p className="text-gray-400 mb-6">{currentStepData.subtitle}</p>
            )}

            {currentStepData.note && (
              <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-400">{currentStepData.note}</p>
              </div>
            )}

            <div className="space-y-3">
              {currentStepData.type === "search" ? (
                <div className="relative">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-[#00FF7F] p-3 outline-none"
                    placeholder="Search categories..."
                  />
                </div>
              ) : (
                currentStepData.options.map((option) => {
                  const isSelected = (results[currentStepData.id] || []).includes(option.value);
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => handleSelect(currentStepData.id, option.value)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border-2 
                            hover:border-[#00FF7F] hover:bg-[#00FF7F]/10
                            ${isSelected ? "border-[#00FF7F] bg-[#00FF7F]/10" : "border-gray-700"}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-sm">{option.label}</span>
                      </span>
                      {isSelected && <Check className="h-5 w-5 text-[#00FF7F]" />}
                    </motion.button>
                  );
                })
              )}
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-end items-center">
              <button
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
                className="bg-[#00FF7F] text-black font-medium px-6 py-2 rounded-sm disabled:bg-[#00FF7F]/40"
              >
                NEXT
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Close button */}
      {/* <button className="fixed top-6 right-6 text-gray-400 hover:text-white transition-colors">
        <X className="h-6 w-6" />
      </button> */}
      <div className="bg-[#00FF7F] flex items-end justify-end w-24 mx-auto  gap-2 px-4 py-2 rounded-sm mb-2 mr-2">
        <button
          onClick={handlePrevious}
          className="text-gray-900 hover:text-gray-600 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
          disabled={currentStep === 0}
        >
          <ChevronUp className="size-8" />
        </button>{" "}
        <button
          onClick={handleNext}
          className="text-gray-900 hover:text-gray-600 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
          disabled={currentStep === steps.length - 1}
        >
          <ChevronDown className="size-8" />
        </button>
      </div>
    </div>
  );
}
