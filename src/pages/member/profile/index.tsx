import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Member/Profile";

const MemberProfilePage = () => {
  return (
    <DashboardLayout
      title="Profile"
      description="Atur nama profile di sini"
      type="user"
    >
      <Profile />
    </DashboardLayout>
  );
};

export default MemberProfilePage;
