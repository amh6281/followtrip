import { COURSE_IDS, COURSES, courseList } from '../src/content/courses.ts';
import {
  DESTINATIONS,
  DESTINATION_IDS,
  destinationList,
} from '../src/content/destinations.ts';
import { LANDINGS, LANDING_IDS, landingList } from '../src/content/landings.ts';
import { PLACE_IDS, PLACES, placeList } from '../src/content/places.ts';

type Severity = 'error' | 'warning';

type ValidationMessage = {
  severity: Severity;
  scope: string;
  message: string;
};

const messages: ValidationMessage[] = [];

const LEGACY_COURSE_ID_MAP: Record<string, string> = {
  '2n3d-couple': 'seoul-2n3d-couple',
  '1day-city': 'seoul-1day-city',
  'seoul-palace-river-1day': 'seoul-palace-river-1day',
  'busan-east-west-1n2d': 'busan-east-west-1n2d',
  'busan-night-view-1day': 'busan-night-view-1day',
  'jeju-east-coast-1day': 'jeju-east-coast-1day',
  'jeju-west-drive-1day': 'jeju-west-drive-1day',
  'gangneung-coast-1day': 'gangneung-coast-1day',
  'gangneung-cafe-healing-1day': 'gangneung-cafe-healing-1day',
};

const addMessage = (
  severity: Severity,
  scope: string,
  message: string,
): void => {
  messages.push({ severity, scope, message });
};

const addError = (scope: string, message: string): void => {
  addMessage('error', scope, message);
};

const addWarning = (scope: string, message: string): void => {
  addMessage('warning', scope, message);
};

const uniqueSorted = (values: Iterable<string>): string[] =>
  [...new Set(values)].sort((left, right) => left.localeCompare(right, 'ko'));

const sameMembers = (left: string[], right: string[]): boolean =>
  left.length === right.length &&
  left.every((value, index) => value === right[index]);

const derivedCoursesByPlaceId = courseList.reduce<Record<string, string[]>>(
  (acc, course) => {
    for (const day of course.days) {
      for (const item of day.schedule) {
        acc[item.placeId] ??= [];
        acc[item.placeId].push(course.id);
      }
    }

    return acc;
  },
  {},
);

const validateDestinations = (): void => {
  for (const destinationId of DESTINATION_IDS) {
    const destination = DESTINATIONS[destinationId];
    const scope = `destination:${destinationId}`;

    if (destination.slug !== destinationId) {
      addError(scope, `키와 slug가 다릅니다: "${destination.slug}"`);
    }

    for (const placeId of destination.featuredPlaceIds) {
      const place = PLACES[placeId];

      if (!place) {
        addError(
          scope,
          `featuredPlaceIds가 존재하지 않는 place를 참조합니다: "${placeId}"`,
        );
        continue;
      }

      if (place.regionId !== destination.slug) {
        addError(
          scope,
          `featuredPlaceIds "${placeId}"의 regionId(${place.regionId})가 destination과 다릅니다`,
        );
      }
    }

    for (const courseId of destination.featuredCourseIds) {
      const course = COURSES[courseId];

      if (!course) {
        addError(
          scope,
          `featuredCourseIds가 존재하지 않는 course를 참조합니다: "${courseId}"`,
        );
        continue;
      }

      if (course.regionId !== destination.slug) {
        addError(
          scope,
          `featuredCourseIds "${courseId}"의 regionId(${course.regionId})가 destination과 다릅니다`,
        );
      }
    }

    if (!destination.featuredPlaceIds.length) {
      addWarning(scope, 'featuredPlaceIds가 비어 있습니다');
    }

    if (!destination.featuredCourseIds.length) {
      addWarning(scope, 'featuredCourseIds가 비어 있습니다');
    }
  }
};

const validatePlaces = (): void => {
  for (const placeId of PLACE_IDS) {
    const place = PLACES[placeId];
    const scope = `place:${placeId}`;

    if (place.id !== placeId) {
      addError(scope, `키와 id가 다릅니다: "${place.id}"`);
    }

    if (place.slug !== placeId) {
      addWarning(scope, `slug가 id와 다릅니다: "${place.slug}"`);
    }

    if (!DESTINATIONS[place.regionId]) {
      addError(
        scope,
        `regionId가 존재하지 않는 destination을 참조합니다: "${place.regionId}"`,
      );
    }

    for (const nearbyPlaceId of place.nearbyPlaceIds) {
      const nearbyPlace = PLACES[nearbyPlaceId];

      if (!nearbyPlace) {
        addError(
          scope,
          `nearbyPlaceIds가 존재하지 않는 place를 참조합니다: "${nearbyPlaceId}"`,
        );
        continue;
      }

      if (nearbyPlace.regionId !== place.regionId) {
        addError(
          scope,
          `nearbyPlaceIds "${nearbyPlaceId}"의 regionId(${nearbyPlace.regionId})가 현재 place와 다릅니다`,
        );
      }
    }

    const legacyCourseSlugs = place.legacy?.includedCourseSlugs ?? [];
    const normalizedLegacyCourseIds = uniqueSorted(
      legacyCourseSlugs.map(
        (legacyCourseSlug) =>
          LEGACY_COURSE_ID_MAP[legacyCourseSlug] ?? legacyCourseSlug,
      ),
    );
    const derivedCourseIds = uniqueSorted(
      derivedCoursesByPlaceId[placeId] ?? [],
    );

    for (const legacyCourseSlug of legacyCourseSlugs) {
      const resolvedCourseId =
        LEGACY_COURSE_ID_MAP[legacyCourseSlug] ?? legacyCourseSlug;

      if (!COURSES[resolvedCourseId]) {
        addError(
          scope,
          `legacy.includedCourseSlugs가 존재하지 않는 course를 참조합니다: "${legacyCourseSlug}"`,
        );
      }
    }

    if (!sameMembers(normalizedLegacyCourseIds, derivedCourseIds)) {
      addError(
        scope,
        `역참조 불일치: legacy=${JSON.stringify(normalizedLegacyCourseIds)}, derived=${JSON.stringify(derivedCourseIds)}`,
      );
    }
  }
};

const validateCourses = (): void => {
  for (const courseId of COURSE_IDS) {
    const course = COURSES[courseId];
    const scope = `course:${courseId}`;

    if (course.id !== courseId) {
      addError(scope, `키와 id가 다릅니다: "${course.id}"`);
    }

    if (!DESTINATIONS[course.regionId]) {
      addError(
        scope,
        `regionId가 존재하지 않는 destination을 참조합니다: "${course.regionId}"`,
      );
    }

    if (course.tripLength.days !== course.days.length) {
      addError(
        scope,
        `tripLength.days(${course.tripLength.days})와 실제 day 수(${course.days.length})가 다릅니다`,
      );
    }

    if (course.tripLength.nights !== Math.max(course.tripLength.days - 1, 0)) {
      addWarning(
        scope,
        `tripLength.nights(${course.tripLength.nights})가 일반적인 days-1 규칙과 다릅니다`,
      );
    }

    for (const day of course.days) {
      for (const item of day.schedule) {
        const place = PLACES[item.placeId];

        if (!place) {
          addError(
            scope,
            `days.schedule이 존재하지 않는 place를 참조합니다: "${item.placeId}"`,
          );
          continue;
        }

        if (place.regionId !== course.regionId) {
          addError(
            scope,
            `days.schedule의 place "${item.placeId}" regionId(${place.regionId})가 course와 다릅니다`,
          );
        }
      }
    }
  }
};

const validateLandings = (): void => {
  for (const landingId of LANDING_IDS) {
    const landing = LANDINGS[landingId];
    const scope = `landing:${landingId}`;

    if (landing.id !== landingId) {
      addError(scope, `키와 id가 다릅니다: "${landing.id}"`);
    }

    if (!DESTINATIONS[landing.regionId]) {
      addError(
        scope,
        `regionId가 존재하지 않는 destination을 참조합니다: "${landing.regionId}"`,
      );
    }

    for (const courseId of landing.courseIds) {
      const course = COURSES[courseId];

      if (!course) {
        addError(
          scope,
          `courseIds가 존재하지 않는 course를 참조합니다: "${courseId}"`,
        );
        continue;
      }

      if (course.regionId !== landing.regionId) {
        addError(
          scope,
          `courseIds "${courseId}"의 regionId(${course.regionId})가 landing과 다릅니다`,
        );
      }
    }

    for (const placeId of landing.featuredPlaceIds) {
      const place = PLACES[placeId];

      if (!place) {
        addError(
          scope,
          `featuredPlaceIds가 존재하지 않는 place를 참조합니다: "${placeId}"`,
        );
        continue;
      }

      if (place.regionId !== landing.regionId) {
        addError(
          scope,
          `featuredPlaceIds "${placeId}"의 regionId(${place.regionId})가 landing과 다릅니다`,
        );
      }
    }

    for (const relatedLandingId of landing.relatedLandingIds ?? []) {
      const relatedLanding = LANDINGS[relatedLandingId];

      if (!relatedLanding) {
        addError(
          scope,
          `relatedLandingIds가 존재하지 않는 landing을 참조합니다: "${relatedLandingId}"`,
        );
        continue;
      }

      if (relatedLanding.regionId !== landing.regionId) {
        addError(
          scope,
          `relatedLandingIds "${relatedLandingId}"의 regionId(${relatedLanding.regionId})가 landing과 다릅니다`,
        );
      }
    }
  }
};

const validateCollectionSizes = (): void => {
  if (!destinationList.length) {
    addError('summary', 'destination 데이터가 비어 있습니다');
  }

  if (!placeList.length) {
    addError('summary', 'place 데이터가 비어 있습니다');
  }

  if (!courseList.length) {
    addError('summary', 'course 데이터가 비어 있습니다');
  }

  if (!landingList.length) {
    addWarning('summary', 'landing 데이터가 비어 있습니다');
  }
};

const printMessages = (): void => {
  const errors = messages.filter((message) => message.severity === 'error');
  const warnings = messages.filter((message) => message.severity === 'warning');

  if (errors.length === 0 && warnings.length === 0) {
    console.log('Content validation passed.');
    return;
  }

  for (const message of messages) {
    const prefix = message.severity === 'error' ? 'ERROR' : 'WARN';
    console.log(`[${prefix}] ${message.scope} ${message.message}`);
  }

  console.log(
    `Validation finished with ${errors.length} error(s) and ${warnings.length} warning(s).`,
  );
};

const main = (): void => {
  validateCollectionSizes();
  validateDestinations();
  validatePlaces();
  validateCourses();
  validateLandings();
  printMessages();

  const hasErrors = messages.some((message) => message.severity === 'error');
  process.exitCode = hasErrors ? 1 : 0;
};

main();
