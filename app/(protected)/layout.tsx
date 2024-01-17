import { Toaster } from "sonner";
import { NavbarSettings } from "./_components/navbar";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { RoleGate } from "@/components/auth/role-gate";
("./_components/navbar");

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  return (
    <div
      className="h-full w-full flex flex-col gap-y-10 items-center justify-center
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
      from-sky-400 to-blue-800
    "
    >
      <RoleGate allowedRole="ADMIN">
        <Toaster />
        <NavbarSettings />
        {children}
      </RoleGate>
    </div>
  );
};

export default ProtectedLayout;
