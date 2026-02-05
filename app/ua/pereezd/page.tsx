import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pereezd | MoveCleanMafia.cz – Профессиональный переезд без стресса',
  description:
    'Профессиональный переезд квартир, домов и офисов. Быстрые сроки, честные цены, страховка. Закажите переезд онлайн или через WhatsApp.',
};

export default function PereezdPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-4xl font-bold">
        Профессиональный переезд в Праге и окрестностях
      </h1>

      <p>
        Мы обеспечиваем полный переезд квартир, домов и офисов.
        Работаем быстро, безопасно и без скрытых платежей.
      </p>

      <div>
        <h2 className="text-2xl font-semibold">Цена от 599 Kč</h2>
        <p>
          Цена зависит от объема вещей, этажа, лифта и расстояния.
          Точную цену сообщим заранее.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Как проходит переезд</h2>
        <ol className="list-decimal ml-6 space-y-2">
          <li>Связываетесь с нами по телефону или онлайн</li>
          <li>Отправляете фотографии вещей</li>
          <li>Договариваемся о цене и дате</li>
          <li>Приезжаем и решаем всё</li>
        </ol>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Часто задаваемые вопросы</h2>
        <ul className="space-y-2">
          <li><strong>Работаете ли вы в выходные?</strong> Да, без доплат.</li>
          <li><strong>У вас есть страховка?</strong> Да.</li>
          <li><strong>Помогаете ли с упаковкой?</strong> Да.</li>
          <li><strong>Перевозите ли тяжёлые предметы?</strong> Да.</li>
          <li><strong>Как быстро вы можете приехать?</strong> Уже в течение 24 часов.</li>
          <li><strong>Нужно ли оплачивать парковку?</strong> Только согласно правилам города.</li>
        </ul>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Link
          href="/ua/contact"
          className="bg-brand-yellow px-6 py-3 font-semibold rounded"
        >
          Контакт
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
