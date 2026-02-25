interface BadgeProps {
  text: string;
}

const Badge = ({ text }: BadgeProps) => {
  return (
    <p className='text-primary border-primary/30 bg-primary/10 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase'>
      {text}
    </p>
  );
};

export default Badge;
