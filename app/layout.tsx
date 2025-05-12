import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prompt Shop',
  description: 'A place to create and share prompts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-dark-gray antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Prompt Gallery</h1>
        <p className="text-gray-600">
          Create, share, and discover amazing prompts.
        </p>
      </header>
      <main>{children}</main>
    </div>
  );
}