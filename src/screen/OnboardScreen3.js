import {Image, StatusBar, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {allImages} from '../utils/images';

const OnboardScreen3 = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 ">
      <StatusBar backgroundColor="#879DFF" />
      <View className="flex-row justify-between mx-5 my-7">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('OnboardScreen2');
          }}>
          <Image className="w-6 h-6" source={allImages.ArrowRightD} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Dashboard');
          }}>
          <Text className="text-[#7F45FF] text-lg font-bold">Skip</Text>
        </TouchableOpacity>
      </View>
      <View className="z-10 flex items-center">
        <Image
          className="-mb-24 ml-[4%] mt-14  w-[257px] h-[265px]"
          source={allImages.Illustration3}
        />
      </View>

      <View className=" flex h-[100%] w-full  rounded-t-[70px] bg-primaryC py-3 ">
        <View className="flex-row justify-center mt-28 ">
          <Image className="w-[58px] h-[8px]" source={allImages.Slider3} />
        </View>
        <View className="flex-row justify-center mt-8">
          <Text className="text-whiteC font-[300] text-[28px] tracking-wider">
            Find{' '}
          </Text>
          <Text className="text-whiteC font-[800] text-[32px]  tracking-widest leading-normal">
            Banks and
          </Text>
        </View>
        <View className="flex-row justify-center">
          <Text className="text-whiteC font-[800] text-[32px]  tracking-widest leading-normal">
            ATMs{' '}
          </Text>
          <Text className="text-whiteC font-[300] text-[28px] tracking-wider">
            around you!
          </Text>
        </View>
        <View className="flex-row justify-between	relative">
          <Text></Text>
          <View className="absolute top-28 right-5"><TouchableOpacity
            onPress={() => {
              navigation.navigate('Dashboard');
            }}>
            <Image
              className=" w-[136px] h-[53px]"
              source={allImages.Next3}
            />
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OnboardScreen3;
