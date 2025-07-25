# MoveCleanMafia.cz

Professional moving and cleaning services website built with Next.js, TypeScript, and Firebase.

## Features

- 🌐 Multi-language support (Czech, English, Ukrainian)
- 📱 Responsive design with Tailwind CSS
- 🔥 Firebase integration for reservations
- 📝 Online reservation system
- 🎨 Modern UI with Shadcn components
- ⚡ Server-side rendering with Next.js App Router

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Firebase project

### Environment Variables

Create a `.env.local` file in the root directory with your Firebase configuration:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Telegram Notifications (Optional)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Run the development server:

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Firebase Setup

This project uses Firebase for:

- **Reservations**: Store and manage customer reservations
- **Authentication**: Admin user authentication (future)
- **Storage**: File uploads (future)

### Database Schema

The Firebase Firestore database uses the following collections:

- `reservations`: Customer reservation data
- `services`: Service configuration and pricing
- `pricing`: Dynamic pricing rules
- `admin_users`: Administrative users
- `settings`: Application settings
- `notifications`: System notifications

See `firebase-schema.md` for detailed schema documentation.

### Security Rules

Make sure to configure Firestore security rules to allow:

- Public read access to services and pricing
- Public write access to reservations (for form submissions)
- Admin-only access to other collections

## Telegram Notifications

The system can send instant notifications to a Telegram channel when new reservations are received.

### Setup Telegram Bot

1. **Create a Telegram Bot**:
   - Message [@BotFather](https://t.me/botfather) on Telegram
   - Send `/newbot` and follow the instructions
   - Save the bot token you receive

2. **Get Chat ID**:
   - Add your bot to a channel or group
   - Send a message to the channel/group
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find the `chat_id` in the response

3. **Configure Environment Variables**:
   ```bash
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_CHAT_ID=your_chat_id_here
   ```

### Notification Features

- **Instant Alerts**: Receive notifications immediately when reservations are submitted
- **Rich Formatting**: Beautiful HTML-formatted messages with emojis and proper formatting
- **Complete Details**: All reservation information including contact details, service type, and addresses
- **Smart Truncation**: Long messages and addresses are automatically truncated to fit Telegram limits
- **Multi-language Support**: Proper locale detection and formatting
- **Service-specific Formatting**: Different layouts for moving vs other services
- **Non-blocking**: Notifications are sent asynchronously to avoid slowing down the reservation process
- **Error Handling**: Failed notifications won't break the reservation flow
- **Testing Tools**: Built-in test endpoints to verify the integration

### Testing the Integration

You can test the Telegram integration using the test endpoint:

```bash
# Test simple notification
curl -X POST http://localhost:3000/api/test-telegram \
  -H "Content-Type: application/json" \
  -d '{"testType": "simple"}'

# Test all service types
curl -X POST http://localhost:3000/api/test-telegram \
  -H "Content-Type: application/json" \
  -d '{"testType": "all"}'
```

## Project Structure

```
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Shadcn UI components
│   └── ...                # Custom components
├── lib/                   # Utility functions
├── locales/               # i18n translation files
├── public/                # Static assets
└── firebase.ts           # Firebase configuration
```

## Technologies Used

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI + Radix UI
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Internationalization**: next-i18next
- **State Management**: React Query (TanStack Query)
- **Form Validation**: Zod
- **Icons**: Lucide React
