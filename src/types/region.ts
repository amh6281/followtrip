interface RegionCourseDay {
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
  tips: string[];
}

export interface RegionPlace {
  slug: string;
  name: string;
  address: string;
  hours: string;
  fee: string;
  stayDuration: string;
  bestVisitTime: string;
  tips: string[];
  nearbyPlaceSlugs: string[];
  includedCourseSlugs: string[];
}

export interface Region {
  id: string;
  name: string;
  subtitle: string;
  updatedAt: string;
  recommendedDuration: string;
  averageBudget: string;
  popularThemes: string[];
  weatherTags: string[];
  highlightCourseSlugs: string[];
  placeSlugs: string[];
}
