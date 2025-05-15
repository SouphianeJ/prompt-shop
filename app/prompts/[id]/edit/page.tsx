'use client';
import PromptForm from '@/components/PromptForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

interface Props {
  params: { id: string };
}

export default function EditPromptPage({ params }: Props) {
  const { user, loadingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loadingAuth && !user) {
      router.push('/auth');
    }
  }, [user, loadingAuth, router]);

  if (loadingAuth) {
    return <p>Chargement...</p>; // Or a loading spinner
  }

  if (!user) {
    // This will likely not be reached if the redirect happens,
    // but it's good practice for clarity or if redirect is delayed.
    return <p>Redirection vers la page de connexion...</p>;
  }

  const { id } = params;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Prompt</h2>
      <PromptForm promptId={id} />
    </div>
  );
}