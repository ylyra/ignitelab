import { format, parseISO, isPast } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { CheckCircle, Lock } from "phosphor-react";
import { Link } from "react-router-dom";

type LessonProps = {
  lesson: {
    title: string;
    slug: string;
    availableAt: string;
    lessonType: "live" | "class";
  };
};

export function Lesson({ lesson }: LessonProps) {
  const isLessonAvailable = isPast(parseISO(lesson.availableAt));

  return (
    <Link
      to={isLessonAvailable ? `/event/lesson/${lesson.slug}` : "#"}
      className="group"
    >
      <time className="text-gray-300 block" dateTime={lesson.availableAt}>
        {format(
          parseISO(lesson.availableAt),
          "EEEE	'•' dd 'de' MMMM '•' H'h'mm",
          {
            locale: ptBR,
          }
        )}
      </time>

      <section className="rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors">
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className="text-xs rounded px-2 py-[0.125rem] text-white border boder-green-300 font-bold uppercase">
            {lesson.lessonType === "live" ? "Ao Vivo" : "Aula Prática"}
          </span>
        </header>
        <strong className="text-gray-200 mt-5 block">{lesson.title}</strong>
      </section>
    </Link>
  );
}
