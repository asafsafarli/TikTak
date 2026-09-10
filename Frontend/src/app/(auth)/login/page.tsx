import type { Metadata } from "next";
import { AuthShell } from "@/views/auth";
import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = {
  title: "Login — TIK TAK",
};

export default function LoginPage() {
  return (
    <AuthShell active="login">
      <LoginForm />
    </AuthShell>
  );
}
