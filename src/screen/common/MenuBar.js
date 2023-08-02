import {View, Text, TouchableOpacity, Image, Linking, Share} from 'react-native';
import React from 'react';
import {allImages} from '../../utils/images';
import { useNavigation } from '@react-navigation/native';

const MenuBar = () => {
    const navigation =useNavigation();

    const rateHandle = () => {
      const url = `https://play.google.com/store/apps/details?id=com.fin.emi.disccal`;
    
      // Open the link using Linking module
      Linking.openURL(url)
        .catch(() => alert('Link expire.'));
    };

    const shareHandle = async () => {
      try {
        const result = await Share.share({
          message:
            'Download Finance Calculator App https://play.google.com/store/apps/details?id=com.fin.emi.disccal',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    };
  return (
    <View className="flex-1">
      <View className="h-40 w-full rounded-b-[70px] bg-primaryC px-5 py-4">
        <View className="flex-row justify-between">
          <TouchableOpacity className="p-5" onPress={()=>{
            navigation.goBack();
          }}>
            <Image
              className="w-[14px] h-[16px]"
              source={allImages.BackLeftArrow}
            />
          </TouchableOpacity>
          <View className="items-center">
            <Image
              className="w-[72px] h-[72px] rounded-lg"
              source={allImages.Logo72}
            />
            <Text className="mt-3 text-whiteC text-xl font-bold text-center">
              Finance Calculator
            </Text>
          </View>
          <View className="p-6">
            <Text></Text>
          </View>
        </View>
      </View>
      <Text className="mt-2"></Text>

      <TouchableOpacity className="flex-row items-center px-5 h-16 border-b-[0.5px] border-Cgray50"
       onPress={()=>{
        navigation.navigate('Dashboard');
      }}>
        <Image
          className="w-[26px] h-[26px] mr-3"
          source={allImages.MenuPageHome}
        />
        <Text className=" text-primaryHeading text-[18px]  text-center">
          Dashboard
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={rateHandle} className="flex-row items-center px-5 h-16 border-b-[0.5px] border-Cgray50">
        <Image className="w-[26px] h-[26px] mr-3" source={allImages.Rate} />
        <Text className=" text-primaryHeading text-[18px]  text-center">
          Rate App
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={shareHandle} className="flex-row  items-center px-5 h-16 border-b-[0.5px] border-Cgray50">
        <Image className="w-[26px] h-[26px] mr-3" source={allImages.ShareFill} />
        <Text className="text-primaryHeading text-[18px] text-center">
          Share App
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center px-5 h-16 border-b-[0.5px] border-Cgray50">
        <Image className="w-[26px] h-[26px] mr-3" source={allImages.Privacy} />
        <Text className=" text-primaryHeading text-[18px]  text-center">
          Privacy
        </Text>
      </TouchableOpacity>
      <Text className="absolute inset-x-0 bottom-0 h-16 text-primaryHeading text-[14px]  text-center">
        Version: 0.1.1
      </Text>
    </View>
  );
};

export default MenuBar;
