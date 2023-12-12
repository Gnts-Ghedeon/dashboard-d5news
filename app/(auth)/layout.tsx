"use client";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {  
  return (
    <div className="w-full h-screen flex items-center justify-center">{children}</div>
  );
}
