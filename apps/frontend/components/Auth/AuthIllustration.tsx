import { useAppColorscheme } from 'hooks/colorscheme';
import PeepDark from 'assets/peeps/signin/peep-dark.svg';
import Peep from 'assets/peeps/signin/peep.svg';
import Image from 'next/image';

export const AuthIllustration = (props) => {
  const { isDark } = useAppColorscheme();
  const illustration = isDark ? PeepDark : Peep;

  return (
    <div {...props}>
      <Image
        src={illustration}
        alt="Peep"
        objectFit="contain"
        className="signin-hero"
        width={620}
        height={620}
      />
    </div>
  );
};
