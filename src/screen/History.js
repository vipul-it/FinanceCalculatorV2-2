import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {allImages} from '../utils/images';
import {useNavigation} from '@react-navigation/native';
import CustomTopLayout from './common/CustomTopLayout';

const History = () => {
  const navigation = useNavigation();
  return (
    <View>
      <CustomTopLayout
        onPress={() => {
          navigation.goBack();
        }}
        name="History"
      />
      <View className="">
        <ScrollView className="mb-28 mt-5">
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EmiHistory');
              }}>
              <View className="flex-row border-[1px] border-Cgray50 justify-between mx-5 items-center rounded-lg p-4 px-8 my-1">
                <View className="flex-row  items-center">
                  <View>
                    <Text className="text-primaryDark font-semibold">
                      EMI Calculator
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    className="w-[8px] h-[12px]"
                    source={allImages.RightArrow}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TipHistory');
              }}>
              <View className="flex-row border-[1px] border-Cgray50 justify-between mx-5 items-center rounded-lg p-4 px-8 my-1">
                <View className="flex-row  items-center">
                  <View>
                    <Text className="text-primaryDark font-semibold">
                      TIP Calculator
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    className="w-[8px] h-[12px]"
                    source={allImages.RightArrow}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('InterestCalculatorHistoryPeriod');
              }}>
              <View className="flex-row border-[1px] border-Cgray50 justify-between mx-5 items-center rounded-lg p-4 px-8 my-1">
                <View className="flex-row  items-center">
                  <View>
                    <Text className="text-primaryDark font-semibold">
                      Interest Calculator
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    className="w-[8px] h-[12px]"
                    source={allImages.RightArrow}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DiscountHistory');
              }}>
              <View className="flex-row border-[1px] border-Cgray50 justify-between mx-5 items-center rounded-lg p-4 px-8 my-1">
                <View className="flex-row  items-center">
                  <View>
                    <Text className="text-primaryDark font-semibold">
                      Discount Calculator
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    className="w-[8px] h-[12px]"
                    source={allImages.RightArrow}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FdCalculatorHistory');
              }}>
              <View className="flex-row border-[1px] border-Cgray50 justify-between mx-5 items-center rounded-lg p-4 px-8 my-1">
                <View className="flex-row  items-center">
                  <View>
                    <Text className="text-primaryDark font-semibold">
                      FD Calculator
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    className="w-[8px] h-[12px]"
                    source={allImages.RightArrow}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CompareLoanHistory');
              }}>
              <View className="flex-row border-[1px] border-Cgray50 justify-between mx-5 items-center rounded-lg p-4 px-8 my-1">
                <View className="flex-row  items-center">
                  <View>
                    <Text className="text-primaryDark font-semibold">
                      Compare Loan Calculator
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    className="w-[8px] h-[12px]"
                    source={allImages.RightArrow}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SipCalculatorHistory');
              }}>
              <View className="flex-row border-[1px] border-Cgray50 justify-between mx-5 items-center rounded-lg p-4 px-8 my-1">
                <View className="flex-row  items-center">
                  <View>
                    <Text className="text-primaryDark font-semibold">
                      SIP Calculator
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    className="w-[8px] h-[12px]"
                    source={allImages.RightArrow}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PrePaymentsHistoryPre');
              }}>
              <View className="flex-row border-[1px] border-Cgray50 justify-between mx-5 items-center rounded-lg p-4 px-8 my-1">
                <View className="flex-row  items-center">
                  <View>
                    <Text className="text-primaryDark font-semibold">
                      Pre Payment Calculator
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    className="w-[8px] h-[12px]"
                    source={allImages.RightArrow}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PrePaymentsHistoryRoi');
              }}>
              <View className="flex-row border-[1px] border-Cgray50 justify-between mx-5 items-center rounded-lg p-4 px-8 my-1">
                <View className="flex-row  items-center">
                  <View>
                    <Text className="text-primaryDark font-semibold">
                      Revised Calculator
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    className="w-[8px] h-[12px]"
                    source={allImages.RightArrow}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default History;
