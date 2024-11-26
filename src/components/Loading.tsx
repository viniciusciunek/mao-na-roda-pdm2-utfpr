import { View, ActivityIndicator } from 'react-native';

/**
 * Componente de carregamento.
 */
export default function Loading() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0E3087" />
        </View>
    );
}
