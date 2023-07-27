import {View, Text, TextInput, Image, Alert, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomTopLayout from './common/CustomTopLayout';
import SubHeading from './common/SubHeading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allImages} from '../utils/images';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const ChangeCurrency = () => {
  const navigation = useNavigation();
  const [showImage1, setShowImage1] = useState(true);
  const [showImage2, setShowImage2] = useState(false);

  const swapImages = () => {
    setShowImage1(!showImage1);
    setShowImage2(!showImage2);
  };

  

  const [amountINR, setAmountINR] = useState('');
  const [amountUSD, setAmountUSD] = useState('');

  const convertCurrency = async () => {
    try {
      const response = await axios.get(
        'http://api.exchangeratesapi.io/latest?access_key=738525856d507c76cc213eafe08c6b3c'
      );
      
      // Check if the API call was successful
      if (response.data.result === 'success') {
        const conversionRate = response.data.conversion_rates.USD;
        const convertedAmount = parseFloat(amountINR) * conversionRate;
        setAmountUSD(convertedAmount.toFixed(2));
      } else {
        Alert.alert('Error', 'Unable to fetch exchange rate data.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  

  return (
    <View>
      <CustomTopLayout
        onPress={() => {
          navigation.goBack();
        }}
        name="Currency Converter"
      />
      <View className="mx-5 mt-1">
        <SubHeading name="Enter Amount" />
        <KeyboardAwareScrollView>
          <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5 pr-12">
            <TextInput
              className="w-full text-blackC"
              placeholder="eg. 10000"
              keyboardType="numeric"
              value={amountINR}
        onChangeText={(text) => setAmountINR(text)}
            />
          </View>
        </KeyboardAwareScrollView>
        <View className="mt-[24px] mb-2 flex-row mx-5 items-center justify-between">
          <View className="w-[49%] flex justify-center">
            <Text className=" text-center py-2 text-lg  text-primaryHeading">
              From
            </Text>
          </View>
          <View className="w-[49%] flex justify-center">
            <Text className=" text-center py-2 text-lg text-primaryHeading">
              To
            </Text>
          </View>
        </View>
        <View className="mt-[4px] mb-2 flex-row mx-5 items-center justify-between">
          <View className="w-[35%] flex justify-center">
            <TouchableOpacity>
              {showImage1 ? (
                <View className="flex-row justify-center items-center text-whiteC text-center py-2 px-3  rounded-md bg-primaryDark">
                  <Image source={allImages.IndianFlag} className="mr-2" />
                  <Text className="text-whiteC ">INR</Text>
                </View>
              ) : (
                <View className="flex-row justify-center items-center text-whiteC text-center py-2 px-3  rounded-md bg-primaryDark">
                  <Image source={allImages.UsaFlag} className="mr-2" />
                  <Text className="text-whiteC ">USD</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View className="w-[10%] flex justify-center">
            <TouchableOpacity onPress={swapImages}>
              <Image
                className=" w-6 h-6 py-2 px-2 "
                source={allImages.ConverterArrow}
              />
            </TouchableOpacity>
          </View>
          <View className="w-[35%] flex justify-center">
            <TouchableOpacity>
              {showImage2 ? (
                <View className="flex-row justify-center items-center text-whiteC text-center py-2 px-3  rounded-md bg-primaryDark">
                  <Image source={allImages.IndianFlag} className="mr-2" />
                  <Text className="text-whiteC ">INR</Text>
                </View>
              ) : (
                <View className="flex-row justify-center items-center text-whiteC text-center py-2 px-3  rounded-md bg-primaryDark">
                  <Image source={allImages.UsaFlag} className="mr-2" />
                  <Text className="text-whiteC ">USD</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-center py-2 pt-5 text-lg font-semibold text-[#6C2929]">
          {amountINR} INR = {amountUSD} USD
          
        </Text>

        <TouchableOpacity
          onPress={() => {
            convertCurrency()
          }}
          className=" ">
          <View className=" text-whiteC mx-24 mt-5 py-2 px-3 rounded-md bg-primaryDark">
            <Text className="text-whiteC text-center ">Convert</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangeCurrency;
