import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Химчистка диванов | MoveCleanMafia.cz – Профессиональная химчистка мягкой мебели',
  description:
    'Профессиональная химчистка диванов, кресел и мягкой мебели. Доступные цены, быстрые сроки, без скрытых доплат. Закажите химчистку онлайн или через WhatsApp.',
};

export default function HimchistkaDivanovPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-4xl font-bold">
        Профессиональная химчистка диванов и мягкой мебели
      </h1>

      <p>
        Мы оказываем услуги глубокой химчистки диванов, кресел, стульев и другой
        мягкой мебели. Работаем быстро, аккуратно и без скрытых платежей.
      </p>

      <div>
        <h2 className="text-2xl font-semibold">Цена от 499 Kč</h2>
        <p>
          Цена зависит от размеров дивана, типа ткани и степени загрязнения.
          Точную стоимость сообщаем заранее.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Как проходит химчистка</h2>
        <ol className="list-decimal ml-6 space-y-2">
          <li>Вы связываетесь с нами по телефону или онлайн</li>
          <li>Присылаете фотографии мебели и описываете пятна</li>
          <li>Мы согласовываем цену и удобное время</li>
          <li>Наш мастер приезжает и проводит чистку</li>
        </ol>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Часто задаваемые вопросы</h2>
        <ul className="space-y-2">
          <li><strong>Работаете ли вы в выходные?</strong> Да, без доплаты.</li>
          <li><strong>У вас есть страховка?</strong> Да.</li>
          <li><strong>Удаляете ли трудные пятна?</strong> Да, большинство пятен выводятся.</li>
          <li><strong>Сколько времени сохнет диван?</strong> Обычно 4–6 часов.</li>
          <li><strong>Оплачивается ли парковка?</strong> Только в зависимости от города.</li>
          <li><strong>Как быстро вы можете приехать?</strong> В течение 24 часов.</li>
        </ul>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Link
          href="/cs/contact"
          className="bg-brand-yellow px-6 py-3 font-semibold rounded"
        >
          Контакт
        </Link>

        <Link
          href="https://wa.me/420777112613"
          className="border border-brand-yellow px-6 py-3 font-semibold rounded"
        >
          WhatsApp
        </Link>
      </div>
    </section>
  );
}
