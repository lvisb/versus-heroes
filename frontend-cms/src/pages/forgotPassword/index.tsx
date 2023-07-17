import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";
import { AppIcon } from "../../components/app-icon";

export const ForgotPassword = () => {
  return (
    <AuthPage
      type="forgotPassword"
      title={
        <ThemedTitleV2
          collapsed={false}
          text="Supaheroes Admin"
          icon={<AppIcon />}
        />
      }
    />
  );
};
