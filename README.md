# Banking Application Client
Mobile app created using the Angular and Ionic frameworks.

Provides functionality of creating an account as a natural or juridical person, as well as log into an existing account, order a domestic transfer, or check the transaction history

## Requirements
* Node.js (version 20.x or higher)
* npm (version 10.x or higher)
* Angular CLI
* Ionic CLI

## Installation
Cloning a repository:  
`git clone https://github.com/AndreSoftwareDeveloper/bankingApplication_Client`
`cd bankingApplication_Client`

Installing dependencies:  
` npm install`

## Startup:
To run the application in developer mode, use the following command:  
`ionic serve`
The application will be available at http://localhost:8100/.

## Deployment
Add an Android platform:  
`npx cap add android`

Build an application in production mode:  
`ionic build --prod`

Sync your project with Capacitor:  
`npx cap sync`

Open the project in Android Studio:  
`npx cap open android`
Android Studio will open the project. You can build and run the application on emulator, or physical device.

Building the APK file:
* In Android Studio, select __Build__ > __Build App Bundle(s) / APK(s)__ > __Build APK(s)__
* Find generated APK file in __app/build/outputs/apk/release__
