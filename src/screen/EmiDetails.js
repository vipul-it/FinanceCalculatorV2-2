import {View, Text, FlatList, StyleSheet, Alert} from 'react-native';
import React, { useRef } from 'react';
import CustomTopLayout from './common/CustomTopLayout';
import {useNavigation, useRoute} from '@react-navigation/native';
import CalculateButton from './common/CalculateButton';
import {allImages} from '../utils/images';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

const EmiDetails = () => {
  const viewShotRef = useRef(null);

  const captureScreenshot = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      shareScreenshot(uri);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  const shareScreenshot = async uri => {
    const shareOptions = {
      title: 'Share EMI Deatils',
      url: uri,
      type: 'image/jpeg',
      message: 'Calculated by: https://play.google.com/store/apps/details?id=com.fin.emi.disccal'
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing screenshot:', error);
    }
  };

  const navigation = useNavigation();

  const route = useRoute();

  const {mydata} = route.params;

  // Alert.alert(JSON.stringify(mydata));

  // console.log('gdjfdsHDGSASDHgas', mydata);

  const data = [
    {
      id: 1,
      years: 1,
      pricipal: 3288,
      interest: 83,
      Balance: 16701,
    },
    {
      id: 2,
      years: 2,
      pricipal: 3288,
      interest: 83,
      Balance: 16701,
    },
    {
      id: 3,
      years: 3,
      pricipal: 3288,
      interest: 83,
      Balance: 16701,
    },
    {
      id: 4,
      years: 4,
      pricipal: 3288,
      interest: 83,
      Balance: 16701,
    },
    {
      id: 5,
      years: 5,
      pricipal: 3288,
      interest: 83,
      Balance: 16701,
    },
    {
      id: 6,
      years: 6,
      pricipal: 3288,
      interest: 83,
      Balance: 16701,
    },
  ];

  const renderRow = ({item}) => (
    <View className="flex-row justify-between px-3  py-2 border-t-[1px] border-primaryHeading ">
      <View>
        <Text className="text-gray-700">{item.years}</Text>
      </View>
      <View>
        <Text className="text-gray-700">{item.pricipal}</Text>
      </View>
      <View>
        <Text className="text-gray-700">{item.interest}</Text>
      </View>
      <View>
        <Text className="text-gray-700">{item.Balance}</Text>
      </View>
    </View>
  );
  return (
    <View className="flex-1 bg-whiteC">
      <CustomTopLayout
        name="EMI Details"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View className="self-end my-4 mx-9 mt-8">
        <CalculateButton
          name="Share"
          onPress={captureScreenshot}
          srcPath={allImages.Share}
        />
      </View>
      <ViewShot ref={viewShotRef} options={{ fileName: "EMI-Details", format: "jpg", quality: 0.9 }}>
        <View className="mx-5 bg-whiteC p-4 rounded-lg">
          <View className="border-[1px] border-primaryHeading rounded-lg ">
            {/* Table Header */}
            <View className="flex-row bg-primaryDark justify-center px-2 py-2 rounded-t-lg ">
              <View className="">
                <Text className="text-whiteC font-semibold">Loan Details</Text>
              </View>
            </View>

            {/* Table Rows */}
            <View className="flex-row justify-between  border-t-[1px]  border-primaryHeading ">
              <View className="border-r-[1px] border-primaryHeading justify-center items-center flex p-2">
                <Text className="text-primaryHeading ">
                  &#8377; {mydata?.amount}
                </Text>

                <Text className="text-gray-700">Monthly EMI</Text>
              </View>
              <View className="border-r-[1px] border-primaryHeading justify-center items-center flex p-2">
                <Text className="text-primaryHeading ">
                  &#8377; {mydata?.totalInterest}
                </Text>
                <Text className="text-gray-700">Total Interest</Text>
              </View>
              <View className=" justify-center items-center flex p-2">
                <Text className="text-primaryHeading ">
                  &#8377; {mydata?.amount}
                </Text>
                <Text className="text-gray-700">Loan Amount</Text>
              </View>
            </View>
            <View className="flex-row justify-between  border-t-[1px]  border-primaryHeading ">
              <View className="border-r-[1px] border-primaryHeading justify-center items-center flex p-2">
                <Text className="text-primaryHeading ">{mydata?.tenure}</Text>
                <Text className="text-gray-700">Months</Text>
              </View>
              <View className="border-r-[1px] border-primaryHeading justify-center items-center flex p-2">
                <Text className="text-primaryHeading ">
                  {mydata?.interest}%
                </Text>
                <Text className="text-gray-700">Interest Rate</Text>
              </View>
              <View className=" justify-center items-center flex p-2 ">
                <Text className="text-primaryHeading ">
                  &#8377; {mydata?.totalPayment}
                </Text>
                <Text className="text-gray-700">Total Payment</Text>
              </View>
            </View>
          </View>

          <Text className="my-2"></Text>

          <View className="border-[1px] border-primaryHeading rounded-lg ">
          
          <View className="flex-row bg-primaryDark justify-between px-2 py-2 rounded-t-lg ">
            <View className="">
              <Text className="text-whiteC">Years</Text>
            </View>
            <View className="">
              <Text className="text-whiteC">Principal</Text>
            </View>
            <View className="">
              <Text className="text-whiteC">Intrerest</Text>
            </View>
            <View className="">
              <Text className="text-whiteC">Balance</Text>
            </View>
          </View>

          
          <FlatList
            data={data}
            renderItem={renderRow}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        </View>
      </ViewShot>
    </View>
  );
};

export default EmiDetails;
