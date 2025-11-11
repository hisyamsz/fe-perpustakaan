import AuthLayout from "@/components/layouts/AuthLayout";
import ForgotPassword from "@/components/views/Auth/ForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout title="Forgot Password">
      <ForgotPassword />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
