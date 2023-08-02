import {Image, StatusBar, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {allImages} from '../utils/images';

const OnboardScreen1 = () => {
  const navigation = useNavigation();

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
          className="-mb-24 ml-[4%]  w-[342px] h-[305px]"
          source={allImages.Illustration1}
        />
      </View>

      <View className=" flex h-[100%] w-full  rounded-t-[70px] bg-primaryC py-3 ">
        <View className="flex-row justify-center mt-28">
          <Image className="w-[57px] h-[8px] " source={allImages.Slider1} />
        </View>
        <View className="flex-row justify-center mt-8">
          <Text className="text-whiteC font-bold text-2xl  tracking-widest">
            Take control{' '}
          </Text>
          <Text className="text-whiteC font-normal text-xl tracking-widest">
            of your{' '}
          </Text>
        </View>
        <View className="flex-row justify-center">
          <Text className="text-whiteC font-normal text-xl tracking-widest	">
            finances today!
          </Text>
        </View>
        <View className="flex-row justify-between	 mx-10">
          <Text></Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('OnboardScreen2');
            }}>
            <Image
              className="mt-24 w-[136px] h-[53px]"
              source={allImages.Next1}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnboardScreen1;
