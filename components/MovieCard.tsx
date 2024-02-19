import Image from 'next/image'

interface MovieCardProp {
  data: Record<string, any>;
}

const MovieCard = ({ data }: MovieCardProp) => {
  return (
    <div className="group bg-zinc-900 col-span-1 h-[12vw] border relative">
     <Image width={100} height={100} src={data.thumbnailUrl} alt='poster' className='w-full h-[12vw]'/>
    </div>
  );
};

export default MovieCard;
