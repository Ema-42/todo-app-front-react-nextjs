import type { Metadata } from "next";
import "./globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Todo App",
  description: "App de creacion de notas",
  icons: {
    icon: "/iconTodo2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/iconTodo2.png" type="image/x-icon" />
      </head>
      <body className={`antialiased`}>
        <main>
          <SessionAuthProvider>
            <NavBar />
            {children}
          </SessionAuthProvider>
        </main>
      </body>
    </html>
  );
}
