import ModalPopup from "@/components/commons/ModalPopup";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import useDeleteDataBukuModal from "./useDeleteDataBukuModal";
import { IBook } from "@/types/Book";

interface DeleteDataBukuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchBook: () => void;
  selectedId: IBook | null;
  setSelectedId: Dispatch<SetStateAction<IBook | null>>;
}

const DeleteDataBukuModal: FC<DeleteDataBukuModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchBook,
  selectedId,
  setSelectedId,
}) => {
  const {
    mutateDeleteDataBuku,
    isPendingDeleteDataBuku,
    isSuccessDeleteDataBuku,
  } = useDeleteDataBukuModal();

  const handleOnClose = () => {
    onClose();
    setSelectedId(null);
  };

  useEffect(() => {
    if (isSuccessDeleteDataBuku) {
      onClose();
      refetchBook();
      setSelectedId(null);
    }
  }, [isSuccessDeleteDataBuku]);

  return (
    <ModalPopup
      title="Hapus Buku"
      description="Apakah Anda yakin ingin menghapus buku ini?"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleOnClose}
      onPressCancel={handleOnClose}
      onPressDelete={() => mutateDeleteDataBuku(`${selectedId?.id}`)}
      disabled={isPendingDeleteDataBuku}
    />
  );
};

export default DeleteDataBukuModal;
