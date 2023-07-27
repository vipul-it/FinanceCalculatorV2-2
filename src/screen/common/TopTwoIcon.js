import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {allImages} from '../../utils/images';

const TopTwoIcon = ({name, onPressRight, onPressLeft}) => {
  return (
    <View className="">
      <View className="h-20 w-full border-0 rounded-b-[70px] bg-primaryC px-5 py-4">
        <View className="flex-row items-center justify-between">
          <View className="">
            <TouchableOpacity onPress={onPressLeft} className="p-5">
              <Image
                className="w-[14px] h-[16px]"
                source={allImages.BackLeftArrow}
              />
            </TouchableOpacity>
          </View>
          <View className="flex ">
            <Text className="text-whiteC text-2xl font-bold ">{name}</Text>
          </View>
          <View className="">
            <TouchableOpacity onPress={onPressRight} className="p-5">
              <Image
                className="w-[14px] h-[18px]"
                source={allImages.Delete}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TopTwoIcon;
