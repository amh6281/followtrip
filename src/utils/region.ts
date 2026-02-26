import { COURSES } from '@/constants/region';

export const findRegionCoursesBySlugs = (slugs: string[]) =>
  slugs.map((slug) => COURSES[slug]).filter(Boolean);
