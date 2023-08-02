import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import {allImages} from '../utils/images';
import {useNavigation} from '@react-navigation/native';

const handleOpenGoogleMapsATM = () => {
  // Replace "Custom Search Query" with your desired custom search query
  const searchQuery = "Find near by me ATM";

  // Use the following deep link to open Google Maps with the custom search
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;

  // Open the link using Linking module
  Linking.openURL(url)
    .catch(() => alert('Unable to open Google Maps. Please make sure the Google Maps app is installed.'));
};

const handleOpenGoogleMapsBank = () => {
  // Replace "Custom Search Query" with your desired custom search query
  const searchQuery = "Find near by me Bank";

  // Use the following deep link to open Google Maps with the custom search
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;

  // Open the link using Linking module
  Linking.openURL(url)
    .catch(() => alert('Unable to open Google Maps. Please make sure the Google Maps app is installed.'));
};



const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="">
      <StatusBar backgroundColor="#879DFF" />
      <View>
        <View className="box-content  h-48 w-full rounded-b-[40px] bg-primaryC px-10 py-2 flex-row items-center -mt-12">
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
          <Text className="text-whiteC text-center text-2xl font-bold">
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

        <View className="mx-5 pl-5">
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
                handleOpenGoogleMapsBank()
              }}>
              <Image
                className="w-[160px] h-[140px]"
                source={allImages.FindBank}
                alt="card"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleOpenGoogleMapsATM()
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
