




# fun2

This project was scaffoldede with the (wolmo-bootstrap-react-native)[https://github.com/Wolox/wolmo-bootstrap-react-native] starter template.



====================================

# Prerequisites

Follow the [official guide](https://facebook.github.io/react-native/docs/getting-started.html) to properly setup your environment.
We highly recommend using [nvm](https://github.com/creationix/nvm) instead of brew or aptitude to install nodejs.


# Proyect Set Up

## One time setup

### ENV setup
------------
create the `.env` file on the root.
```
API_BASE_URL=https://XXXXXXXX

OTHER_ENV_VARs=XXXXXXXXXX

```

Where the `API_BASE_URL` is the debug url api.

Then create the `.env.production` file on the root too, with the same data that the last,
but the `API_BASE_URL` must be the production url api.

-----------

### Android

---------------

Set the following variables in `~/.gradle/gradle.properties`
```
MY_PROYECT_RELEASE_STORE_FILE=my_proyect-key.keystore
MY_PROYECT_RELEASE_KEY_ALIAS=my_proyect-key
MY_PROYECT_RELEASE_STORE_PASSWORD=xxxxxxxx
MY_PROYECT_RELEASE_KEY_PASSWORD=xxxxxxxx
```

Update the file `android/app/build.gradle` according to this [guide](https://facebook.github.io/react-native/docs/signed-apk-android.html#adding-signing-config-to-your-app-s-gradle-config) using the variables set in `~/.gradle/gradle.properties`

Generate the file `my_proyect-key.keystore` using the following command from your terminal and place it in the `android/app` folder

```
$ keytool -genkey -v -keystore my_proyect-key.keystore -alias my_proyect-key -keyalg RSA -keysize 2048 -validity 10000

Enter keystore password: xxxxx
Re-enter new password: xxxxx
What is your first and last name?
  [Unknown]:  wolox
What is the name of your organizational unit?
  [Unknown]:  wolox
What is the name of your organization?
  [Unknown]:  wolox
What is the name of your City or Locality?
  [Unknown]:  wolox
What is the name of your State or Province?
  [Unknown]:  wolox
What is the two-letter country code for this unit?
  [Unknown]:  wx
Is CN=wolox, OU=wolox, O=wolox, L=wolox, ST=wolox, C=wx correct?
  [no]:  yes

Generating 2,048 bit RSA key pair and self-signed certificate (SHA256withRSA) with a validity of 10,000 days
	for: CN=wolox, OU=wolox, O=wolox, L=wolox, ST=wolox, C=wx
Enter key password for <my_proyect-key>
	(RETURN if same as keystore password):  xxxxx
Re-enter new password: xxxxx
[Storing my_proyect-key.keystore]
```

--------------

### iOS

--------------

We use [FastLane](https://github.com/Wolox/fastlane-mobile) and few of its plugins to automate many ios tasks:
- Interact with Apple Developer Portal and iTunes Connect.
- Automate code signing (Certificates and provisioning profiles handling. Take a look at [match](https://github.com/fastlane/fastlane/tree/master/match))
- Uploading builds to testflight ([gym](https://github.com/fastlane/fastlane/tree/master/pilot))

#### FastLane setup

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```
Follow this [guide](https://github.com/rvm/rvm) to properly install rvm. This tool will easily allow you to install and change different ruby versions.

Run `rvm -v` to check that it was successfully installed.

The last step is installing Fastlane gems:
```bash
gem install bundler
bundle install
```

# Running aplication

--------------------
To run a Android/Ios simulator with `development` environment, just run:

IOS
`react-native run-ios`

ANDROID
`react-native run-android`

--------------------


--------------------
To run a Android/Ios simulator with `Production` environment, just run:

IOS
`react-native run-ios --configuration Release`

ANDROID
`react-native run-android` and then:
1. Command⌘ + M to launch the developer menu in Android emulator.
2. Tap DevSettings.
3. Toggle JS Dev Mode.

--------------------


# Outputs

## Android
Use the the command in the rootpath to generate the APK:
```
yarn run android:build
```
It will generate the apk file in the path `android/app/build/outputs/apk/app-release.apk`

If you want to test that file in a plugged devise use the command `yarn run android:install` to install it.


## iOS

### Uploading build to testflight
Use the following commands from fun2/ios:

1) We need to create the app in the AppStore first if it isn't already created. You must be use `bundle exec fastlane create_development_app`. The lane depends of environment, you can use `bundle exec fastlane create_stage_app` or ` bundle exec fastlane create_production_app`
2) Then you must be use `bundle exec fastlane release_qa` also there are other lanes to deploy to differents environments. You can use `bundle exec fastlane release_stage` or
`bundle exec fastlane release_production`

Follow the instructions in the [Fastlane README](ios/README.md) that will help you to create apps, certificates, make deploys and more.

--------------------

#### Available Lanes
There is a lot of fastlane lanes that will help you to create apps, certificates, make deploys and more.

Follow the instructions in the [Fastlane README](ios/README.md) to see all available lanes.
