export interface Question {
  id: number;
  title: string;
  subtitle?: string;
  type: "multiple" | "single" | "text";
  options?: {
    id: string;
    label: string;
    value: string;
  }[];
  required?: boolean;
}

export interface DialogState {
  isOpen: boolean;
  currentQuestion: number;
  answers: Record<number, string | string[]>;
  progress: number;
}
