import { SessionAccountMenu } from "@/app/_components/SessionAccountMenu";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="size-full">
      <header className="fixed left-0 right-0 top-0 flex h-16 items-center justify-center p-4">
        <Link
          href="/"
          className="rounded bg-zinc-500/10 px-1.5 py-0.5 text-xl font-semibold tracking-tight"
        >
          イーカケル
        </Link>

        <div className="flex-1" />

        <SessionAccountMenu />
      </header>

      <main className="mt-16">{children}</main>
    </div>
  );
}
