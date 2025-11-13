import { Dispatch, FC, SetStateAction, useEffect } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { IBook, IBookCategory } from "@/types/Book";
import { cn } from "@/utils/cn";
import { KATEGORI_BUKU } from "../DataBuku.constants";
import useUpdateDataBukuModal from "./useUpdateDataBukuModal";

interface UpdateDataBukuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchBook: () => void;
  selectedId: IBook | null;
  setSelectedId: Dispatch<SetStateAction<IBook | null>>;
}

const UpdateDataBukuModal: FC<UpdateDataBukuModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchBook,
  selectedId,
  setSelectedId,
}) => {
  const {
    control,
    errors,
    reset,
    setValueUpdateBook,
    handleSubmit,
    handleUpdateBook,
    isPendingUpdateBook,
    isSuccessUpdateBook,
  } = useUpdateDataBukuModal(`${selectedId?.id}`);

  useEffect(() => {
    if (selectedId) {
      setValueUpdateBook("judul", `${selectedId.judul}`);
      setValueUpdateBook("penulis", `${selectedId.penulis}`);
      setValueUpdateBook("kategori", `${selectedId.kategori}`);
      setValueUpdateBook("penerbit", `${selectedId.penerbit}`);
      setValueUpdateBook("tahun_terbit", `${selectedId.tahun_terbit}`);
      setValueUpdateBook("isFeatured", `${selectedId.isFeatured}`);
      setValueUpdateBook("stok", `${selectedId.stok}`);
    }
  }, [selectedId]);

  useEffect(() => {
    if (isSuccessUpdateBook) {
      onClose();
      refetchBook();
      setSelectedId(null);
    }
  }, [isSuccessUpdateBook]);

  const handleOnClose = () => {
    reset();
    onClose();
    setSelectedId(null);
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      onClose={handleOnClose}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmit(handleUpdateBook)}>
        <ModalContent className="m-4 p-2">
          <ModalHeader className="text-lg font-semibold">
            Edit Data Buku
          </ModalHeader>

          <ModalBody>
            <div
              className={cn(
                "flex flex-col",
                Object.keys(errors).length > 0 ? "gap-3" : "gap-4",
              )}
            >
              <p className="text-sm font-bold">Keterangan Buku</p>
              <Controller
                name="judul"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    isRequired
                    label="Judul Buku"
                    placeholder="Masukkan judul buku"
                    variant="bordered"
                    type="text"
                    autoComplete="off"
                    isInvalid={!!errors.judul}
                    errorMessage={errors.judul?.message}
                  />
                )}
              />
              <Controller
                name="penulis"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    isRequired
                    label="Penulis"
                    placeholder="Masukkan nama penulis"
                    variant="bordered"
                    type="text"
                    autoComplete="off"
                    isInvalid={!!errors.penulis}
                    errorMessage={errors.penulis?.message}
                  />
                )}
              />
              <Controller
                name="kategori"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    allowsCustomValue
                    isRequired
                    defaultItems={KATEGORI_BUKU || []}
                    label="Kategori"
                    placeholder="Masukkan kategori..."
                    variant="bordered"
                    isInvalid={!!errors.kategori}
                    defaultInputValue={selectedId?.kategori}
                    errorMessage={errors.kategori?.message}
                    onSelectionChange={(value) => onChange(value)}
                    onInputChange={(value) => onChange(value)}
                  >
                    {(kategori: IBookCategory) => (
                      <AutocompleteItem key={kategori.name}>
                        {kategori.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
              <Controller
                name="penerbit"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    isRequired
                    label="Penerbit"
                    placeholder="Masukkan nama penerbit"
                    variant="bordered"
                    type="text"
                    autoComplete="off"
                    isInvalid={!!errors.penerbit}
                    errorMessage={errors.penerbit?.message}
                  />
                )}
              />
              <Controller
                name="tahun_terbit"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    isRequired
                    label="Tahun Terbit"
                    placeholder="Masukkan tahun (contoh: 2024)"
                    variant="bordered"
                    type="number"
                    autoComplete="off"
                    isInvalid={!!errors.tahun_terbit}
                    errorMessage={errors.tahun_terbit?.message}
                  />
                )}
              />

              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isRequired
                    aria-hidden={false}
                    label="Apakah Buku Unggulan?"
                    variant="bordered"
                    disallowEmptySelection
                    defaultSelectedKeys={
                      selectedId?.isFeatured === true ? ["true"] : ["false"]
                    }
                    isInvalid={!!errors.isFeatured}
                    errorMessage={errors.isFeatured?.message}
                  >
                    <SelectItem key="true">Ya</SelectItem>
                    <SelectItem key="false">Tidak</SelectItem>
                  </Select>
                )}
              />

              <p className="text-sm font-bold">Stok Buku</p>
              <Controller
                name="stok"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    isRequired
                    label="Jumlah Stok"
                    placeholder="Masukkan jumlah stok"
                    variant="bordered"
                    type="number"
                    autoComplete="off"
                    isInvalid={!!errors.stok}
                    errorMessage={errors.stok?.message}
                  />
                )}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              onPress={handleOnClose}
              color="primary"
              variant="bordered"
              disabled={isPendingUpdateBook}
            >
              Batal
            </Button>
            <Button
              type="submit"
              color="primary"
              isLoading={isPendingUpdateBook}
              spinner={<Spinner size="sm" color="white" />}
            >
              {!isPendingUpdateBook && "Edit Buku"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateDataBukuModal;
