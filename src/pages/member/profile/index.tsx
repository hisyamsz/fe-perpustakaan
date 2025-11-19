import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Member/Profile";

const MemberProfilePage = () => {
  return (
    <DashboardLayout
      title="Profile"
      description="Kelola informasi profil dan keamanan akun Anda."
      type="user"
    >
      <Profile />
    </DashboardLayout>
  );
};

export default MemberProfilePage;
