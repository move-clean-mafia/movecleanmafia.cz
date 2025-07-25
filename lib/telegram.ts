interface TelegramMessage {
  chat_id: string;
  text: string;
  parse_mode?: 'HTML' | 'Markdown';
  disable_web_page_preview?: boolean;
}

interface ReservationSummary {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  package?: string;
  preferredDate: string;
  preferredTime: string;
  pickupAddress?: string;
  deliveryAddress?: string;
  address?: string;
  apartmentSize?: string;
  message?: string;
  locale: string;
  createdAt: string;
}

/**
 * Send a message to Telegram channel
 */
export const sendTelegramMessage = async (
  message: string,
  parseMode: 'HTML' | 'Markdown' = 'HTML',
): Promise<void> => {
  console.log('🔍 [TG] sendTelegramMessage called');
  console.log('🔍 [TG] Message length:', message.length);
  console.log('🔍 [TG] Parse mode:', parseMode);

  const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

  console.log('🔍 [TG] Bot token exists:', !!botToken);
  console.log('🔍 [TG] Chat ID exists:', !!chatId);
  console.log('🔍 [TG] Bot token length:', botToken?.length || 0);
  console.log('🔍 [TG] Chat ID:', chatId);

  if (!botToken || !chatId) {
    console.warn(
      '⚠️ [TG] Telegram configuration missing. Skipping notification.',
    );
    console.warn('⚠️ [TG] Bot token missing:', !botToken);
    console.warn('⚠️ [TG] Chat ID missing:', !chatId);
    return;
  }

  const telegramMessage: TelegramMessage = {
    chat_id: chatId,
    text: message,
    parse_mode: parseMode,
    disable_web_page_preview: true,
  };

  console.log('🔍 [TG] Preparing to send message to Telegram API');
  console.log(
    '🔍 [TG] API URL:',
    `https://api.telegram.org/bot${botToken.substring(0, 10)}.../sendMessage`,
  );
  console.log('🔍 [TG] Message preview:', message.substring(0, 100) + '...');

  try {
    console.log('🔍 [TG] Making fetch request to Telegram API...');
    const startTime = Date.now();

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(telegramMessage),
      },
    );

    const endTime = Date.now();
    console.log(
      '🔍 [TG] Fetch request completed in',
      endTime - startTime,
      'ms',
    );
    console.log('🔍 [TG] Response status:', response.status);
    console.log('🔍 [TG] Response status text:', response.statusText);
    console.log(
      '🔍 [TG] Response headers:',
      Object.fromEntries(response.headers.entries()),
    );

    if (!response.ok) {
      console.error(
        '❌ [TG] Response not OK, attempting to read error data...',
      );
      const errorData = await response.json();
      console.error('❌ [TG] Error data:', errorData);
      console.error('❌ [TG] Telegram API error:', errorData);
      throw new Error(`Telegram API error: ${errorData.description}`);
    }

    console.log('✅ [TG] Response is OK, reading response body...');
    const responseData = await response.json();
    console.log('✅ [TG] Telegram API response:', responseData);
    console.log('✅ [TG] Message sent successfully!');
  } catch (error) {
    console.error('❌ [TG] Exception caught in sendTelegramMessage:');
    console.error('❌ [TG] Error type:', error?.constructor?.name);
    console.error('❌ [TG] Full error object:', error);

    // Don't throw error to avoid breaking the reservation flow
    console.log('🔍 [TG] Continuing without throwing error...');
  }
};

/**
 * Format reservation data for Telegram message
 */
export const formatReservationForTelegram = (
  reservation: ReservationSummary,
): string => {
  console.log('🔍 [TG] formatReservationForTelegram called');
  console.log('🔍 [TG] Reservation ID:', reservation.id);
  console.log('🔍 [TG] Service:', reservation.service);

  const truncateMessage = (message: string, maxLength: number = 200) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    const timeMap: Record<string, string> = {
      morning: '8:00-12:00',
      afternoon: '12:00-16:00',
      evening: '16:00-20:00',
    };
    return timeMap[time] || time;
  };

  const getLocaleName = (locale: string) => {
    const localeMap: Record<string, string> = {
      cs: 'Czech',
      en: 'English',
      ua: 'Ukrainian',
    };
    return localeMap[locale] || locale.toUpperCase();
  };

  const getServiceEmoji = (service: string) => {
    const emojiMap: Record<string, string> = {
      moving: '🚚',
      cleaning: '🧹',
      packing: '📦',
      storage: '🏪',
      other: '❓',
    };
    return emojiMap[service] || '❓';
  };

  const serviceEmoji = getServiceEmoji(reservation.service);
  const packageText = reservation.package
    ? `\n📦 <b>Package:</b> ${reservation.package}`
    : '';

  const addressSection =
    reservation.service === 'moving'
      ? `📍 <b>Pickup Address:</b> ${truncateMessage(reservation.pickupAddress || 'Not provided', 100)}
📍 <b>Delivery Address:</b> ${truncateMessage(reservation.deliveryAddress || 'Not provided', 100)}`
      : `📍 <b>Address:</b> ${truncateMessage(reservation.address || 'Not provided', 100)}`;

  const apartmentSizeText = reservation.apartmentSize
    ? `\n🏠 <b>Apartment Size:</b> ${reservation.apartmentSize} m²`
    : '';

  const messageText = reservation.message
    ? `\n💬 <b>Message:</b> ${truncateMessage(reservation.message)}`
    : '';

  const localeText = getLocaleName(reservation.locale);

  const formattedMessage = `🔔 <b>NEW RESERVATION RECEIVED</b> 🔔

${serviceEmoji} <b>Service:</b> ${reservation.service}${packageText}

👤 <b>Customer:</b> ${reservation.firstName} ${reservation.lastName}
📧 <b>Email:</b> ${reservation.email}
📞 <b>Phone:</b> ${reservation.phone}

📅 <b>Date:</b> ${formatDate(reservation.preferredDate)}
⏰ <b>Time:</b> ${formatTime(reservation.preferredTime)}

${addressSection}${apartmentSizeText}${messageText}

🌍 <b>Language:</b> ${localeText}
🆔 <b>Reservation ID:</b> <code>${reservation.id}</code>
📅 <b>Submitted:</b> ${formatDate(reservation.createdAt)}`;

  console.log('🔍 [TG] Formatted message length:', formattedMessage.length);
  console.log(
    '🔍 [TG] Formatted message preview:',
    formattedMessage.substring(0, 200) + '...',
  );

  return formattedMessage;
};

/**
 * Send reservation notification to Telegram
 */
export const sendReservationNotification = async (
  reservation: ReservationSummary,
): Promise<void> => {
  console.log('🔍 [TG] sendReservationNotification called');
  console.log('🔍 [TG] Reservation data:', {
    id: reservation.id,
    service: reservation.service,
    customer: `${reservation.firstName} ${reservation.lastName}`,
    email: reservation.email,
    phone: reservation.phone,
    date: reservation.preferredDate,
    time: reservation.preferredTime,
    locale: reservation.locale,
  });

  try {
    console.log('🔍 [TG] Formatting message...');
    const message = formatReservationForTelegram(reservation);
    console.log('🔍 [TG] Message formatted, sending to Telegram...');

    await sendTelegramMessage(message, 'HTML');
    console.log('✅ [TG] sendReservationNotification completed successfully');
  } catch (error) {
    console.error('❌ [TG] Error in sendReservationNotification:');
    console.error('❌ [TG] Error type:', error?.constructor?.name);
    throw error; // Re-throw to be caught by the caller
  }
};
