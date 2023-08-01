import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomTopLayout from './common/CustomTopLayout';
import SubHeading from './common/SubHeading';
import {allImages} from '../utils/images';
import {useNavigation} from '@react-navigation/native';

const ChangeCurrency = () => {
  const navigation = useNavigation();
  const [showImage1, setShowImage1] = useState(false);
  const [showImage2, setShowImage2] = useState(true);
  const [ChangeInputText, setChangeInputText] = useState(true);
  const [ChangeOutputText, setChangeOutputText] = useState(true);

  const swapImages = () => {
    setShowImage1(!showImage1);
    setShowImage2(!showImage2);
    setAmountINR('');
    setAmountUSD('');
    setChangeInputText(!ChangeInputText);
    setChangeOutputText(!ChangeOutputText);
  };
  

  const [amountINR, setAmountINR] = useState('');
  const [amountUSD, setAmountUSD] = useState('');
  const [apiINR, setApiINR] = useState('');
  const [apiUSD, setApiUSD] = useState('');

  const getData = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=17e0802065c641ba9550a40097ed57b0',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        setApiUSD(result.rates.USD);
        setApiINR(result.rates.INR);
        // console.log('========', apiUSD);
        // console.log('========', apiINR);
      })
      // .then(result => console.log(result.rates.USD))
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    getData();
  }, []);

  const getDataUSD = () => {
    const convertedAmount = amountUSD * apiINR;
    setAmountINR(convertedAmount.toFixed(2));
  };

  const getDataINR = () => {
    const convertedAmountINR = apiUSD / apiINR * amountINR;
    setAmountUSD(convertedAmountINR.toFixed(2));
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
        {ChangeInputText ? (
          <View>
            <SubHeading name="Enter Amount ($)" />
            <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5 pr-12">
              <TextInput
                className="w-full text-blackC"
                placeholder="$ 100"
                keyboardType="numeric"
                value={amountUSD}
                onChangeText={setAmountUSD}
              />
            </View>
          </View>
        ) : (
          <View>
            <SubHeading name="Enter Amount (&#8377;)" />
            <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5 pr-12">
              <TextInput
                className="w-full text-blackC"
                placeholder="&#8377; 1000"
                keyboardType="numeric"
                value={amountINR}
                onChangeText={setAmountINR}
              />
            </View>
          </View>
        )}

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
        {ChangeOutputText ? (
          <Text className="text-center py-2 pt-5 text-lg font-semibold text-[#6C2929]">
            $ {amountUSD} USD = &#8377; {amountINR} INR
          </Text>
        ) : (
          <Text className="text-center py-2 pt-5 text-lg font-semibold text-[#6C2929]">
            &#8377; {amountINR} INR = $ {amountUSD} USD
          </Text>
        )}

        {ChangeOutputText ? (
          <TouchableOpacity
            onPress={() => {
              getDataUSD();
            }}
            className=" ">
            <View className=" text-whiteC mx-24 mt-5 py-2 px-3 rounded-md bg-primaryDark">
              <Text className="text-whiteC text-center ">Convert</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              getDataINR();
            }}
            className=" ">
            <View className=" text-whiteC mx-24 mt-5 py-2 px-3 rounded-md bg-primaryDark">
              <Text className="text-whiteC text-center ">Convert</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ChangeCurrency;
