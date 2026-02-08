'use client';

import Select, { type StylesConfig } from 'react-select';
import { TRIP_LOCATIONS, TRIP_DURATIONS, TRAVEL_TYPES } from '@/constants/trip';

type SelectOption = { value: string; label: string };

const LOCATION_OPTIONS: SelectOption[] = TRIP_LOCATIONS.map((loc) => ({
  value: loc,
  label: loc,
}));

const DURATION_OPTIONS: SelectOption[] = TRIP_DURATIONS.map((d) => ({
  value: d,
  label: d,
}));

const TRAVEL_TYPE_OPTIONS: SelectOption[] = TRAVEL_TYPES.map((t) => ({
  value: t,
  label: t,
}));

const selectStyles: StylesConfig<SelectOption, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: state.isFocused
      ? 'var(--color-primary)'
      : 'var(--color-border)',
    boxShadow: 'none',
    backgroundColor: 'var(--color-background)',
    '&:hover': {
      borderColor: state.isFocused
        ? 'var(--color-primary)'
        : 'var(--color-border)',
    },
  }),
  valueContainer: (base) => ({
    ...base,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 4,
    paddingBottom: 4,
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    color: 'var(--color-foreground)',
  }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--color-foreground)',
    fontSize: '1rem',
  }),
  placeholder: (base) => ({
    ...base,
    color: 'var(--color-muted-foreground)',
    fontSize: '1rem',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: 'none',
    border: '1px solid var(--color-border)',
  }),
  menuList: (base) => ({
    ...base,
    padding: 4,
  }),
  option: (base, state) => ({
    ...base,
    fontSize: '0.9375rem',
    padding: '12px 16px',
    borderRadius: 8,
    backgroundColor: state.isSelected
      ? 'var(--color-primary)'
      : state.isFocused
        ? 'var(--color-muted)'
        : 'transparent',
    color: state.isSelected
      ? 'var(--color-primary-foreground)'
      : 'var(--color-foreground)',
    cursor: 'pointer',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: 'var(--color-muted-foreground)',
    paddingRight: 12,
    '&:hover': { color: 'var(--color-foreground)' },
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : undefined,
    transition: 'transform 0.2s',
  }),
};

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
          styles={selectStyles}
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
          styles={selectStyles}
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
          styles={selectStyles}
        />
      </div>
    </div>
  );
};

export default BasicInfoStep;
