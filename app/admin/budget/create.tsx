import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import TextInput from '../../../src/components/TextInput'

import { Picker } from '@react-native-picker/picker';
import { Product } from '../../../src/types/Product';

export default function _screen() {
    const [selectedLanguage, setSelectedLanguage] = useState();

    const products = useState<Product[]>([]);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        console.log('useEffect', selectedLanguage)
    }, [selectedLanguage])

    return (
        <View>
            <View className='gap-2 p-2'>
                <TextInput label="Name:" placeholder='Selecione um cliente:' icon='user' onChangeText={handleSelectCustomer} />

                <Picker
                    style={{ borderColor: 'blue', borderWidth: 2, borderRadius: 8, backgroundColor: 'red' }}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>


            </View>
        </View>
    )
}
