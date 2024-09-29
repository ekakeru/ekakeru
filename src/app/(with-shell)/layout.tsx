import { ColorSchemeSwitcher } from "@/app/_components/ColorSchemeSwitcher";
import { SessionAccountMenu } from "@/app/_components/SessionAccountMenu";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="size-full">
      <header className="bg-background/50 fixed inset-x-0 top-0 z-10 flex h-16 items-center justify-center gap-2 border-b border-zinc-500/10 px-4 shadow backdrop-blur-sm">
        <Link
          href="/"
          className="flex items-center overflow-hidden rounded bg-zinc-500/10 text-xl font-semibold tracking-tight"
        >
          <div className="bg-primary size-full h-full px-1.5 py-0.5 font-light text-white">
            <span className="leading-none">e&times;</span>
          </div>
          <div className="whitespace-nowrap px-1.5 py-0.5 font-light tracking-tighter">
            イーカケル
          </div>
        </Link>

        <div className="flex-1" />

        <ColorSchemeSwitcher />
        <SessionAccountMenu />
      </header>

      <main className="h-[calc(100%-4rem)] w-full pt-16">{children}</main>
    </div>
  );
}
