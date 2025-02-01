import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router';

import CustomTextInput from '../../../src/components/CustomTextInput';
import { Customer } from '../../../src/types/Customer';
import CustomerRepository from '../../../src/database/CustomerRepository';
import Loading from '../../../src/components/Loading';
import SuccessButton from '../../../src/components/SuccessButton';
import Toast from 'react-native-toast-message';

const customerRepository = new CustomerRepository();

export default function _screen() {
    const local = useLocalSearchParams();
    const id = local.id.toString();
    const router = useRouter();

    const [data, setData] = useState<Customer | null>(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const customer = await customerRepository.getCustomerById(id);
                setData(customer);
            } catch (error) {
                setTimeout(async () => {
                    Toast.show({
                        type: 'error',
                        text1: 'Erro',
                        text2: 'Erro ao encontrar cliente!',
                        visibilityTime: 3000
                    });
                }, 100);

            }
        }

        fetchCustomer();
    }, [id]);

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

        setData({ ...data, phone: formatted } as Customer);
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

        setData({ ...data, cpf: formatted } as Customer);
    };

    const handleSubmit = async () => {
        if (!data?.name || !data?.email || !data?.phone || !data?.cpf) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Preencha todos os campos para editar o cliente.',
                visibilityTime: 3000,
            });
            return;
        }

        const cleanedPhone = data.phone.replace(/\D/g, '');
        const cleanedCpf = data.cpf.replace(/\D/g, '');

        try {
            await customerRepository.updateCustomer(id, {
                name: data.name,
                email: data.email,
                phone: cleanedPhone,
                cpf: cleanedCpf,
            });

            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: 'Cliente atualizado com sucesso!',
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
    }

    const resetFields = () => {
        setData(null);
    }

    if (!data) return <Loading />;

    return (
        <ScrollView className='gap-2 p-2'>
            <CustomTextInput label='Nome:' placeholder='Nome do Cliente...' icon='user' iconSize={18} iconColor='black' value={data.name} onChangeText={(value) => setData({ ...data, name: value })} />
            <CustomTextInput label='Email:' placeholder='Email do Cliente...' keyboardType='email-address' icon='envelope' iconSize={18} iconColor='black' value={data.email} onChangeText={(value) => setData({ ...data, email: value })} />
            <CustomTextInput label='Telefone:' placeholder='Telefone do Cliente...' keyboardType='phone-pad' icon='phone' iconSize={18} iconColor='black' value={data.phone} onChangeText={(value) => formatPhone(value)} />
            <CustomTextInput label='CPF:' placeholder='CPF do Cliente...' icon='credit-card' keyboardType='numeric' iconSize={18} iconColor='black' value={data.cpf} onChangeText={(value) => formatCpf(value)} />

            <SuccessButton label='SALVAR' onPress={handleSubmit} style='mt-2' />
        </ScrollView >
    )
}
