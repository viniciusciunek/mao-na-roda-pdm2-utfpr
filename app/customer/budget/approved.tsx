import React, { useEffect } from 'react'
import { Text, View } from 'react-native'

import SuccessBadge from '../../../src/components/SuccessBadge'
import Toast from 'react-native-toast-message'

export default function approved() {
    useEffect(() => {
        Toast.show({
            type: 'success',
            text1: 'Orçamento aprovado!',
            text2: 'O orçamento foi aprovado com sucesso, e seu carro ficará pronto em breve.',
        })
    }, [])

    return (
        <View className='flex flex-col items-center justify-center flex-1 h-full gap-2'>
            <View className='p-2'>
                <Text className='p-2 text-xl text-center text-gray-800 uppercase font-poppins_bold'>Orçamento aprovado!</Text>
                <Text className='text-lg text-center text-gray-500'>Nossa equipe está à disposição para quaisquer dúvidas ou acompanhamentos. Agradecemos pela preferência!</Text>
            </View>

            <SuccessBadge />
        </View>
    )
}
