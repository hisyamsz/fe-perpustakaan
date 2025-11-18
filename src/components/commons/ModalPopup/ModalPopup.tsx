import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { FC } from "react";

interface ModalPopupProps {
  title: string;
  description: string;
  disabled: boolean;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onPressDelete: () => void;
  onPressCancel: () => void;
}

const ModalPopup: FC<ModalPopupProps> = ({
  title,
  description,
  disabled,
  isOpen,
  onOpenChange,
  onPressDelete,
  onPressCancel,
}) => {
  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div className="text-medium font-semibold">{description}</div>
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
