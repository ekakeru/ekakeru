import SessionProvider from "@/app/_components/providers/SessionProvider";
import { getServerAuthSession } from "@/server/auth";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { HydrateClient } from "@/trpc/server";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { type Metadata } from "next";
import { theme } from "@/theme";

export const metadata: Metadata = {
  title: "イーカケル",
  description: "チケット抽選当落結果統計サイト",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  return (
    <html lang="ja" className="size-full">
      <head>
        <ColorSchemeScript />
      </head>
      <body className="size-full">
        <TRPCReactProvider>
          <SessionProvider session={session}>
            <MantineProvider theme={theme}>
              <HydrateClient>{children}</HydrateClient>
            </MantineProvider>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
