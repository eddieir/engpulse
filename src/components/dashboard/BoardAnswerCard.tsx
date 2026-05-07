import { StatusDot } from "@/components/shared/StatusBadge";
import type { BoardAnswer } from "@/types";

interface BoardAnswerCardProps {
  answer: BoardAnswer;
}

export function BoardAnswerCard({ answer }: BoardAnswerCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
      <div className="flex items-start gap-3">
        <StatusDot status={answer.status} className="mt-1" />
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1.5">{answer.question}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{answer.answer}</p>
        </div>
      </div>
    </div>
  );
}
