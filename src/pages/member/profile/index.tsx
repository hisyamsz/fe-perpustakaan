import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Member/Profile";

const MemberProfilePage = () => {
  return (
    <DashboardLayout
      title="Profile"
      description="Manage your profile here"
      type="user"
    >
      <Profile />
    </DashboardLayout>
  );
};

export default MemberProfilePage;
