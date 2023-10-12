import React, { useState, useEffect } from 'react'
import { View, Text, Alert, SafeAreaView, ScrollView } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';
import BookedPackagesCard from '../components/BookedPackagesCard';

export default function BookedPackages() {
    const[packages, setPackages] = useState([]);

    const getData = async () => {
        await axios.get("http://172.28.23.47:3000/package")
        .then((res) => {            
            setPackages(res.data)
        })
        .catch((err) => {
            Alert.alert("Error occurred while retrieving data")
            console.error('Error:', err);
        })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <SafeAreaView className='bg-white'>
            <View className='my-5'>
                <Text style={{fontSize: wp(7)}} className='ml-8 mb-4 font-bold text-neutral-700'>Booked Packages</Text>
                <ScrollView style={{height: hp(100)}} showsVerticalScrollIndicator={false}>
                    {packages.map((item,index) => (
                        <BookedPackagesCard key={index} item={item} getData={getData}/>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}