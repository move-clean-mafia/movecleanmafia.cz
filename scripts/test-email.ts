import { sendTestEmail } from '../lib/email-service';

async function testEmailSystem() {
  console.log('🧪 Testing Bilingual Email System...\n');

  // Test email address (you should replace this with a real email for testing)
  const testEmailAddress = 'test@example.com'; // Replace with your email

  console.log('📧 Testing Czech email...');
  try {
    const csResult = await sendTestEmail(testEmailAddress, 'cs');
    if (csResult.success) {
      console.log('✅ Czech email sent successfully!');
      console.log(`📋 Message ID: ${csResult.messageId}`);
    } else {
      console.log('❌ Czech email failed:', csResult.error);
    }
  } catch (error) {
    console.log('❌ Czech email error:', error);
  }

  console.log('\n📧 Testing English email...');
  try {
    const enResult = await sendTestEmail(testEmailAddress, 'en');
    if (enResult.success) {
      console.log('✅ English email sent successfully!');
      console.log(`📋 Message ID: ${enResult.messageId}`);
    } else {
      console.log('❌ English email failed:', enResult.error);
    }
  } catch (error) {
    console.log('❌ English email error:', error);
  }

  console.log('\n🏁 Email testing completed!');
}

// Run the test
testEmailSystem().catch(console.error);
