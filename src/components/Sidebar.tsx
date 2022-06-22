import { gql, useQuery } from "@apollo/client";
import { Lesson } from "./Lesson";

const GET_LESSONS = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      title
      slug
      availableAt
      lessonType
    }
  }
`;

type GetLessonsQueryResponse = {
  lessons: {
    id: string;
    title: string;
    slug: string;
    availableAt: string;
    lessonType: "live" | "class";
  }[];
};

export function Sidebar() {
  const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS);

  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <h2 className="text-white text-2xl font-bold pb-6 mb-6 border-b border-gray-500">
        Cronograma de aulas
      </h2>

      <div className="flex flex-col gap-8">
        {data?.lessons.map((lesson) => (
          <Lesson lesson={lesson} key={lesson.id} />
        ))}
      </div>
    </aside>
  );
}
