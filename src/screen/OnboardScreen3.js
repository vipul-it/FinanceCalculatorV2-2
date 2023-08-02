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
        <View className="flex-row justify-center mt-28">
          <Image className="w-[57px] h-[8px] " source={allImages.Slider3} />
        </View>
        <View className="flex-row justify-center mt-8">
          <Text className="text-whiteC font-normal text-2xl tracking-widest">
            Find{' '}
          </Text>
          <Text className="text-whiteC font-bold text-3xl  tracking-widest">
            Banks and
          </Text>
        </View>
        <View className="flex-row justify-center">
          <Text className="text-whiteC font-bold text-3xl tracking-widest	">
            ATMs{' '}
          </Text>
          <Text className="text-whiteC font-normal text-2xl tracking-widest">
            around you!
          </Text>
        </View>
        <View className="flex-row justify-between	 mx-10">
          <Text></Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Dashboard');
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

export default OnboardScreen3;
