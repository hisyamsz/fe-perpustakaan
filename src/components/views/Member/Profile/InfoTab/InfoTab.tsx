import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { Controller, useWatch } from "react-hook-form";
import useInfoTab from "./useInfoTab";
import { IProfile } from "@/types/Auth";
import { FC, useEffect } from "react";

interface InfoTabProps {
  dataProfile: IProfile;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  onUpdate: (data: IProfile) => void;
}

const InfoTab: FC<InfoTabProps> = ({
  dataProfile,
  isPendingUpdate,
  isSuccessUpdate,
  onUpdate,
}) => {
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  const currentNama = useWatch({
    control: controlUpdateInfo,
    name: "nama",
  });
  const currentNamaTrimmed = (currentNama ?? "").trim();
  const initialNamaTrimmed = (dataProfile?.nama ?? "").trim();

  useEffect(() => {
    if (dataProfile) {
      setValueUpdateInfo("nama", `${dataProfile?.nama}`);
    }
  }, [dataProfile, setValueUpdateInfo]);

  useEffect(() => {
    if (isSuccessUpdate && isPendingUpdate) {
      resetUpdateInfo();
      setValueUpdateInfo("nama", `${dataProfile?.nama}`);
    }
  }, [
    isSuccessUpdate,
    isPendingUpdate,
    setValueUpdateInfo,
    dataProfile,
    resetUpdateInfo,
  ]);

  const isButtonDisabled =
    isPendingUpdate ||
    !dataProfile?.id ||
    currentNamaTrimmed === initialNamaTrimmed ||
    !currentNamaTrimmed;

  return (
    <Card className="w-full p-4 lg:w-1/2 2xl:w-2/5">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Profile Information</h1>
        <p className="text-default-400 w-full text-sm">
          Manage information of this account
        </p>
        <CardBody>
          <form
            className="mt-2 flex flex-col gap-4"
            onSubmit={handleSubmitUpdateInfo(onUpdate)}
          >
            <Skeleton
              isLoaded={!!dataProfile?.nama || isPendingUpdate}
              className="rounded-lg"
            >
              <Controller
                name="nama"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoComplete="off"
                    errorMessage={errorsUpdateInfo.nama?.message}
                    isInvalid={errorsUpdateInfo.nama !== undefined}
                    label="Nama"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                  />
                )}
              />
            </Skeleton>

            <Skeleton
              isLoaded={!!dataProfile?.email || isPendingUpdate}
              className="rounded-lg"
            >
              <Input
                type="email"
                label="Email"
                labelPlacement="outside"
                disabled
                isReadOnly
                variant="flat"
                value={dataProfile?.email}
              />
            </Skeleton>

            <Skeleton
              isLoaded={!!dataProfile?.role || isPendingUpdate}
              className="rounded-lg"
            >
              <Input
                label="Role"
                labelPlacement="outside"
                disabled
                isReadOnly
                variant="flat"
                value={dataProfile?.role}
              />
            </Skeleton>

            <Button
              type="submit"
              color="primary"
              className="disabled:bg-default-500 mt-2"
              disabled={isButtonDisabled}
            >
              {isPendingUpdate ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardBody>
      </CardHeader>
    </Card>
  );
};

export default InfoTab;
