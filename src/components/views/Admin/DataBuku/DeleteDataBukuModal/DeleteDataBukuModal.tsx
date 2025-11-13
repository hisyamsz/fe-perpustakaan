import DeleteModal from "@/components/commons/DeleteModal";
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

  useEffect(() => {
    if (isSuccessDeleteDataBuku) {
      onClose();
      refetchBook();
      setSelectedId(null);
    }
  }, [isSuccessDeleteDataBuku]);

  return (
    <DeleteModal
      title="Hapus Buku"
      description="Apakah Anda yakin ingin menghapus buku ini?"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onPressCancel={() => {
        onClose();
        setSelectedId(null);
      }}
      onPressDelete={() => mutateDeleteDataBuku(`${selectedId?.id}`)}
      disabled={isPendingDeleteDataBuku}
    />
  );
};

export default DeleteDataBukuModal;
