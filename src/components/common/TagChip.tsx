interface TagChipProps {
  text: string;
}

const TagChip = ({ text }: TagChipProps) => {
  return (
    <span className='border-border/80 from-background to-muted/40 text-muted-foreground inline-flex items-center rounded-full border bg-linear-to-r px-3 py-1.5 text-xs font-medium'>
      {text}
    </span>
  );
};

export default TagChip;
