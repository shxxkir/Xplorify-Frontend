import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

export default function PackageBookingForm(props) {
    const navigation = useNavigation();
    const item = props.route.params;

    const [name, setName] = useState("");
    const [email, setEmail] = useState();
    const [contact, setContact] = useState();
    const [count, setCount] = useState(1);
    const [total, setTotal] = useState(item.price);
    const [packageName, setPackageName] = useState(item.title);

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [countError, setCountError] = useState('');
    const [valid, setValid] = useState(false);

    useEffect(() => {
        let tot = item.price * count
        setTotal(tot)
    }, [count])

    const validateEmail = () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email address');
            setValid(true)
        } else {
            setEmailError('');
        }
    };

    const validatePhoneNumber = () => {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(contact)) {
            setPhoneError('Invalid phone number');
            setValid(true)
        } else {
            setPhoneError('');
        }
    };

    const validateCount = () => {
        if(count <= 10 && count >= 1) {
            setCountError('');
        } else {
            setCountError('Count should be in between 1 - 10');
            setValid(true)
            setCount(null)
        }
    };

    const sendData = async () => {
        if(!valid){
            const newBooking = {
                name,
                email,
                contact,
                count,
                total,
                packageName
            }
    
            await axios.post("http://172.28.23.47:3000/package", newBooking)
                .then((response) => {
                    console.log('Server Response:', response.data);
                    Alert.alert("Booked Successfully");
                    setName('');
                    setEmail('');
                    setContact('');
                    setCount('');
                    setTotal('');
                    setPackageName('');
                    navigation.navigate('BookedPackages')
                })
                .catch((error) => {
                    Alert.alert("Registration Error")
                    console.error('Error:', error);
                });
        }
        else{
            Alert.alert('Enter Valid Inputs')
            navigation.goBack()
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <ScrollView>
                <View className="space-y-2 py-5 mx-5 px-5 bg-white shadow-md rounded-xl">
                    <Text className="text-gray-700 ml-4">Name</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                        placeholder='Enter Name'
                        value={name}
                        onChangeText={newText => setName(newText)}
                    />
                    <Text className="text-gray-700 ml-4">Email Address</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                        keyboardType='email-address'
                        placeholder='Enter Email Address'
                        value={email}
                        onBlur={validateEmail}
                        onChangeText={newText => setEmail(newText)}
                    />
                    {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
                    <Text className="text-gray-700 ml-4">Contact No</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                        keyboardType='phone-pad'
                        placeholder='0XX-XXXX-XXX'
                        maxLength={10}
                        value={contact}
                        onBlur={validatePhoneNumber}
                        onChangeText={newText => setContact(newText)}
                    />
                    {phoneError ? <Text style={{ color: 'red' }}>{phoneError}</Text> : null}
                    <Text className="text-gray-700 ml-4">No of Guests</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                        keyboardType='numeric'
                        placeholder='Enter Person Count'
                        value={count}
                        onBlur={validateCount}
                        onChangeText={newText => setCount(newText)}
                    />
                    {countError ? <Text style={{ color: 'red' }}>{countError}</Text> : null}
                    <Text className="text-gray-700 ml-4">Total</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                        placeholder='Total Amount'
                        value={total.toString()}
                        editable={false}
                        selectTextOnFocus={false}
                    />
                    <Text className="text-gray-700 ml-4">Package</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                        placeholder='Package Name'
                        value={packageName}
                        editable={false}
                        selectTextOnFocus={false}
                    />
                    <TouchableOpacity
                        className="py-2 rounded-xl"
                        style={{backgroundColor: theme.bg(1)}}
                        onPress={sendData}
                    >
                        <Text className="text-base font-bold text-center text-white">
                            Book
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>        
    )
}