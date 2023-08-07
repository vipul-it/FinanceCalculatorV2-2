import {Image, StatusBar, Text, View, TouchableOpacity} from 'react-native';
import React ,{useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {allImages} from '../utils/images';
import AsyncStorage from '@react-native-async-storage/async-storage';


const OnboardScreen1 = () => {
  const navigation = useNavigation();

  // const checkOnboardingStatus = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@onboarding_done');
  //     if (value === 'true') {
  //       // User has seen onboarding before, navigate to dashboard
  //       navigation.navigate('Dashboard');
  //     } else {
  //       // User has not seen onboarding, continue showing onboarding
  //       await AsyncStorage.setItem('@onboarding_done', 'true');
  //     }
  //   } catch (error) {
  //     // Handle AsyncStorage read/write errors
  //     console.error('AsyncStorage error:', error);
  //   }
  // };

  // useEffect(() => {
  //   checkOnboardingStatus();
  // }, []);

  return (
    <View className="flex-1 ">
      <StatusBar backgroundColor="#879DFF" />
      <View className="flex-row justify-between mx-5 my-7">
        <Text></Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Dashboard');
          }}>
          <Text className="text-[#7F45FF] text-lg font-bold">Skip</Text>
        </TouchableOpacity>
      </View>
      <View className="z-10 flex items-center">
        <Image
          className="-mb-20 mt-2 ml-[4%]  w-[342px] h-[305px]"
          source={allImages.Illustration1}
        />
      </View>

      <View className=" flex h-[100%] w-full  rounded-t-[70px] bg-primaryC py-3 ">
        <View className="flex-row justify-center mt-28">
          <Image className="w-[57px] h-[8px] " source={allImages.Slider1} />
        </View>
        <View className="flex-row justify-center mt-8">
          <Text className="text-whiteC font-[800] text-[32px]  tracking-widest">
            Take control{' '}
          </Text>
          <Text className="text-whiteC font-[300] text-[28px] tracking-wider">
            of your{' '}
          </Text>
        </View>
        <View className="flex-row justify-center">
          <Text className="text-whiteC font-[300] text-3xl tracking-wider">
            finances today!
          </Text>
        </View>
        <View className="flex-row justify-between relative">
          <Text></Text>
          <View className="absolute top-28 -mt-1 right-5"><TouchableOpacity
            onPress={() => {
              navigation.navigate('OnboardScreen2');
            }}>
            <Image
              className=" w-[136px] h-[53px]"
              source={allImages.Next1}
            />
          </TouchableOpacity></View>
        </View>
      </View>
    </View>
  );
};

export default OnboardScreen1;
