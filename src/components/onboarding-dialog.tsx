"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleX } from "lucide-react";
import { DialogState, Question } from "@/lib/types";

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
      let newAnswers: string[];

      if (questions[prev.currentQuestion]?.type === "multiple") {
        newAnswers =
          Array.isArray(currentAnswers) && currentAnswers.includes(answer as string)
            ? currentAnswers.filter((a) => a !== answer)
            : [...currentAnswers, answer as string];
      } else {
        newAnswers = [answer as string];
      }

      const updatedAnswers = { ...prev.answers, [questionId]: newAnswers };
      return {
        ...prev,
        answers: updatedAnswers,
        progress: (Object.keys(updatedAnswers).length / questions.length) * 100,
      };
    });
  };

  // const canProceed = (questionId: number) => {
  //   const question = questions.find((q) => q.id === questionId);
  //   if (!question) return false;
  //   const answer = state.answers[question.id];
  //   return !question.required || (answer && answer.length > 0);
  // };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div>
            <button onClick={onClose}>
              <CircleX />
            </button>
            <AnimatePresence mode="wait">
              <motion.div key={state.currentQuestion}>
                {state.currentQuestion < questions.length ? (
                  <>
                    <h2>{questions[state.currentQuestion]?.title}</h2>
                    {questions[state.currentQuestion]?.subtitle && (
                      <p>{questions[state.currentQuestion].subtitle}</p>
                    )}
                    {questions[state.currentQuestion]?.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() =>
                          handleAnswer(questions[state.currentQuestion].id, option.value)
                        }
                      >
                        {option.label}
                      </button>
                    ))}
                  </>
                ) : (
                  <h2>Thank you for answering!</h2>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
