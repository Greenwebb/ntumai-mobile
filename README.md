# Ntumai Mobile App - TypeScript Implementation

This repository contains the TypeScript implementation of the Ntumai delivery app built with React Native and Expo.

## Features

- **Multi-role Support**: Customer, Vendor, and Driver interfaces
- **Authentication**: Login, signup, OTP verification
- **Customer Features**: Browse products, cart management, checkout, order tracking
- **Vendor Features**: Product management, order fulfillment, sales analytics
- **Driver Features**: Order pickup, delivery management, earnings tracking
- **TypeScript**: Full type safety throughout the application
- **State Management**: Zustand for predictable state management
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Testing**: Jest and React Testing Library

## Project Structure

```
ntumai-ts-app/
├── assets/                  # Static assets (images, fonts)
├── src/
│   ├── components/          # Reusable UI components
│   ├── constants/           # App constants and theme
│   ├── navigation/          # Navigation structure
│   ├── screens/             # Screen components
│   │   ├── auth/            # Authentication screens
│   │   ├── customer/        # Customer screens
│   │   ├── vendor/          # Vendor screens
│   │   └── driver/          # Driver screens
│   ├── store/               # Zustand state management
│   └── types/               # TypeScript type definitions
├── __tests__/               # Test files
├── App.tsx                  # App entry point
├── app.json                 # Expo configuration
├── babel.config.js          # Babel configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/ntumai-ts-app.git
   cd ntumai-ts-app
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```
   npm start
   # or
   yarn start
   ```

4. Open the app on your device or emulator
   - Use the Expo Go app on your device
   - Press 'a' to open on Android emulator
   - Press 'i' to open on iOS simulator

## Key Technologies

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform for React Native
- **TypeScript**: Static type checking
- **NativeWind**: Tailwind CSS for React Native
- **Zustand**: State management
- **React Navigation**: Navigation library
- **Jest & React Testing Library**: Testing framework

## Type Safety Benefits

This TypeScript implementation provides several advantages over the JavaScript version:

1. **Compile-time Error Checking**: Catches type-related errors during development
2. **Improved IDE Support**: Better autocompletion and documentation
3. **Self-documenting Code**: Types serve as documentation
4. **Safer Refactoring**: TypeScript helps identify affected code during changes
5. **Enhanced Component Props**: Clear interface for component properties

## Testing

Run the test suite with:

```
npm test
# or
yarn test
```

The test suite includes:
- Component tests
- Store tests
- Navigation tests
- Screen tests

## Building for Production

To create a production build:

```
expo build:android
# or
expo build:ios
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
