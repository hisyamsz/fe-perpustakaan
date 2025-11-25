import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  DatePicker,
} from "@heroui/react";
import { Dispatch, FC, SetStateAction, useEffect, useMemo } from "react";
import { CalendarDate } from "@internationalized/date";
import borrowServices from "@/services/borrow.service";
import { IBorrowItem } from "@/types/Borrow";
import useBorrowBookModal from "./useBorrowBookModal";

interface BorrowBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  selectedBook: IBorrowItem | null;
  setSelectedBook: Dispatch<SetStateAction<IBorrowItem | null>>;
  refetchBook: () => void;
}

const BorrowBookModal: FC<BorrowBookModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  selectedBook,
  setSelectedBook,
  refetchBook,
}) => {
  const { handleBorrowBook, isPendingBorrow, isSuccessBorrow } =
    useBorrowBookModal();

  const today = useMemo(() => {
    const now = new Date();
    return new CalendarDate(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
    );
  }, []);

  const dueDate = useMemo(() => today.add({ days: 3 }), [today]);

  useEffect(() => {
    if (isSuccessBorrow) {
      refetchBook();
      onClose();
      setSelectedBook(null);
    }
  }, [isSuccessBorrow]);

  const handleOnClose = () => {
    onClose();
    setSelectedBook(null);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
      <ModalContent>
        <ModalHeader>Peminjaman Buku</ModalHeader>
        <ModalBody>
          <p className="font-semibold">{selectedBook?.buku?.judul}</p>

          <DatePicker
            label="Tanggal Pinjam"
            defaultValue={today}
            variant="bordered"
            isReadOnly
          />
          <DatePicker
            label="Tanggal Pengembalian"
            defaultValue={dueDate}
            variant="bordered"
            isReadOnly
          />
        </ModalBody>

        <ModalFooter>
          <Button color="primary" variant="bordered" onPress={handleOnClose}>
            Batal
          </Button>
          <Button
            color="primary"
            onPress={() => {
              if (!selectedBook?.id) return;
              handleBorrowBook(selectedBook.id);
            }}
            isLoading={isPendingBorrow}
          >
            Ajukan Peminjaman
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BorrowBookModal;
