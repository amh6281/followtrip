'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FilterGroup, SortGroup } from '../molecules';

const LOCATIONS = [
  '전체',
  '서울',
  '부산',
  '제주',
  '경주',
  '전주',
  '강릉',
  '여수',
  '인천',
];
const DURATIONS = ['전체', '당일', '1박2일', '2박3일'];

const FilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const location = searchParams.get('location');
  const duration = searchParams.get('duration');
  const sort = (searchParams.get('sort') as 'latest' | 'popular') || 'popular';

  const updateQuery = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === '전체') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='sticky top-0 z-20 mb-6'>
      <div className='border-border bg-background/80 supports-backdrop-filter:bg-background/60 rounded-xl border p-4 backdrop-blur'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          {/* 필터 영역 */}
          <div className='flex flex-col gap-3 md:flex-row md:items-center md:gap-6'>
            <FilterGroup
              label='지역'
              options={LOCATIONS}
              value={location}
              onChange={(value) => updateQuery('location', value)}
            />

            <FilterGroup
              label='일정'
              options={DURATIONS}
              value={duration}
              onChange={(value) => updateQuery('duration', value)}
            />
          </div>

          {/* 정렬 */}
          <SortGroup
            value={sort}
            onChange={(value) => updateQuery('sort', value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
