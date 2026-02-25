import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr';

interface SearchInputProps {
  placeholder?: string;
  disabled?: boolean;
}

const SearchInput = ({
  placeholder = '검색어를 입력하세요',
  disabled = false,
}: SearchInputProps) => {
  return (
    <div className='border-border bg-background/90 flex w-full max-w-xl items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm backdrop-blur'>
      <MagnifyingGlassIcon className='text-muted-foreground size-5' />
      <input
        placeholder={placeholder}
        className='placeholder:text-muted-foreground text-foreground w-full bg-transparent text-sm outline-none'
        disabled={disabled}
      />
    </div>
  );
};

export default SearchInput;
