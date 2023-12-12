"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation'
import { SessionProvider } from "next-auth/react"
import Loader from "@/components/common/Loader";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

export default function RootLayout({
  children, session
}: {
  children: React.ReactNode;
  session: any;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);

  const pathname = usePathname()

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  
  return (
    <html lang="fr">
      <body suppressHydrationWarning={true}>
        <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? (
              <Loader />
            ) : (
              <div className="flex h-screen overflow-hidden">
                {/* <!-- ===== Sidebar Start ===== --> */}
                {typeof pathname === 'string' && !["/signin", "/signup"].includes(pathname) && (
                  <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                )}
                {/* <!-- ===== Sidebar End ===== --> */}

                {/* <!-- ===== Content Area Start ===== --> */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                  {/* <!-- ===== Header Start ===== --> */}
                  <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                  {/* <!-- ===== Header End ===== --> */}

                  {/* <!-- ===== Main Content Start ===== --> */}
                  <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                      {children}
                    </div>
                  </main>
                  {/* <!-- ===== Main Content End ===== --> */}
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
              </div>
            )}
          </div>
        </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
