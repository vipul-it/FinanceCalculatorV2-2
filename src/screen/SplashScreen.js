import {Image, StatusBar, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      checkOnboardingStatus();
    }, 2000);
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('@onboarding_done');
      if (value === 'true') {
        // User has seen onboarding before, navigate to dashboard
        navigation.navigate('Dashboard');
      } else {
        // User has not seen onboarding, continue showing onboarding
        await AsyncStorage.setItem('@onboarding_done', 'true');
        navigation.navigate('OnboardScreen1');
      }
    } catch (error) {
      // Handle AsyncStorage read/write errors
      console.error('AsyncStorage error:', error);
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
