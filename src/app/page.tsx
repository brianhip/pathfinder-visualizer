import { CombinedVisualizer } from '@/components/CombinedVisualizer';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <CombinedVisualizer />
      <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 Brian Peinado
      </p>
    </main>
  );
}