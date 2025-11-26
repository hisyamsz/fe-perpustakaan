import ModalPopup from "@/components/commons/ModalPopup";
import { IBorrowItem } from "@/types/Borrow";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import usePeminjamanReturnModal from "./usePeminjamanReturnModal";
import { convertTime } from "@/utils/date";
import { Radio, RadioGroup } from "@heroui/react";

interface PeminjamanReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  refetchBorrow: () => void;
  selectedId: IBorrowItem | null;
  setSelectedId: Dispatch<SetStateAction<IBorrowItem | null>>;
}

const PeminjamanReturnModal: FC<PeminjamanReturnModalProps> = ({
  isOpen,
  onOpenChange,
  onClose,
  refetchBorrow,
  selectedId,
  setSelectedId,
}) => {
  const {
    mutateReturnBorrow,
    isPendingReturnBorrow,
    isSuccessReturnBorrow,
    kondisi,
    setKondisi,
  } = usePeminjamanReturnModal();

  const handleOnClose = () => {
    onClose();
    setSelectedId(null);
    setKondisi("Baik");
  };

  useEffect(() => {
    if (isSuccessReturnBorrow) {
      onClose();
      setSelectedId(null);
      refetchBorrow();
      setKondisi("Baik");
    }
  }, [isSuccessReturnBorrow]);

  return (
    <ModalPopup
      title="Konfirmasi Pengembalian"
      description="Silakan pilih kondisi buku sebelum dikembalikan."
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleOnClose}
      onPressCancel={handleOnClose}
      onPressConfirm={() => {
        if (!selectedId) return;
        mutateReturnBorrow({
          id: `${selectedId?.id}`,
          kondisi_buku: kondisi,
        });
      }}
      disabled={isPendingReturnBorrow}
    >
      <RadioGroup value={kondisi} onValueChange={setKondisi}>
        <Radio value="Baik">Baik</Radio>
        <Radio value="Rusak">Rusak</Radio>
        <Radio value="Hilang">Hilang</Radio>
      </RadioGroup>
    </ModalPopup>
  );
};

export default PeminjamanReturnModal;
