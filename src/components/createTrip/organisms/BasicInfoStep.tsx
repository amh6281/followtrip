'use client';

import { Select } from '@/components/common';
import { TRIP_LOCATIONS, TRIP_DURATIONS, TRAVEL_TYPES } from '@/constants/trip';

const LOCATION_OPTIONS = TRIP_LOCATIONS.map((loc) => ({
  value: loc,
  label: loc,
}));

const DURATION_OPTIONS = TRIP_DURATIONS.map((d) => ({
  value: d,
  label: d,
}));

const TRAVEL_TYPE_OPTIONS = TRAVEL_TYPES.map((t) => ({
  value: t,
  label: t,
}));

const BasicInfoStep = () => {
  return (
    <div className='space-y-6'>
      <div>
        <label
          htmlFor='title'
          className='text-foreground mb-2 block text-sm font-medium'
        >
          제목 <span className='text-error'>*</span>
        </label>
        <input
          id='title'
          type='text'
          //   value={data.title}
          //   onChange={(e) => onChange({ title: e.target.value })}
          placeholder='예: 부산 해운대 당일치기'
          className='border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary w-full rounded-xl border px-4 py-3 text-base transition-colors outline-none'
        />
      </div>

      <div>
        <label
          htmlFor='location-select'
          className='text-foreground mb-2 block text-sm font-medium'
        >
          여행지 <span className='text-error'>*</span>
        </label>
        <Select
          instanceId='create-trip-location'
          inputId='location-select'
          options={LOCATION_OPTIONS}
          //   value={locationValue}
          //   onChange={(opt) => onChange({ location: opt?.value ?? '' })}
          placeholder='선택하세요'
          isClearable
          size='medium'
        />
      </div>

      <div>
        <label
          htmlFor='duration-select'
          className='text-foreground mb-2 block text-sm font-medium'
        >
          일정 <span className='text-error'>*</span>
        </label>
        <Select
          instanceId='create-trip-duration'
          inputId='duration-select'
          options={DURATION_OPTIONS}
          //   value={durationValue}
          //   onChange={(opt) => onChange({ duration: opt?.value ?? '당일' })}
          placeholder='선택하세요'
          size='medium'
        />
      </div>

      <div>
        <label
          htmlFor='travelType-select'
          className='text-foreground mb-2 block text-sm font-medium'
        >
          여행 유형 <span className='text-error'>*</span>
        </label>
        <Select
          instanceId='create-trip-travelType'
          inputId='travelType-select'
          options={TRAVEL_TYPE_OPTIONS}
          //   value={travelTypeValue}
          //   onChange={(opt) => onChange({ travelType: opt?.value ?? '혼자' })}
          placeholder='선택하세요'
          size='medium'
        />
      </div>
    </div>
  );
};

export default BasicInfoStep;
