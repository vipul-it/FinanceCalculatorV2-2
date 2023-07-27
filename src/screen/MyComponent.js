import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';


const MyComponent = () => {
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [tenure, setTenure] = useState('');
  const [monthlyEMI, setMonthlyEMI] = useState('');
  const [totalInterest, setTotalInterest] = useState('');
  const [totalPayment, setTotalPayment] = useState('');
  const [loanAmountPercentage, setLoanAmountPercentage] = useState('');
  const [totalInterestPercentage, setTotalInterestPercentage] = useState('');

  const saveData = async () => {
    try {
      const data = { amount, interest, tenure };
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('loanData', jsonValue);
      console.log('Data saved successfully!');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('loanData');
      const data = JSON.parse(jsonValue);
      if (data) {
        setAmount(data.amount);
        setInterest(data.interest);
        setTenure(data.tenure);
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('loanData');
      setAmount('');
      setInterest('');
      setTenure('');
      setMonthlyEMI('');
      setTotalInterest('');
      setTotalPayment('');
      setLoanAmountPercentage('');
      setTotalInterestPercentage('');
      console.log('Data cleared successfully!');
    } catch (error) {
      console.log('Error clearing data:', error);
    }
  };

  const calculateLoan = () => {
    const loanAmount = parseFloat(amount);
    const loanInterest = parseFloat(interest) / 100;
    const loanTenure = parseFloat(tenure);

    // Calculating monthly interest rate
    const monthlyInterestRate = loanInterest / 12;

    // Calculating the number of monthly payments
    const numberOfPayments = loanTenure * 12;

    // Calculating the monthly EMI
    const monthlyEMI =
      (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    // Calculating the total payment
    const totalPayment = monthlyEMI * numberOfPayments;

    // Calculating the total interest
    const totalInterest = totalPayment - loanAmount;

    // Calculating the loan amount percentage
    const loanAmountPercentage = (loanAmount / totalPayment) * 100;

    // Calculating the total interest percentage
    const totalInterestPercentage = (totalInterest / totalPayment) * 100;

    setMonthlyEMI(monthlyEMI.toFixed(2));
    setTotalInterest(totalInterest.toFixed(2));
    setTotalPayment(totalPayment.toFixed(2));
    setLoanAmountPercentage(loanAmountPercentage.toFixed(2));
    setTotalInterestPercentage(totalInterestPercentage.toFixed(2));
  };

  return (
    <View>
      <TextInput
        value={amount}
        onChangeText={text => setAmount(text)}
        placeholder="Loan Amount"
        keyboardType="numeric"
      />
      <TextInput
        value={interest}
        onChangeText={text => setInterest(text)}
        placeholder="Interest Rate"
        keyboardType="numeric"
      />
      <TextInput
        value={tenure}
        onChangeText={text => setTenure(text)}
        placeholder="Loan Tenure"
        keyboardType="numeric"
      />
      <Button onPress={saveData} title="Save Data" />
      <Button onPress={getData} title="Get Data" />
      <Button onPress={clearData} title="Clear Data" />
      <Button onPress={calculateLoan} title="Calculate Loan" />
      <Text>Monthly EMI: {monthlyEMI}</Text>
      <Text>Total Interest: {totalInterest}</Text>
      <Text>Total Payment: {totalPayment}</Text>
      <Text>Loan Amount (%): {loanAmountPercentage}</Text>
      <Text>Total Interest (%): {totalInterestPercentage}</Text>
    </View>
  );
};

export default MyComponent;
