import ModalPopup from "@/components/commons/ModalPopup";
import { IBorrowItem } from "@/types/Borrow";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import usePeminjamanRejectModal from "./usePeminjamanRejectModal";

interface PeminjamanRejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  refetchBorrow: () => void;
  selectedId: IBorrowItem | null;
  setSelectedId: Dispatch<SetStateAction<IBorrowItem | null>>;
}

const PeminjamanRejectModal: FC<PeminjamanRejectModalProps> = ({
  isOpen,
  onOpenChange,
  onClose,
  refetchBorrow,
  selectedId,
  setSelectedId,
}) => {
  const { mutateRejectBorrow, isPendingRejectBorrow, isSuccessRejectBorrow } =
    usePeminjamanRejectModal();

  const handleOnClose = () => {
    onClose();
    setSelectedId(null);
  };

  useEffect(() => {
    if (isSuccessRejectBorrow) {
      handleOnClose();
      refetchBorrow();
    }
  }, [isSuccessRejectBorrow]);

  return (
    <ModalPopup
      title="Tolak"
      description="Apakah Anda yakin ingin menolak permintaan peminjaman buku ini? Tindakan ini tidak dapat dibatalkan."
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleOnClose}
      onPressCancel={handleOnClose}
      onPressDelete={() => {
        if (!selectedId) return;
        mutateRejectBorrow(`${selectedId?.id}`);
      }}
      disabled={isPendingRejectBorrow}
    />
  );
};

export default PeminjamanRejectModal;
