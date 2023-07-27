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

const FdCalculator = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');
  const [days, setDays] = useState('');
  const [maturityAmount, setMaturityAmount] = useState('');

  //   Reset data
  const resetData = () => {
    setAmount('');
    setInterestRate('');
    setYears('');
    setMonths('');
    setDays('');
    setMaturityAmount('');
  };

  const handleCalculateButton = () => {
    Keyboard.dismiss();
    calculateMaturityAmount();
  };
  const calculateMaturityAmount = () => {
    // Validate input values
    if (!amount || !interestRate || !years) {
      Alert.alert(
        'Validation Error',
        'Please enter amount, interest rate, and number of years.',
      );
      return;
    }

    const principal = parseFloat(amount);
    const rate = parseFloat(interestRate);
    const totalYears = parseInt(years);
    const totalMonths = parseInt(months || '0');
    const totalDays = parseInt(days || '0');

    // Validate numeric input
    if (
      isNaN(principal) ||
      isNaN(rate) ||
      isNaN(totalYears) ||
      isNaN(totalMonths) ||
      isNaN(totalDays)
    ) {
      Alert.alert(
        'Validation Error',
        'Please enter all fields.',
      );
      return;
    }

    // Calculate maturity amount
    const totalMonthsInYears = totalYears * 12;
    const totalMonthsInPeriod =
      totalMonthsInYears + totalMonths + totalDays / 30;
    const interest = (principal * rate * totalMonthsInPeriod) / (12 * 100);
    const maturity = principal + interest;

    // Update state variable
    setMaturityAmount(maturity.toFixed(2));
  };

  // Calculation end

  return (
    <View className="flex-1">
      <CustomTopLayout
        onPress={() => {
          navigation.goBack();
        }}
        name="FD Calculator"
      />
      <ScrollView>
        <View className="mx-5 mt-2">
          <SubHeading name="Amount" />
          <KeyboardAwareScrollView>
            <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
              <TextInput
                className="w-full text-blackC"
                value={amount}
                onChangeText={setAmount}
                placeholder="eg. 100000"
                keyboardType="numeric"
              />
              <Text className="text-blackC">&#8377;</Text>
            </View>
          </KeyboardAwareScrollView>
          <SubHeading name="Interest Rate" />
          <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
            <TextInput
              className="w-full text-blackC"
              value={interestRate}
              onChangeText={setInterestRate}
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
              onChangeText={setYears}
              placeholder="Years"
              keyboardType="numeric"
            />
          </View>
          <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
            <TextInput
              className="w-full text-blackC"
              value={months}
              onChangeText={setMonths}
              placeholder="Months"
              keyboardType="numeric"
            />
          </View>
          <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
            <TextInput
              className="w-full text-blackC"
              value={days}
              onChangeText={setDays}
              placeholder="Days"
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

        <View className="h-[150px] w-full rounded-t-[30px] bg-primaryC py-3">
          <Image
            className="w-[135px] h-[5px] self-center mb-6"
            source={allImages.HomeIndicator}
          />

          <View className="flex-row justify-between mx-10 items-center">
            <Text className="text-whiteC pt-2 text-lg ">Maturity Amount</Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377; {maturityAmount}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FdCalculator;
