import { cookies } from "next/headers";
import AuthLayout from "./layout";

export default function AuthLayoutWrapper({ children }: { children: React.ReactNode }) {
  const accessToken = cookies().get("accessToken")?.value ?? null;

  return (
    <AuthLayout accessToken={!!accessToken}>
      {children}
    </AuthLayout>
  );
}
