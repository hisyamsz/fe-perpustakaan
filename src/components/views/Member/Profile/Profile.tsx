import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import * as React from "react";
import InfoTab from "./InfoTab";
import useProfile from "./useProfile";

interface ProfileProps {
  propName?: string;
}

const Profile: React.FC<ProfileProps> = () => {
  const {
    dataProfile,
    isPendingUpdateProfile,
    isSuccessUpdateProfile,
    handleUpdateProfile,
  } = useProfile();

  return (
    <Tabs aria-label="options" defaultSelectedKey="info">
      <Tab key="info" title="Info">
        <InfoTab
          dataProfile={dataProfile}
          isPendingUpdate={isPendingUpdateProfile}
          isSuccessUpdate={isSuccessUpdateProfile}
          onUpdate={handleUpdateProfile}
        />
      </Tab>
      <Tab key="security" title="Keamanan">
        <div className="max-w-md">
          <Card className="bg-gray-50 p-4">
            <CardBody className="space-y-3">
              <h3 className="text-lg font-semibold">Keamanan Akun</h3>

              <p className="text-sm text-gray-700">
                Untuk mengganti password, Anda perlu melakukan proses reset
                password melalui halaman login.
              </p>

              <p className="text-sm text-gray-700">
                Silakan <strong>logout terlebih dahulu</strong> sebelum
                melakukan reset password.
              </p>

              <p className="text-sm text-gray-700">
                Setelah logout, pilih opsi{" "}
                <strong>&quot;Lupa Password&quot;</strong> pada halaman login
                untuk memulai prosesnya.
              </p>
            </CardBody>
          </Card>
        </div>
      </Tab>
    </Tabs>
  );
};

export default Profile;
