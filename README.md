# Calorie Tracker

A SwiftUI iOS app that helps you track calories and lose weight by analyzing food photos.

## Features

- **Food Photo Analysis**: Take a photo of your food and get instant calorie estimates using Apple's Vision framework
- **Smart Food Database**: 50+ common foods with full nutrition data (calories, protein, carbs, fat)
- **Personalized Calorie Targets**: Uses Mifflin-St Jeor equation to calculate your BMR, TDEE, and daily calorie target based on your weight loss goals
- **Dashboard**: Visual calorie ring showing daily progress, macro breakdown, and recent food entries
- **Food Log**: Browse and manage food entries by date with swipe-to-delete
- **Manual Entry**: Search the built-in food database or manually enter nutrition info
- **Profile & Goals**: Track your weight loss progress with a visual timeline

## User Profile (Default)

| Stat | Value |
|------|-------|
| Weight | 215 lbs |
| Height | 5'10" (70 in) |
| Age | 36 years |
| Goal Weight | 180 lbs |
| Goal Timeline | 6 months |
| Activity Level | Lightly Active |

### Calculated Values

- **BMR**: ~1,911 cal/day (Mifflin-St Jeor)
- **TDEE**: ~2,628 cal/day (lightly active)
- **Daily Target**: ~1,955 cal/day (for ~1.35 lbs/week loss)

## Architecture

- **Pattern**: MVVM (Model-View-ViewModel)
- **Persistence**: SwiftData (iOS 17+)
- **UI Framework**: SwiftUI
- **Image Analysis**: Vision framework + CoreML

### Project Structure

```
CalorieTracker/
├── App/                    # App entry point, Info.plist
├── Models/                 # SwiftData models (UserProfile, FoodEntry)
├── ViewModels/             # Observable view models
├── Views/
│   ├── Dashboard/          # Calorie ring, daily summary
│   ├── FoodLog/            # Food entry list, manual entry form
│   ├── Camera/             # Photo capture, food analysis results
│   └── Profile/            # User stats, goal progress
├── Services/               # CalorieCalculator, FoodClassifier, FoodDatabase
├── Utilities/              # Extensions, constants
└── Resources/              # Assets
```

## Requirements

- iOS 17.0+
- Xcode 15.0+
- Swift 5.9+

## Getting Started

1. Open `CalorieTracker.xcodeproj` in Xcode
2. Select your target device or simulator
3. Build and run (Cmd+R)
4. Grant camera permissions when prompted (for food photo analysis)

## How It Works

1. **Take a Photo**: Use the "Scan Food" tab to photograph your meal
2. **Review Results**: The app analyzes the photo and suggests matching foods
3. **Confirm & Edit**: Select the best match, adjust calories if needed
4. **Track Progress**: View your daily intake on the Dashboard
