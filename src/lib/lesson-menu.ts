export type LessonMenuItem = {
  title: string;
  href: string;
};

export type LessonMenuGroup = {
  name: string;
  lessons: LessonMenuItem[];
};
