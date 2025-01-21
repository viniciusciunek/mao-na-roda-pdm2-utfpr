import * as Crypto from 'expo-crypto';

import React, { useState } from 'react'
import { router, useRouter } from 'expo-router';

import CustomTextInput from '../../../src/components/CustomTextInput'
import CustomerRepository from '../../../src/database/CustomerRepository';
import { ScrollView } from 'react-native'
import SuccessButton from '../../../src/components/SuccessButton'
import Toast from 'react-native-toast-message';

const customerRepository = new CustomerRepository();

export default function _screen() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');

    const formatPhone = (phone: string) => {
        const cleaned = phone.replace(/\D/g, '');

        let formatted = cleaned;

        if (cleaned.length <= 2) {
            formatted = `(${cleaned}`;
        } else if (cleaned.length <= 7) {
            formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
        } else if (cleaned.length <= 11) {
            formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 3)} ${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
        } else {
            formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 3)} ${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
        }

        setPhone(formatted);
    };

    const formatCpf = (cpf: string) => {
        const cleaned = cpf.replace(/\D/g, '');

        let formatted = cleaned;

        if (cleaned.length <= 3) {
            formatted = cleaned;
        } else if (cleaned.length <= 6) {
            formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
        } else if (cleaned.length <= 9) {
            formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
        } else {
            formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
        }

        setCpf(formatted);
    };

    const generateRandomPassword = async () => {
        const randomBytes = await Crypto.getRandomBytesAsync(16);
        const password = Array.from(randomBytes).map((byte) => byte.toString(16).padStart(2, '0')).join('');

        return password;
    };

    const handleSubmit = async () => {
        if (!name || !email || !phone || !cpf) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Preencha todos os campos para cadastrar um cliente.',
                visibilityTime: 3000,
            });
            return;
        }

        const cleanedPhone = phone.replace(/\D/g, '');
        const cleanedCpf = cpf.replace(/\D/g, '');

        const password = await generateRandomPassword();

        try {
            await customerRepository.createCustomer({
                name,
                email,
                phone: cleanedPhone,
                cpf: cleanedCpf,
                password,
                passwordConfirm: password
            });

            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: 'Cliente criado com sucesso!',
                visibilityTime: 3000,
            });

            resetFields();

            return router.push('/admin/customer/customers');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Erro ao criar cliente, verifique os campos!',
                visibilityTime: 3000,
            });
        }
    };


    const resetFields = () => {
        setName('');
        setEmail('');
        setPhone('');
        setCpf('');
    }

    return (
        <ScrollView className='gap-2 p-2'>
            <CustomTextInput label='Nome:' placeholder='Nome do Cliente...' icon='user' iconSize={18} iconColor='black' value={name} onChangeText={(value) => setName(value)} />
            <CustomTextInput label='Email:' placeholder='Email do Cliente...' keyboardType='email-address' icon='envelope' iconSize={18} iconColor='black' value={email} onChangeText={(value) => setEmail(value)} />
            <CustomTextInput label='Telefone:' placeholder='Telefone do Cliente...' keyboardType='phone-pad' icon='phone' iconSize={18} iconColor='black' value={phone} onChangeText={(value) => formatPhone(value)} />
            <CustomTextInput label='CPF:' placeholder='CPF do Cliente...' icon='credit-card' keyboardType='numeric' iconSize={18} iconColor='black' value={cpf} onChangeText={(value) => formatCpf(value)} />

            <SuccessButton label='SALVAR' onPress={handleSubmit} style='mt-2' />
        </ScrollView >
    )
}
