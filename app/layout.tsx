import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getSessionUserId, parseSession, SESSION_COOKIE } from "@/lib/auth";
import { CartDrawer } from "@/components/marketplace/cart-drawer";
import { MarketplaceProvider } from "@/components/marketplace/marketplace-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Esdiac Marketplace",
  description: "Social commerce marketplace MVP for immersive product discovery.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = parseSession((await cookies()).get(SESSION_COOKIE)?.value);
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className="min-h-full flex flex-col"
        data-user-id={getSessionUserId(session)}
        data-user-name={session?.name ?? ""}
      >
        <MarketplaceProvider>
          {children}
          <CartDrawer />
        </MarketplaceProvider>
      </body>
    </html>
  );
}
