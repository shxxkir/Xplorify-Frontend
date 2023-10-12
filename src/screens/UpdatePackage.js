import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import axios from 'axios';

export default function UpdatePackage(props) {
    const item = props.route.params;
    const key = item._id
    const navigation = useNavigation();
    let perPerson = item.total / item.count

    const [name, setName] = useState(item.name);
    const [email, setEmail] = useState(item.email);
    const [contact, setContact] = useState(item.contact);
    const [count, setCount] = useState(item.count);
    const [total, setTotal] = useState(item.total);
    const [packageName, setPackageName] = useState(item.packageName);

    useEffect(() => {
        let tot = perPerson * count
        setTotal(tot)
    }, [count])

    const updatedPackage = {
        name, email, contact, count, total, packageName
    }

    const updateData = async (id) => {
        await axios.put(`http://172.28.23.47:3000/package/${id}`, updatedPackage)
        .then(() => {       
            Alert.alert("Package Details Updated Successfully")    
            console.log("Package Details Updated")
            setName('');
            setEmail('');
            setContact('');
            setCount('');
            setTotal('');
            setPackageName('');
        })
        .catch((err) => {
            Alert.alert("Error occurred while updating the details")
            console.error('Error:', err);
        })
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
                        onChangeText={newText => setEmail(newText)}
                    />
                    <Text className="text-gray-700 ml-4">Contact No</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                        keyboardType='phone-pad'
                        placeholder='0XX-XXXX-XXX'
                        maxLength={10}
                        value={contact.toString()}
                        onChangeText={newText => setContact(newText)}
                    />
                    <Text className="text-gray-700 ml-4">No of Guests</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                        keyboardType='numeric'
                        placeholder='Enter Person Count'
                        value={count.toString()}
                        onChangeText={newText => setCount(newText)}
                    />
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
                        onPress={()=> {
                            updateData(key)
                            navigation.navigate('BookedPackages')
                        }}
                    >
                        <Text className="text-base font-bold text-center text-white">
                            Update Package
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}