import ModalPopup from "@/components/commons/ModalPopup";
import { IBorrowItem } from "@/types/Borrow";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import usePeminjamanValidateModal from "./usePeminjamanValidateModal";
import { convertTime } from "@/utils/date";

interface PeminjamanValidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  refetchBorrow: () => void;
  selectedId: IBorrowItem | null;
  setSelectedId: Dispatch<SetStateAction<IBorrowItem | null>>;
}

const PeminjamanValidateModal: FC<PeminjamanValidateModalProps> = ({
  isOpen,
  onOpenChange,
  onClose,
  refetchBorrow,
  selectedId,
  setSelectedId,
}) => {
  const { mutateBorrowBook, isPendingBorrowBook, isSuccessBorrowBook } =
    usePeminjamanValidateModal();

  const handleOnClose = () => {
    onClose();
    setSelectedId(null);
  };

  useEffect(() => {
    if (isSuccessBorrowBook) {
      onClose();
      setSelectedId(null);
      refetchBorrow();
    }
  }, [isSuccessBorrowBook]);

  return (
    <ModalPopup
      title="Konfirmasi Peminjaman"
      description={
        selectedId
          ? `Anda yakin ingin memvalidasi peminjaman buku "${selectedId?.buku?.judul}" oleh "${selectedId?.user?.nama}" pada tanggal ${convertTime(`${selectedId?.tanggal_pinjam}`)}?`
          : ""
      }
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleOnClose}
      onPressCancel={handleOnClose}
      onPressDelete={() => mutateBorrowBook(`${selectedId?.id}`)}
      disabled={isPendingBorrowBook}
    />
  );
};

export default PeminjamanValidateModal;
