import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const getUpdateInfoSchema = (role: string) =>
  yup.object().shape({
    nama: yup.string().required("Please input your fullName"),

    kelas:
      role.toLowerCase() === "user"
        ? yup
            .string()
            .matches(/^(10|11|12)(TKJ|RPL|BC)([0-9]{1,2})$/, {
              message: "Format kelas tidak valid (contoh: 11RPL1 atau 12TKJ02)",
            })
            .required("Kelas tidak boleh kosong")
        : yup.string().notRequired(),
  });

const useInfoTab = (role: string) => {
  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm({
    resolver: yupResolver(getUpdateInfoSchema(role)),
  });

  return {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  };
};

export default useInfoTab;
