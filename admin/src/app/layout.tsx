import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import "@/styles/globals.css";

export const metadata = {
  title: 'GoPress - A Content Management System',
  description: 'Content Management System written in Go and Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
