import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';

type AlertProps = {
  buttonTitle: string;
  title: string;
  message: string;
  cancelTitle?: string;
  confirmTitle?: string;
  onConfirm: () => void;
};

export const ConfirmPopup = (props: AlertProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null); // Initialize cancelRef with null

  const {
    buttonTitle,
    title,
    message,
    cancelTitle = 'キャンセル',
    confirmTitle = 'Ok',
    onConfirm,
  } = props;


  const onCofirmClick = () => {
    onConfirm();
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} size="xs">
        {buttonTitle}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef} // Assign cancelRef to leastDestructiveRef
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{message}</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                size="sm"
              >
                {cancelTitle}
              </Button>
              <Button
                onClick={onCofirmClick}
                ml={3}
                size="xs"
              >
                {confirmTitle}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
