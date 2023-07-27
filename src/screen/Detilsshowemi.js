import {View, Text, FlatList, StyleSheet, Alert} from 'react-native';
import React from 'react';
import CustomTopLayout from './common/CustomTopLayout';
import {useNavigation, useRoute} from '@react-navigation/native';
import CalculateButton from './common/CalculateButton';
import {allImages} from '../utils/images';

const Detilsshowemi = () => {
  const route = useRoute();

  const {montly, total, loan, monts, intrest, totalintrest} = route.params;

  const navigation = useNavigation();

  // const route = useRoute();

  // const { mydata } = route.params;

  // Alert.alert(JSON.stringify(mydata))

  // console.log('gdjfdsHDGSASDHgas',mydata)

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
    <View className="flex-1">
      <CustomTopLayout
        name="EMI Details"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <View className="mx-5 mt-8">
        {/* <View className="self-end ">
          <CalculateButton name="Share" srcPath={allImages.Share} />
        </View> */}

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
              <Text className="text-primaryHeading ">&#8377; {montly}</Text>
              {/*  montly,total,loan,monts,intrest,totalintrest */}
              <Text className="text-gray-700">Monthly EMI</Text>
            </View>
            <View className="border-r-[1px] border-primaryHeading justify-center items-center flex p-2">
              <Text className="text-primaryHeading ">
                &#8377; {totalintrest}
              </Text>
              <Text className="text-gray-700">Total Interest</Text>
            </View>
            <View className=" justify-center items-center flex p-2">
              <Text className="text-primaryHeading ">&#8377; {loan}</Text>
              <Text className="text-gray-700">Loan Amount</Text>
            </View>
          </View>
          <View className="flex-row justify-between  border-t-[1px]  border-primaryHeading ">
            <View className="border-r-[1px] border-primaryHeading justify-center items-center flex p-2">
              <Text className="text-primaryHeading ">{monts}</Text>
              <Text className="text-gray-700">Months</Text>
            </View>
            <View className="border-r-[1px] border-primaryHeading justify-center items-center flex p-2">
              <Text className="text-primaryHeading ">{intrest}</Text>
              <Text className="text-gray-700">Interest Rate</Text>
            </View>
            <View className=" justify-center items-center flex p-2 ">
              <Text className="text-primaryHeading ">&#8377; {total}</Text>
              <Text className="text-gray-700">Total Payment</Text>
            </View>
          </View>
        </View>

        <Text className="my-2"></Text>

        {/* <View className="border-[1px] border-primaryHeading rounded-lg ">
        
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
        </View> */}
      </View>
    </View>
  );
};

export default Detilsshowemi;
