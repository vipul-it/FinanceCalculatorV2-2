import {Image, StatusBar, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {allImages} from '../utils/images';

const OnboardScreen2 = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 ">
      <StatusBar backgroundColor="#879DFF" />
      <View className="flex-row justify-between mx-5 my-7">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('OnboardScreen1');
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
          className="-mb-20 ml-[4%] mt-4  w-[300px] h-[292px]"
          source={allImages.Illustration2}
        />
      </View>

      <View className=" flex h-[100%] w-full  rounded-t-[70px] bg-primaryC py-3 ">
        <View className="flex-row justify-center mt-28">
          <Image className="w-[57px] h-[8px] " source={allImages.Slider2} />
        </View>
        <View className="flex-row justify-center mt-8">
          <Text className="text-whiteC font-bold text-3xl  tracking-widest">
            Calculate{' '}
          </Text>
          <Text className="text-whiteC font-normal text-2xl tracking-widest">
            everything{' '}
          </Text>
        </View>
        <View className="flex-row justify-center">
          <Text className="text-whiteC font-normal text-2xl tracking-widest	">
            in one place!
          </Text>
        </View>
        <View className="flex-row justify-between	 relative">
          <Text></Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('OnboardScreen3');
            }}>
            <Image
              className="absolute top-24 right-8 w-[120px] h-[45px]"
              source={allImages.Next1}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnboardScreen2;
