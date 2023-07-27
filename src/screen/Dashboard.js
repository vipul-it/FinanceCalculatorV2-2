import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {allImages} from '../utils/images';
import {useNavigation} from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="">
      <StatusBar backgroundColor="#879DFF" />
      <View>
        <View className="box-content  h-48 w-full rounded-b-[40px] bg-primaryC px-5 py-2 flex-row items-center -mt-12">
          <TouchableOpacity>
          <TouchableOpacity
              onPress={() => {
                navigation.navigate('MenuBar');
              }}><Image
              className="w-[25px] h-[14px] mr-4"
              source={allImages.Menu}
              alt="menu"
            /></TouchableOpacity>
          </TouchableOpacity>
          <Text className="text-whiteC text-2xl font-bold">
            Finance Calculator
          </Text>
        </View>
        <View className="mx-5  items-center">
          <View className="flex-row -mt-12 ">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Emicalculator');
              }}>
              <Image
                className="w-[160px] h-[140px]"
                source={allImages.BankAccountCard1}
                alt="card"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('OtherCalculator');
              }}>
              <Image
                className="w-[160px] h-[140px]"
                source={allImages.BankAccountCard2}
                alt="card"
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PrePayments');
              }}>
              <Image
                className="w-[160px] h-[140px]"
                source={allImages.BankAccountCard3}
                alt="card"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('History');
              }}>
              <Image
                className="w-[160px] h-[140px]"
                source={allImages.BankAccountCard4}
                alt="card"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mx-5 pl-6">
          <Text className=" my-4 text-primaryHeading text-2xl font-bold">
            Value of Your money
          </Text>
        </View>
        <View className="mx-5  items-center">
          <View className="flex-row  ">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CompareLoan');
              }}>
              <Image
                className="w-[160px] h-[140px]"
                source={allImages.CompareLoan}
                alt="card"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChangeCurrency');
              }}>
              <Image
                className="w-[160px] h-[140px]"
                source={allImages.ChangeCurrency}
                alt="card"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mx-5  items-center">
          <View className="flex-row  ">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FindBank');
              }}>
              <Image
                className="w-[160px] h-[140px]"
                source={allImages.FindBank}
                alt="card"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FindAtm');
              }}>
              <Image
                className="w-[160px] h-[140px]"
                source={allImages.FindAtm}
                alt="card"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
