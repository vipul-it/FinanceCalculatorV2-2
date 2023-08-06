import {Image, StatusBar, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      completeOnboarding();
      checkOnboardingStatus();
      // console.log("setTimeout");
    }, 2000);
  }, []);

  const completeOnboarding = async () => {
    // Set the onboarding flag to true in AsyncStorage
    try {
      await AsyncStorage.setItem('@onboarding_complete', 'true');
      // console.log("Async true");
      [];
    } catch (error) {
      // Handle AsyncStorage error
      console.log('Error saving onboarding status: ', error);
    }
  };

  // Check if onboarding flag is set, if so, skip onboarding and navigate to MainApp
  const checkOnboardingStatus = async () => {
    try {
      const onboardingStatus = await AsyncStorage.getItem(
        '@onboarding_complete',
      );
      if (onboardingStatus === 'true') {
        // console.log("async check onboarding status");
        navigation.navigate('Dashboard'); // Replace 'MainApp' with your main app screen name
      } else {
        navigation.navigate('OnboardScreen1'); // Replace 'Onboarding' app screen
      }
    } catch (error) {
      // Handle AsyncStorage error
      console.log('Error getting onboarding status: ', error);
    }
  };

  return (
    <View className="flex-1">
      <StatusBar backgroundColor="#879DFF" />
      <Image
        source={require('../assets/images/SplashScreen.png')}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  );
};

export default SplashScreen;
