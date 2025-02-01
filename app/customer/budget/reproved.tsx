import React, { useEffect } from 'react'
import { Text, View } from 'react-native'

import BadgeX from '../../../src/components/BadgeX'
import Toast from 'react-native-toast-message'

export default function Reproved() {
    useEffect(() => {
        Toast.show({
            type: 'error',
            text1: 'Orçamento reprovado!',
            text2: 'O orçamento foi reprovado. Caso precise de ajustes ou tenha dúvidas, entre em contato conosco.',
        })
    }, [])


    return (
        <View className='flex flex-col items-center justify-center flex-1 h-full gap-2'>
            <View className='p-2'>
                <Text className='p-2 text-xl text-center text-gray-800 uppercase font-poppins_bold'>Orçamento reprovado!</Text>
                <Text className='text-lg text-center text-gray-500'>Caso tenha alguma dúvida ou precise de mais informações, nossa equipe está à disposição para ajudar. Agradecemos pela oportunidade de atender você!</Text>
            </View>

            <BadgeX />
        </View>
    )
}
