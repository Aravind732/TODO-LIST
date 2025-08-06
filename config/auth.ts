// Google OAuth Configuration
// Replace these values with your actual Google Cloud Console credentials

export const GOOGLE_CONFIG = {
  // Your Web Client ID from Google Cloud Console
  // Get this from: https://console.cloud.google.com/apis/credentials
  webClientId: 'YOUR_WEB_CLIENT_ID_HERE',
  
  // Optional: iOS Client ID (if building for iOS)
  iosClientId: 'YOUR_IOS_CLIENT_ID_HERE',
  
  // Optional: Android Client ID (if building for Android)
  androidClientId: 'YOUR_ANDROID_CLIENT_ID_HERE',
  
  // Enable offline access for refresh tokens
  offlineAccess: true,
  
  // Request scopes for user data
  scopes: ['profile', 'email'],
};

// Instructions for setting up Google OAuth:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select existing one
// 3. Enable the Google+ API
// 4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
// 5. Configure the OAuth consent screen
// 6. Create credentials for each platform (Web, iOS, Android)
// 7. Copy the Client IDs and replace the values above
// 8. For iOS/Android, you'll also need to add your app's bundle identifier
//    and SHA-1 fingerprint (for Android)

export default GOOGLE_CONFIG; 