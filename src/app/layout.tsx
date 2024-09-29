import SessionProvider from "@/app/_components/providers/SessionProvider";
import { ThemeProvider } from "@/app/_components/providers/ThemeProvider";
import { getServerAuthSession } from "@/server/auth";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { HydrateClient } from "@/trpc/server";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "イーカケル",
  description: "チケット抽選当落結果統計サイト",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  return (
    <html lang="ja" className="size-full" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="size-full">
        <TRPCReactProvider>
          <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <HydrateClient>{children}</HydrateClient>
            </ThemeProvider>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
