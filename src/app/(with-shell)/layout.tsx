import { ColorSchemeSwitcher } from "@/app/_components/ColorSchemeSwitcher";
import { SessionAccountMenu } from "@/app/_components/SessionAccountMenu";
import { env } from "@/env";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="size-full">
      <header className="fixed inset-x-0 top-0 z-10 flex h-16 items-center justify-center gap-2 border-b border-zinc-500/10 bg-background/50 px-4 shadow backdrop-blur-sm">
        <Link
          href="/"
          className="flex items-center overflow-hidden rounded bg-zinc-500/10 text-xl font-semibold tracking-tight"
        >
          <div className="size-full h-full bg-primary px-1 py-0.5 font-light text-white">
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 13 13"
              height="13"
              width="13"
              className="size-7"
            >
              <path
                d="m10.5348 6.587 1.5703 1.5585c.1015.1094.1543.2246.1582.3457.0078.1172-.0371.2246-.1348.3223-.0976.0976-.207.1445-.3281.1406-.1211-.0078-.2363-.0625-.3457-.164L9.8961 7.2197 8.3375 8.7901c-.1094.1015-.2246.1562-.3457.164-.121.004-.2305-.043-.3281-.1406-.0977-.0977-.1446-.205-.1407-.3223.0079-.121.0625-.2363.1641-.3457L9.2633 6.587 7.687 5.0225c-.1016-.1094-.1562-.2227-.164-.3399-.004-.121.043-.2304.1406-.328.0976-.0977.207-.1427.3281-.1349.1211.004.2363.0567.3457.1582L9.896 5.9483l1.5586-1.5704c.1094-.1015.2246-.1543.3457-.1582.1211-.0078.2305.0372.3281.1348.0977.0977.1426.207.1348.3281-.0039.1172-.0567.2305-.1582.3399l-1.5703 1.5644Zm-4.1212-.544c0 .2656-.0742.4746-.2227.627-.1445.1523-.3457.2284-.6035.2284H1.7436c.082.5313.3047.963.668 1.295.3633.328.832.4921 1.4063.4921.4922 0 .9687-.125 1.4297-.375.3085-.1562.537-.1113.6855.1348.1602.25.0957.4727-.1933.668-.207.1367-.4786.25-.8145.3398-.336.086-.6875.129-1.0547.129-.957 0-1.7187-.2872-2.2852-.8614-.5664-.5781-.8496-1.3145-.8496-2.209 0-.9062.2754-1.6484.8262-2.2265.5547-.5782 1.2559-.8672 2.1035-.8672.8008 0 1.459.2402 1.9746.7207.5157.4804.7735 1.1152.7735 1.9043Zm-4.6582-.0118H5.476c0-.5039-.1738-.916-.5215-1.2363-.3477-.3203-.7774-.4805-1.289-.4805-.4923 0-.9102.1583-1.254.4747-.3437.3164-.5625.7304-.6562 1.2421Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="whitespace-nowrap px-1.5 py-0.5 font-light tracking-tighter">
            イーカケル
          </div>
        </Link>

        <div className="flex-1" />

        <ColorSchemeSwitcher />
        <SessionAccountMenu />
      </header>

      <main className="min-h-[calc(100%-3rem)] w-full pt-16">{children}</main>

      <footer className="flex h-12 items-center justify-center gap-2">
        <p className="text-xs opacity-50">
          イーカケル {env.NEXT_PUBLIC_VERSION ?? "v0.0.0"}
        </p>

        <div className="h-6 w-px bg-zinc-500/10" />

        <Link
          className="text-xs opacity-50 hover:opacity-80"
          href="https://github.com/ekakeru/ekakeru"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
      </footer>
    </div>
  );
}
