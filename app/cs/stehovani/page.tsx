import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Stěhování | MoveCleanMafia.cz – Profesionální stěhování bez stresu',
  description:
    'Profesionální stěhování bytů, domů a kanceláří. Rychlé termíny, férové ceny, pojištění. Objednejte stěhování online nebo přes WhatsApp.',
};

export default function StehovaniPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-4xl font-bold">
        Profesionální stěhování v Praze a okolí
      </h1>

      <p>
        Zajišťujeme kompletní stěhování bytů, domů a kanceláří.
        Pracujeme rychle, bezpečně a bez skrytých poplatků.
      </p>

      <div>
        <h2 className="text-2xl font-semibold">Cena od 599 Kč</h2>
        <p>
          Cena závisí na objemu věcí, patře, výtahu a vzdálenosti.
          Přesnou cenu vám sdělíme předem.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Jak probíhá stěhování</h2>
        <ol className="list-decimal ml-6 space-y-2">
          <li>Kontaktujete nás telefonicky nebo online</li>
          <li>Pošlete fotografie věcí</li>
          <li>Domluvíme cenu a termín</li>
          <li>Přijedeme a vše vyřešíme</li>
        </ol>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Částo kladené dotazy</h2>
        <ul className="space-y-2">
          <li><strong>Stěhujete i o víkendech?</strong> Ano, bez příplatků.</li>
          <li><strong>Máte pojištění?</strong> Ano.</li>
          <li><strong>Pomůžete s balením?</strong> Ano.</li>
          <li><strong>Děláte i těžké předměty?</strong> Ano.</li>
          <li><strong>Jak rychle můžete přijet?</strong> I do 24 hodin.</li>
          <li><strong>Platí se parkování?</strong> Pouze dle města.</li>
        </ul>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Link
          href="/cs/contact"
          className="bg-brand-yellow px-6 py-3 font-semibold rounded"
        >
          Kontakt
        </Link>

        <Link
          href="https://wa.me/420774635981"
          className="border border-brand-yellow px-6 py-3 font-semibold rounded"
        >
          WhatsApp
        </Link>
      </div>
    </section>
  );
}
