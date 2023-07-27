import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomTopLayout from './common/CustomTopLayout';
import {useNavigation} from '@react-navigation/native';
import {allImages} from '../utils/images';

const OtherCalculator = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1">
      <CustomTopLayout
        onPress={() => {
          navigation.goBack();
        }}
        name="Other Calculator"
      />
      <Text className="my-0 -mt-1"></Text>
      <ScrollView showsHorizontalScrollIndicator={false} className="mx-5">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DiscountCalculator');
          }}>
          <View className="my-1 px-1">
            <Image
              className=" w-[100%] h-[105px]"
              source={allImages.Discount}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FdCalculator');
          }}>
          <View className="my-1 px-1">
            <Image className=" w-[100%] h-[105px]" source={allImages.FD} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TipCalculator');
          }}>
          <View className="my-1 px-1">
            <Image className=" w-[100%] h-[105px]" source={allImages.Tip} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SipCalculator');
          }}>
          <View className="my-1 px-1">
            <Image className=" w-[100%] h-[105px]" source={allImages.SIP} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RdCalculator');
          }}>
          <View className="my-1 px-1">
            <Image className=" w-[100%] h-[105px]" source={allImages.RD} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('InterestCalculator');
          }}>
          <View className="my-1 px-1">
            <Image
              className=" w-[100%] h-[105px]"
              source={allImages.Interest}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default OtherCalculator;
