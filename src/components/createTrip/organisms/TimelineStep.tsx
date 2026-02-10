'use client';

import {
  PlusIcon,
  TrashIcon,
  CaretUpIcon,
  CaretDownIcon,
} from '@phosphor-icons/react/dist/ssr';
import { Select } from '@/components/common';
import { TRANSPORT_OPTIONS } from '@/constants/trip';

const TRANSPORT_SELECT_OPTIONS = TRANSPORT_OPTIONS.map((t) => ({
  value: t,
  label: t,
}));

const TimelineStep = () => {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <p className='text-muted-foreground text-sm'>
          일정 순서대로 스텝을 추가하세요. 비용·소요 시간은 자동으로 합산됩니다.
        </p>
      </div>

      <ul className='space-y-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <li
            key={index}
            className='border-border bg-muted/30 rounded-2xl border p-5'
          >
            <div className='mb-4 flex items-center justify-between'>
              <span className='text-foreground font-semibold'>
                {index + 1}. 스텝
              </span>
              <div className='flex items-center gap-1'>
                <button
                  type='button'
                  disabled={index === 0}
                  className='text-muted-foreground hover:text-foreground rounded-lg p-1.5 transition-colors disabled:opacity-40'
                  aria-label='위로 이동'
                >
                  <CaretUpIcon size={20} weight='bold' />
                </button>
                <button
                  type='button'
                  disabled={index === 2}
                  className='text-muted-foreground hover:text-foreground rounded-lg p-1.5 transition-colors disabled:opacity-40'
                  aria-label='아래로 이동'
                >
                  <CaretDownIcon size={20} weight='bold' />
                </button>
                <button
                  type='button'
                  className='text-error hover:bg-error/10 rounded-lg p-1.5 transition-colors'
                  aria-label='삭제'
                >
                  <TrashIcon size={20} weight='bold' />
                </button>
              </div>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <div>
                <label className='text-foreground mb-1.5 block text-xs font-medium'>
                  도착 시각
                </label>
                <input
                  type='time'
                  defaultValue='09:00'
                  className='border-border bg-background text-foreground focus:border-primary w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none'
                />
              </div>
              <div className='sm:col-span-1'>
                <label className='text-foreground mb-1.5 block text-xs font-medium'>
                  장소명 <span className='text-error'>*</span>
                </label>
                <input
                  type='text'
                  placeholder='예: 해운대 해수욕장'
                  className='border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none'
                />
              </div>
            </div>

            <div className='mt-3 grid gap-4 sm:grid-cols-3'>
              <div>
                <label className='text-foreground mb-1.5 block text-xs font-medium'>
                  이동 수단
                </label>
                <Select
                  instanceId={`transport-select-${index}`}
                  options={TRANSPORT_SELECT_OPTIONS}
                  defaultValue={TRANSPORT_SELECT_OPTIONS[0]}
                  size='small'
                />
              </div>
              <div>
                <label className='text-foreground mb-1.5 block text-xs font-medium'>
                  비용 (원)
                </label>
                <input
                  type='number'
                  min={0}
                  placeholder='0'
                  className='border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none'
                />
              </div>
              <div>
                <label className='text-foreground mb-1.5 block text-xs font-medium'>
                  머문 시간 (분)
                </label>
                <input
                  type='number'
                  min={0}
                  placeholder='60'
                  className='border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none'
                />
              </div>
            </div>

            <div className='mt-3'>
              <label className='text-foreground mb-1.5 block text-xs font-medium'>
                메모 (선택)
              </label>
              <input
                type='text'
                placeholder='한 줄 메모'
                className='border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none'
              />
            </div>

            <div className='mt-3'>
              <label className='text-foreground mb-1.5 block text-xs font-medium'>
                사진 URL (선택)
              </label>
              <input
                type='url'
                placeholder='https://...'
                className='border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none'
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Length === 0  */}
      <div className='border-border bg-muted/20 rounded-2xl border border-dashed py-12 text-center'>
        <p className='text-muted-foreground mb-4 text-sm'>
          스텝을 추가하면 일정이 만들어져요.
        </p>
        <button
          type='button'
          className='bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium'
        >
          <PlusIcon size={18} weight='bold' />
          스텝 추가
        </button>
      </div>
    </div>
  );
};

export default TimelineStep;
