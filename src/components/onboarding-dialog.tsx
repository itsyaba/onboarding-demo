"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleX, ChevronUp, ChevronDown } from "lucide-react";
import type { Question, DialogState } from "../types";

const questions: Question[] = [
  {
    id: 1,
    title: "Teachers on Tigat have multiple ways to earn.",
    subtitle: "Which of the following services are you planning to offer? (Select all that apply)",
    type: "multiple",
    options: [
      { id: "a", label: "I plan to publish a class on Tigat", value: "class" },
      { id: "b", label: "I plan to offer 1-on-1 Sessions", value: "sessions" },
      { id: "c", label: "I plan to sell digital products", value: "products" },
    ],
    required: true,
  },
  {
    id: 2,
    title: "What category are you interested in teaching?*",
    subtitle:
      "Select the category that best applies to your first offering on Tigat, whether it's a class, 1-on-1, or digital product.",
    type: "single",
    options: [
      { id: "design", label: "Design", value: "design" },
      { id: "webdev", label: "Web Development", value: "webdev" },
      { id: "marketing", label: "Digital Marketing", value: "marketing" },
      { id: "photo", label: "Photography", value: "photo" },
      { id: "writing", label: "Creative Writing", value: "writing" },
    ],
    required: true,
  },
  {
    id: 3,
    title: "Your Online Presence: YouTube*",
    subtitle: "We'd like to know where else your audience can find you online.",
    type: "single",
    required: true,
    options: [
      { id: "yes", label: "Yes, I have a YouTube channel", value: "yes" },
      { id: "no", label: "No, I don't have a YouTube channel", value: "no" },
    ],
  },
  {
    id: 4,
    title: "Your Online Presence: Instagram*",
    subtitle: "Do you have an Instagram account?",
    type: "single",
    required: true,
    options: [
      { id: "yes", label: "Yes, I have an Instagram account", value: "yes" },
      { id: "no", label: "No, I don't have an Instagram account", value: "no" },
    ],
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingDialog({ isOpen, onClose }: Props) {
  const [state, setState] = useState<DialogState>({
    isOpen: false,
    currentQuestion: 0,
    answers: {},
    progress: 0,
  });

  const handleAnswer = (questionId: number, answer: string | string[]) => {
    setState((prev) => {
      const currentAnswers = prev.answers[questionId] || [];
      let newAnswers;

      if (questions[prev.currentQuestion].type === "multiple") {
        newAnswers = currentAnswers.includes(answer as string)
          ? currentAnswers.filter((a) => a !== answer)
          : [...currentAnswers, answer];
      } else {
        newAnswers = [answer];
      }

      const updatedAnswers = { ...prev.answers, [questionId]: newAnswers };
      return {
        ...prev,
        answers: updatedAnswers,
        progress: (Object.keys(updatedAnswers).length / questions.length) * 100,
      };
    });
  };

  const canProceed = (questionId: number) => {
    const question = questions[questionId];
    const answer = state.answers[question.id];
    return !question.required || (answer && answer.length > 0);
  };

  const handleNext = () => {
    if (state.currentQuestion < questions.length - 1) {
      setState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    } else {
      // Log all answers when the questionnaire is complete
      console.log("All answers:", state.answers);
      onClose();
    }
  };

  const handlePrevious = () => {
    if (state.currentQuestion > 0) {
      setState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/10 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-[#002333] rounded-xl w-9/12  h-[90vh] overflow-hidden relative"
          >
            {/* Progress bar */}
            <div className="h-1 bg-gray-800">
              <motion.div
                className="h-full bg-[#00FF7F]"
                initial={{ width: 0 }}
                animate={{ width: `${state.progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Content */}
            <div className="p-6 h-[calc(100%-0.25rem)] flex items-center justify-center">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <CircleX className="size-8" />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={state.currentQuestion}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="space-y-6 w-11/12 mx-auto flex items-start justify-between flex-col  h-4/6"
                >
                  {state.currentQuestion < questions.length ? (
                    <>
                      {/* Question */}
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                          {questions[state.currentQuestion].title}
                        </h2>
                        {questions[state.currentQuestion].subtitle && (
                          <p className="text-gray-400">
                            {questions[state.currentQuestion].subtitle}
                          </p>
                        )}
                      </div>

                      {/* Options */}
                      <div className="space-y-3 w-full ">
                        {questions[state.currentQuestion].options.map((option) => (
                          <button
                            key={option.id}
                            onClick={() =>
                              handleAnswer(questions[state.currentQuestion].id, option.value)
                            }
                            className={`w-full text-left p-4 rounded-lg border-2 transition-colors hover:border-[#00FF7F] hover:bg-[#00FF7F]/10 ${
                              (state.answers[questions[state.currentQuestion].id] || []).includes(
                                option.value
                              )
                                ? "border-[#00FF7F] bg-[#00FF7F]/10"
                                : "border-gray-700"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-between pt-4 w-full">
                        <div className="flex items-center gap-6 ">
                          <button
                            onClick={handlePrevious}
                            disabled={state.currentQuestion === 0}
                            className="text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ChevronUp className="size-8" />
                          </button>
                          <button
                            onClick={handleNext}
                            disabled={!canProceed(state.currentQuestion)}
                            className="text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ChevronDown className="size-8" />
                          </button>
                        </div>

                        <button
                          onClick={handleNext}
                          disabled={!canProceed(state.currentQuestion)}
                          className="bg-[#00FF7F] text-black px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {state.currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-white mb-4">
                        Thank you for answering!
                      </h2>
                      <p className="text-gray-400">Your responses have been recorded.</p>
                      <button
                        onClick={onClose}
                        className="mt-8 bg-[#00FF7F] text-black px-6 py-2 rounded-lg font-medium"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
