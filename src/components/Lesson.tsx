import clsx from "clsx";
import { format, parseISO, isPast } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { CheckCircle, Lock } from "phosphor-react";
import { Link, useParams } from "react-router-dom";

type LessonProps = {
  lesson: {
    title: string;
    slug: string;
    availableAt: string;
    lessonType: "live" | "class";
  };
};

export function Lesson({ lesson }: LessonProps) {
  const { slug } = useParams<{ slug: string }>();
  const isLessonAvailable = isPast(parseISO(lesson.availableAt));
  const isCurrentLesson = lesson.slug === slug;

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

      <section
        className={clsx(
          "rounded border  p-4 mt-2 group-hover:border-green-500 transition-colors",
          {
            "border-gray-500": !isCurrentLesson,
            "border-green-500 bg-green-500": isCurrentLesson,
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={clsx("text-sm  font-medium flex items-center gap-2", {
                "text-blue-500": !isCurrentLesson,
                "text-white": isCurrentLesson,
              })}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span
            className={clsx(
              "text-xs rounded px-2 py-[0.125rem] text-white border  font-bold uppercase",
              {
                "boder-green-300": !isCurrentLesson,
                "border-white": isCurrentLesson,
              }
            )}
          >
            {lesson.lessonType === "live" ? "Ao Vivo" : "Aula Prática"}
          </span>
        </header>
        <strong
          className={clsx("mt-5 block", {
            "text-gray-200": !isCurrentLesson,
            "text-white": isCurrentLesson,
          })}
        >
          {lesson.title}
        </strong>
      </section>
    </Link>
  );
}
