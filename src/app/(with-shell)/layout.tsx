import { SessionAccountMenu } from "@/app/_components/SessionAccountMenu";
import { AppShell, AppShellHeader, AppShellMain } from "@mantine/core";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppShell header={{ height: 64 }} padding="sm">
      <AppShellHeader className="flex h-16 items-center justify-center p-sm">
        <div>
          <h1 className="rounded bg-zinc-500/10 px-1 py-0.5 text-xl font-semibold tracking-tight">
            イーカケル
          </h1>
        </div>

        <div className="flex-1" />

        <SessionAccountMenu />
      </AppShellHeader>

      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
}
