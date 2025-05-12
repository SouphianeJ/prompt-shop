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
      <body className="antialiased"> {/* Styles from globals.css will apply (bg-dark-gray text-light-gray) */}
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-neon-green uppercase tracking-wider">Prompt Gallery</h1> {/* Neon color, larger, uppercase for brutalist feel */}
        <p className="text-gray-400 mt-1"> {/* Lighter gray for subtitle */}
          Create, share, and discover amazing prompts.
        </p>
      </header>
      <main>{children}</main>
    </div>
  );
}