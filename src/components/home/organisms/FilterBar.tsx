'use client';

import { FilterGroup, SortGroup } from '../molecules';

const FilterBar = () => {
  const locations = [
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

  const durations = ['전체', '당일', '1박2일', '2박3일'];

  return (
    <div className='sticky top-0 z-20 mb-6'>
      <div className='border-border bg-background/80 supports-backdrop-filter:bg-background/60 rounded-xl border p-4 backdrop-blur'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          {/* 필터 영역 */}
          <div className='flex flex-col gap-3 md:flex-row md:items-center md:gap-6'>
            <FilterGroup label='지역' options={locations} />

            <FilterGroup label='일정' options={durations} />
          </div>

          {/* 정렬 */}
          <SortGroup />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
