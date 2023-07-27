import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CustomTopLayout from '../common/CustomTopLayout';
import {useNavigation} from '@react-navigation/native';
import SubHeading from '../common/SubHeading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CalculateButton from '../common/CalculateButton';
import {allImages} from '../../utils/images';

const SipCalculator = () => {
  const navigation = useNavigation();

  const [totalInvestmentAmount, setTotalInvestmentAmount] = useState('');
  const [expectedReturnRate, setExpectedReturnRate] = useState('');
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');
  const [investedAmount, setInvestedAmount] = useState('');
  const [totalProfit, setTotalProfit] = useState('');
  const [totalReturn, setTotalReturn] = useState('');

  //   Reset data
  const resetData = () => {
    setInvestmentAmount('');
    setExpectedReturnRate('');
    setYears('');
    setMonths('');
    setTotalProfit('');
    setTotalReturn('');
  };

  const handleCalculateButton = () => {
    Keyboard.dismiss();
    calculateSIP();
  };
  const calculateSIP = () => {
    // Basic validation
    if (
      totalInvestmentAmount === '' ||
      expectedReturnRate === '' ||
      years === '' ||
      months === ''
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const totalMonths = parseInt(years) * 12 + parseInt(months);
    const monthlyInvestment = parseFloat(totalInvestmentAmount) / totalMonths;

    const compoundInterest =
      Math.pow(1 + parseFloat(expectedReturnRate) / 100, totalMonths) - 1;

    const calculatedInvestedAmount = monthlyInvestment * totalMonths;
    const calculatedTotalProfit = calculatedInvestedAmount * compoundInterest;
    const calculatedTotalReturn =
      calculatedInvestedAmount + calculatedTotalProfit;

    setInvestedAmount(calculatedInvestedAmount.toFixed(2));
    setTotalProfit(calculatedTotalProfit.toFixed(2));
    setTotalReturn(calculatedTotalReturn.toFixed(2));
  };
  // Calculation end

  return (
    <View className="flex-1">
      <CustomTopLayout
        onPress={() => {
          navigation.goBack();
        }}
        name="SIP Calculator"
      />
      <ScrollView>
        <View className="mx-5 mt-2">
          <SubHeading name="Investment Amount" />
          <KeyboardAwareScrollView>
            <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
              <TextInput
                className="w-full text-blackC"
                value={totalInvestmentAmount}
                onChangeText={text => setTotalInvestmentAmount(text)}
                placeholder="eg. 100000"
                keyboardType="numeric"
              />
              <Text className="text-blackC">&#8377;</Text>
            </View>
          </KeyboardAwareScrollView>
          <SubHeading name="Expected Return Rate (p.a.)" />
          <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
            <TextInput
              className="w-full text-blackC"
              value={expectedReturnRate}
        onChangeText={text => setExpectedReturnRate(text)}
              placeholder="eg. 8"
              keyboardType="numeric"
            />
            <Text className="text-blackC">&#37;</Text>
          </View>
          <SubHeading name="Time Period" />
          <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
            <TextInput
              className="w-[25%] text-blackC"
              value={years}
              onChangeText={text => setYears(text)}
              placeholder="Years"
              keyboardType="numeric"
            />
          </View>
          <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
            <TextInput
              className="w-full text-blackC"
              value={months}
        onChangeText={text => setMonths(text)}
              placeholder="Months"
              keyboardType="numeric"
            />
          </View>

          <View className="flex-row justify-evenly my-12">
            <CalculateButton
              name="Calculate"
              onPress={handleCalculateButton}
              srcPath={allImages.Calculate}
            />
            <CalculateButton
              name="Reset"
              onPress={resetData}
              srcPath={allImages.Reset}
            />
            
          </View>
        </View>

        <View className="h-[200px] w-full rounded-t-[30px] bg-primaryC py-3">
          <Image
            className="w-[135px] h-[5px] self-center mb-6"
            source={allImages.HomeIndicator}
          />

          <View className="flex-row justify-between mx-10 items-center">
            <Text className="text-whiteC pt-2 text-lg ">Invested Amount</Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377; {investedAmount}
            </Text>
          </View>
          <View className="flex-row justify-between mx-10 items-center">
            <Text className="text-whiteC pt-2 text-lg ">Total Profit</Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377; {totalProfit}
            </Text>
          </View>
          <View className="flex-row justify-between mx-10 items-center">
            <Text className="text-whiteC pt-2 text-lg ">Total Return</Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377; {totalReturn}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SipCalculator;
