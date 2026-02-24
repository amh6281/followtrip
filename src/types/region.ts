export interface RegionCourseDay {
  title: string;
  schedule: Array<{ time: string; placeId: string }>;
}

export interface RegionCourse {
  slug: string;
  title: string;
  summary: string;
  budgetRange: string;
  difficulty: string;
  target: string;
  days: RegionCourseDay[];
  faq: string[];
}
