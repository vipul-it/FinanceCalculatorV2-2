import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {allImages} from '../../utils/images';

const CustomTopLayout = ({name, onPress}) => {
  return (
    <View className="">
      <View className="h-20 w-full rounded-b-[70px] bg-primaryC px-8 py-4">
        <View className="flex-row items-center justify-between  ">
          <View className="-mr-[16%]">
            <TouchableOpacity onPress={onPress} className="p-5">
              <Image
                className="w-[14px] h-[16px]"
                source={allImages.BackLeftArrow}
              />
            </TouchableOpacity>
          </View>
          <View className=" ">
            <Text className="text-whiteC text-2xl font-bold ">{name}</Text>
          </View>
          <View>
            <Text></Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomTopLayout;
