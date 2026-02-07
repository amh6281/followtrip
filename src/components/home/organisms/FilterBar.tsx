'use client';

import { useSearchParams } from 'next/navigation';
import { FilterGroup, SortGroup } from '../molecules';
import { useUpdateQuery } from '@/hooks/useUpdateQuery';

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
  const searchParams = useSearchParams();
  const { updateQuery } = useUpdateQuery();

  const location = searchParams.get('location');
  const duration = searchParams.get('duration');
  const sort = (searchParams.get('sort') as 'latest' | 'popular') || 'popular';

  return (
    <div className='sticky top-18 z-20 mb-6'>
      <div className='border-border bg-background/90 supports-backdrop-filter:bg-background/80 rounded-2xl border backdrop-blur'>
        <div className='flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-5'>
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
