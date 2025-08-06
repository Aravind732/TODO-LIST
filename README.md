# TodoMaster - Todo List App with Google Authentication

A beautiful and modern todo list application built with React Native and Expo, featuring Google authentication and a clean, intuitive user interface.

## Features

- 🔐 **Google Authentication** - Secure login with Google accounts
- 📝 **Todo Management** - Create, edit, and delete todos
- 🎯 **Priority Levels** - Set high, medium, or low priority for tasks
- ✅ **Progress Tracking** - Visual progress bar and completion statistics
- 💾 **Local Storage** - Todos are saved locally per user
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- 📱 **Cross Platform** - Works on iOS, Android, and Web

## Screenshots

The app features:
- Beautiful login screen with Google authentication
- Clean todo list interface with priority badges
- Progress tracking with visual indicators
- User profile with avatar and sign-out functionality
- Add todo modal with priority selection

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Google Cloud Console account (for OAuth setup)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Google OAuth**

   To enable Google authentication, you need to set up OAuth credentials:

   a. Go to the [Google Cloud Console](https://console.cloud.google.com/)
   b. Create a new project or select an existing one
   c. Enable the Google+ API
   d. Go to "Credentials" and create an OAuth 2.0 Client ID
   e. Add your app's bundle identifier and SHA-1 fingerprint
   f. Copy the Web Client ID

4. **Configure Google Sign-In**

   Update the `webClientId` in `components/AuthContext.tsx`:
   ```typescript
   GoogleSignin.configure({
     webClientId: 'YOUR_ACTUAL_WEB_CLIENT_ID_HERE',
     offlineAccess: true,
   });
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

## Usage

### Authentication
- Tap "Continue with Google" to sign in with your Google account
- Your profile picture and email will be displayed in the app
- Tap "Sign Out" to log out of the application

### Managing Todos
- Tap the "+" button to add a new todo
- Enter the todo text and select a priority level
- Tap the checkbox to mark a todo as complete
- Tap the "×" button to delete a todo
- Pull down to refresh the todo list

### Priority Levels
- **High Priority** (Red) - Important and urgent tasks
- **Medium Priority** (Orange) - Important but not urgent tasks
- **Low Priority** (Green) - Nice to have tasks

## Project Structure

```
todo-app/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Main screen with auth logic
│   │   └── _layout.tsx        # Tab navigation layout
│   └── _layout.tsx            # Root layout with AuthProvider
├── components/
│   ├── AuthContext.tsx        # Authentication context
│   ├── LoginScreen.tsx        # Google login screen
│   ├── TodoListScreen.tsx     # Main todo list interface
│   ├── TodoItem.tsx           # Individual todo item component
│   └── AddTodoModal.tsx       # Modal for adding new todos
├── assets/                    # Images, fonts, and other assets
└── package.json              # Dependencies and scripts
```

## Dependencies

- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **@react-native-google-signin/google-signin** - Google authentication
- **@react-native-async-storage/async-storage** - Local data storage
- **expo-auth-session** - Authentication session management
- **expo-crypto** - Cryptographic utilities

## Development

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint

### Building for Production

1. **Configure app.json** with your app details
2. **Build for platforms**:
   ```bash
   expo build:android
   expo build:ios
   ```

## Troubleshooting

### Google Sign-In Issues
- Ensure your OAuth client ID is correctly configured
- Check that your app's bundle identifier matches the one in Google Cloud Console
- Verify that the Google+ API is enabled

### Build Issues
- Clear Expo cache: `expo r -c`
- Reset Metro cache: `npx react-native start --reset-cache`
- Check for dependency conflicts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section
2. Search existing issues
3. Create a new issue with detailed information

---

**Happy Todo-ing! 🎉**
