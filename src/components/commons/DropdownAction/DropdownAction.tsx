import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { FC } from "react";
import { CiMenuKebab } from "react-icons/ci";

interface DropdownActionProps {
  detailLabel?: string;
  deleteLabel?: string;
  onPressButtonDetail: () => void;
  onPressButtonDelete?: () => void;
  hideButtonDelete?: boolean;
}

const DropdownAction: FC<DropdownActionProps> = ({
  detailLabel,
  deleteLabel,
  onPressButtonDetail,
  onPressButtonDelete,
  hideButtonDelete,
}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="light">
          <CiMenuKebab className="text-default-700" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="detail-event-button" onPress={onPressButtonDetail}>
          {detailLabel}
        </DropdownItem>
        {!hideButtonDelete ? (
          <DropdownItem
            key="delete-event-button"
            className="text-danger-500"
            onPress={onPressButtonDelete}
          >
            {deleteLabel}
          </DropdownItem>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownAction;
