# Firebase Database Schema for MoveCleanMafia Reservation System

## Collections Structure

### 1. `reservations` Collection

Main collection for storing all reservation data.

```typescript
interface Reservation {
  // Document ID: auto-generated
  id: string;

  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Service Details
  service: 'moving' | 'cleaning' | 'packing' | 'storage' | 'other';
  package?: 'maintenance' | 'general' | 'postRenovation'; // Only for cleaning service

  // Scheduling
  preferredDate: string; // ISO date string
  preferredTime: 'morning' | 'afternoon' | 'evening';

  // Address Information
  pickupAddress?: string; // Required for moving service
  deliveryAddress?: string; // Required for moving service
  address?: string; // For other services

  // Additional Details
  apartmentSize?: string; // m² for cleaning/moving
  message?: string;

  // System Fields
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Timestamp;
  updatedAt: Timestamp;

  // Metadata
  source: 'website' | 'phone' | 'email';
  locale: 'cs' | 'en' | 'ua';
  ipAddress?: string;
  userAgent?: string;

  // Pricing (calculated after confirmation)
  estimatedPrice?: number;
  finalPrice?: number;
  currency: 'CZK' | 'EUR' | 'USD';

  // Admin Notes
  adminNotes?: string;
  assignedTo?: string; // Admin user ID
}

// Example Document
{
  "id": "res_abc123",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+420123456789",
  "service": "moving",
  "preferredDate": "2024-02-15",
  "preferredTime": "morning",
  "pickupAddress": "Václavská 1, Praha 1",
  "deliveryAddress": "Národní 10, Praha 1",
  "apartmentSize": "65",
  "message": "Moving from 3rd floor to 2nd floor",
  "status": "pending",
  "createdAt": Timestamp.now(),
  "updatedAt": Timestamp.now(),
  "source": "website",
  "locale": "cs",
  "currency": "CZK"
}
```

### 2. `services` Collection

Configuration for available services and pricing.

```typescript
interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  unit: 'hour' | 'square_meter' | 'item' | 'package';
  currency: 'CZK' | 'EUR' | 'USD';
  isActive: boolean;
  requiresAddress: boolean;
  requiresApartmentSize: boolean;
  packages?: ServicePackage[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string; // e.g., "2-4 hours"
  features: string[];
}

// Example Document
{
  "id": "cleaning",
  "name": "Cleaning",
  "description": "Professional cleaning services",
  "basePrice": 900,
  "unit": "package",
  "currency": "CZK",
  "isActive": true,
  "requiresAddress": true,
  "requiresApartmentSize": true,
  "packages": [
    {
      "id": "maintenance",
      "name": "Maintenance Cleaning",
      "description": "For regular maintenance",
      "price": 900,
      "duration": "1.5-2 hours",
      "features": ["Dust surfaces", "Vacuum", "Mop floors"]
    },
    {
      "id": "general",
      "name": "General Cleaning",
      "description": "Deep cleaning",
      "price": 1600,
      "duration": "2-4 hours",
      "features": ["Deep cleaning", "Kitchen", "Bathroom"]
    }
  ],
  "createdAt": Timestamp.now(),
  "updatedAt": Timestamp.now()
}
```

### 3. `pricing` Collection

Dynamic pricing rules and calculations.

```typescript
interface PricingRule {
  id: string;
  serviceId: string;
  packageId?: string;
  basePrice: number;
  pricePerSquareMeter?: number;
  pricePerHour?: number;
  minimumPrice: number;
  maximumPrice?: number;

  // Area-based pricing
  areaRanges?: {
    upTo35: number;
    upTo50: number;
    upTo70: number;
    over70: number;
  };

  // Time-based pricing
  timeMultipliers?: {
    morning: number;
    afternoon: number;
    evening: number;
  };

  // Special conditions
  weekendSurcharge?: number;
  holidaySurcharge?: number;
  urgentSurcharge?: number;

  isActive: boolean;
  validFrom: Timestamp;
  validTo?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Example Document
{
  "id": "cleaning_maintenance",
  "serviceId": "cleaning",
  "packageId": "maintenance",
  "basePrice": 900,
  "minimumPrice": 900,
  "areaRanges": {
    "upTo35": 900,
    "upTo50": 1080,
    "upTo70": 1200,
    "over70": 1300
  },
  "timeMultipliers": {
    "morning": 1.0,
    "afternoon": 1.0,
    "evening": 1.1
  },
  "weekendSurcharge": 0.2,
  "isActive": true,
  "validFrom": Timestamp.now(),
  "createdAt": Timestamp.now(),
  "updatedAt": Timestamp.now()
}
```

### 4. `admin_users` Collection

Administrative users who can manage reservations.

```typescript
interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'operator';
  permissions: string[];
  isActive: boolean;
  lastLogin?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Example Document
{
  "id": "admin_123",
  "email": "admin@movecleanmafia.cz",
  "firstName": "Admin",
  "lastName": "User",
  "role": "admin",
  "permissions": ["read", "write", "delete", "manage_users"],
  "isActive": true,
  "createdAt": Timestamp.now(),
  "updatedAt": Timestamp.now()
}
```

### 5. `settings` Collection

Global application settings and configuration.

```typescript
interface AppSettings {
  id: string;
  key: string;
  value: any;
  description?: string;
  isPublic: boolean;
  updatedAt: Timestamp;
  updatedBy: string;
}

// Example Documents
[
  {
    id: 'business_hours',
    key: 'business_hours',
    value: {
      monday: { start: '08:00', end: '18:00' },
      tuesday: { start: '08:00', end: '18:00' },
      wednesday: { start: '08:00', end: '18:00' },
      thursday: { start: '08:00', end: '18:00' },
      friday: { start: '08:00', end: '18:00' },
      saturday: { start: '09:00', end: '16:00' },
      sunday: { start: '10:00', end: '14:00' },
    },
    description: 'Business operating hours',
    isPublic: true,
    updatedAt: Timestamp.now(),
    updatedBy: 'admin_123',
  },
  {
    id: 'contact_info',
    key: 'contact_info',
    value: {
      phone: '+420123456789',
      email: 'info@movecleanmafia.cz',
      address: 'Prague, Czech Republic',
    },
    description: 'Contact information',
    isPublic: true,
    updatedAt: Timestamp.now(),
    updatedBy: 'admin_123',
  },
];
```

### 6. `notifications` Collection

System notifications and alerts.

```typescript
interface Notification {
  id: string;
  type: 'new_reservation' | 'reservation_update' | 'system_alert';
  title: string;
  message: string;
  recipientId?: string; // Admin user ID
  recipientEmail?: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  relatedReservationId?: string;
  createdAt: Timestamp;
  readAt?: Timestamp;
}

// Example Document
{
  "id": "notif_123",
  "type": "new_reservation",
  "title": "New Reservation Received",
  "message": "New moving service reservation from John Doe",
  "recipientId": "admin_123",
  "isRead": false,
  "priority": "medium",
  "relatedReservationId": "res_abc123",
  "createdAt": Timestamp.now()
}
```

## Security Rules

```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Reservations - public read/write for creation, admin only for updates
    match /reservations/{reservationId} {
      allow read, write: if request.auth != null &&
        (request.auth.token.role == 'admin' ||
         request.auth.token.role == 'manager' ||
         request.auth.token.role == 'operator');
      allow create: if true; // Allow public creation
    }

    // Services - public read, admin write
    match /services/{serviceId} {
      allow read: if true;
      allow write: if request.auth != null &&
        request.auth.token.role == 'admin';
    }

    // Pricing - public read, admin write
    match /pricing/{pricingId} {
      allow read: if true;
      allow write: if request.auth != null &&
        request.auth.token.role == 'admin';
    }

    // Admin users - admin only
    match /admin_users/{userId} {
      allow read, write: if request.auth != null &&
        request.auth.token.role == 'admin';
    }

    // Settings - public read for public settings, admin write
    match /settings/{settingId} {
      allow read: if resource.data.isPublic == true;
      allow write: if request.auth != null &&
        request.auth.token.role == 'admin';
    }

    // Notifications - user can read their own, admin can read all
    match /notifications/{notificationId} {
      allow read: if request.auth != null &&
        (resource.data.recipientId == request.auth.uid ||
         request.auth.token.role == 'admin');
      allow write: if request.auth != null &&
        request.auth.token.role == 'admin';
    }
  }
}
```

## Indexes

```javascript
// Required Firestore Indexes
[
  {
    collectionGroup: 'reservations',
    queryScope: 'COLLECTION',
    fields: [
      { fieldPath: 'status', order: 'ASCENDING' },
      { fieldPath: 'createdAt', order: 'DESCENDING' },
    ],
  },
  {
    collectionGroup: 'reservations',
    queryScope: 'COLLECTION',
    fields: [
      { fieldPath: 'service', order: 'ASCENDING' },
      { fieldPath: 'createdAt', order: 'DESCENDING' },
    ],
  },
  {
    collectionGroup: 'reservations',
    queryScope: 'COLLECTION',
    fields: [
      { fieldPath: 'preferredDate', order: 'ASCENDING' },
      { fieldPath: 'preferredTime', order: 'ASCENDING' },
    ],
  },
  {
    collectionGroup: 'notifications',
    queryScope: 'COLLECTION',
    fields: [
      { fieldPath: 'recipientId', order: 'ASCENDING' },
      { fieldPath: 'isRead', order: 'ASCENDING' },
      { fieldPath: 'createdAt', order: 'DESCENDING' },
    ],
  },
];
```

## Usage Examples

### Creating a New Reservation

```typescript
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const createReservation = async (
  reservationData: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>,
) => {
  const docRef = await addDoc(collection(db, 'reservations'), {
    ...reservationData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};
```

### Querying Reservations

```typescript
import { query, collection, where, orderBy, getDocs } from 'firebase/firestore';

// Get pending reservations
const getPendingReservations = async () => {
  const q = query(
    collection(db, 'reservations'),
    where('status', '==', 'pending'),
    orderBy('createdAt', 'desc'),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get reservations by service type
const getReservationsByService = async (service: string) => {
  const q = query(
    collection(db, 'reservations'),
    where('service', '==', service),
    orderBy('createdAt', 'desc'),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
```

This schema provides a comprehensive foundation for the MoveCleanMafia reservation system with proper security, scalability, and maintainability.
