import { Tab, Tabs } from "@heroui/react";
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
        <div>Keamanan</div>
      </Tab>
    </Tabs>
  );
};

export default Profile;
