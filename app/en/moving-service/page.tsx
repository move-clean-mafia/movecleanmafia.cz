import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Moving Service | MoveCleanMafia.cz – Professional moving without stress',
  description:
    'Professional moving services for apartments, houses and offices. Fast scheduling, fair prices, insurance. Book moving online or via WhatsApp.',
};

export default function MovingServicePage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-4xl font-bold">
        Professional moving services in Prague and surrounding areas
      </h1>

      <p>
        We provide complete moving services for apartments, houses and offices.
        We work quickly, safely and with no hidden fees.
      </p>

      <div>
        <h2 className="text-2xl font-semibold">Prices from 599 CZK</h2>
        <p>
          Price depends on the volume, floor, elevator and distance.
          We will tell you the exact price in advance.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">How our moving works</h2>
        <ol className="list-decimal ml-6 space-y-2">
          <li>You contact us by phone or online</li>
          <li>You send photos of your items</li>
          <li>We agree on the price and date</li>
          <li>We arrive and take care of everything</li>
        </ol>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <ul className="space-y-2">
          <li><strong>Do you move on weekends?</strong> Yes, at no extra charge.</li>
          <li><strong>Do you have insurance?</strong> Yes.</li>
          <li><strong>Do you help with packing?</strong> Yes.</li>
          <li><strong>Do you move heavy items?</strong> Yes.</li>
          <li><strong>How fast can you arrive?</strong> Even within 24 hours.</li>
          <li><strong>Is parking charged?</strong> Only according to the city.</li>
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
