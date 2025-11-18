import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { FC, ReactNode } from "react";

interface ModalPopupProps {
  children?: ReactNode;
  title: string;
  description: string;
  disabled: boolean;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose?: () => void;
  onPressDelete: () => void;
  onPressCancel: () => void;
}

const ModalPopup: FC<ModalPopupProps> = ({
  children,
  title,
  description,
  disabled,
  isOpen,
  onOpenChange,
  onClose,
  onPressDelete,
  onPressCancel,
}) => {
  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div className="flex flex-col justify-center gap-2">
            <p className="text-medium font-semibold">{description}</p>
            {children}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={onPressCancel}
            color="primary"
            variant="bordered"
            disabled={disabled}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            onPress={onPressDelete}
            disabled={disabled}
          >
            {disabled ? <Spinner size="sm" color="white" /> : `${title}`}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalPopup;
