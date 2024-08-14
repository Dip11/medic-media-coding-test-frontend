import { BaseComponent } from 'interfaces/component';
import { Image } from '@chakra-ui/react';
import logo from 'assets/logo.gif';

type TObjectFit =
  | 'contain'
  | 'cover'
  | 'fill'
  | 'none'
  | 'contain'
  | 'scale-down';

interface ILogo {
  boxSize?: string | number;
  width?: string | number;
  objectFit?: TObjectFit;
}

export const Logo = (props: ILogo): BaseComponent => {
  const { boxSize, width, objectFit } = props;

  return (
    <Image
      boxSize={boxSize}
      width={width}
      objectFit={objectFit}
      src={logo}
      alt="Logo"
    />
  );
};
