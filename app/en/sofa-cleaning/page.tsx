import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sofa Cleaning | MoveCleanMafia.cz \u2013 Professional sofa cleaning without stress',
  description:
    'Professional sofa cleaning for apartments, houses and offices. Quick appointments, fair prices, insurance. Book sofa cleaning online or via WhatsApp.',
};

export default function SofaCleaningPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-4xl font-bold">
        Professional sofa cleaning in Prague and surrounding areas
      </h1>

      <p>
        We provide complete sofa cleaning for couches and upholstered furniture.
        We work quickly, safely and with no hidden fees.
      </p>

      <div>
        <h2 className="text-2xl font-semibold">Price from 499 CZK</h2>
        <p>
          The price depends on the size of the sofa, fabric and level of dirt.
          We will tell you the exact price in advance.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">How sofa cleaning works</h2>
        <ol className="list-decimal ml-6 space-y-2">
          <li>You contact us by phone or online</li>
          <li>You send photos of the sofa</li>
          <li>We agree on the price and date</li>
          <li>We come and clean everything</li>
        </ol>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
        <ul className="space-y-2">
          <li><strong>Do you work on weekends?</strong> Yes, without extra charge.</li>
          <li><strong>Do you have insurance?</strong> Yes.</li>
          <li><strong>Do you remove tough stains?</strong> Yes.</li>
          <li><strong>How long does the sofa take to dry?</strong> Up to 4 hours.</li>
          <li><strong>Do you charge for parking?</strong> Only according to the city rules.</li>
          <li><strong>How quickly can you arrive?</strong> Even within 24 hours.</li>
        </ul>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Link
          href="/en/contact"
          className="bg-brand-yellow px-6 py-3 font-semibold rounded"
        >
          Contact
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
