interface TitleProps {
  text: string;
}

const Title = ({ text }: TitleProps) => {
  return (
    <h1 className='text-foreground mb-6 text-[26px] font-semibold max-md:text-2xl'>
      {text}
    </h1>
  );
};

export default Title;
