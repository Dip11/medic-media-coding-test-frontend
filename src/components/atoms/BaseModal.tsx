import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { BaseComponent } from 'interfaces/component';
import { ReactNode } from 'react';

type TSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface IBaseModal {
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  size?: TSize;
  isOpen: boolean;
  onOpen?: (e: unknown) => void;
  onClose: () => void;
}

export const BaseModal = (props: IBaseModal): BaseComponent => {
  const { header, footer, children, size, isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};
