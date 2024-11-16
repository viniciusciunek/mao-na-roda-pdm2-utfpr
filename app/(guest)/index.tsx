import { Stack, useRouter } from 'expo-router';
import { View } from 'react-native';

import { Text } from '@rneui/themed';

import LoginButton from '../../src/components/LoginButton';

import Svg, { Path } from "react-native-svg"

/**
 * Tela de visitante.
 */
export default function _screen() {
    const router = useRouter();
    return (
        <View className='flex flex-col justify-between items-center h-5/6'>
            <Stack.Screen options={{ headerShown: false }} />
            <View className='flex flex-col p-2 items-center justify-center'>
                <Text h1 className='font-nunito_black'>Mão na Roda</Text>
                <Text className='font-nunito_regular'>O assistente que você precisa para sua oficina!</Text>
            </View>

            <Svg
                width={260}
                height={260}
                viewBox="0 0 260 260"
            >
                <Path fill="#000" fill-rule="evenodd" d="m143.047 93.818-.244-29.035c-.051.03-38.373 44.797-38.521 44.613-.356-.259-7.539-5.43-10.667-5.949l47.319-56.722s11.807-6.81 19.734-8.522a5.013 5.013 0 0 0 5.985 3.616 5.008 5.008 0 0 0 3.867-5.22 91.044 91.044 0 0 1 6.081-.483l2.915 23.64-24.635 4.33-.779-23.754-5.711 2.67v50.521l-5.344.295Zm39.449-57.693c2.61.152 4.711.527 6.005 1.15 5.532 2.675 11.696 22.042 14.921 30.463.234.616.351 1.253.351 1.885h.015c0 1.11-.356 2.215-1.023 3.107l-7.738 11.049 2.74 7.005-5.741.315-.427-2.445-11.64 16.616-.006.008c-.207-.084-6.07-2.453-9.963-3.573l1.834-3.607h-.006l15.965-31.476-5.287-30.497Z" clip-rule="evenodd" />
                <Path fill="#000" d="M165.763 43.857c-2.451.005-4.717-1.747-5.227-4.218l-.626-6.556a.311.311 0 0 1 .366-.33c.606.111 1.35.193 2.007.274 2.364.296 5.043-.657 6.088-1.08.591-.244 1.085-.514 1.497-.835.179-.148.484-.02.494.214.056.514.622 6.617.698 6.938.199 2.995-2.292 5.618-5.297 5.603v-.01Zm-5.196-10.438.585 6.149s.016.061.026.087c1.757 5.975 10.3 3.87 9.164-2.13-.005-.071-.244-2.547-.402-4.187-.118-.825-.056-1.595-.219-1.38-1.895.977-4.254 1.915-7.509 1.675-.565-.07-1.126-.132-1.64-.214h-.005Z" />
                <Path fill="#000" d="m169.905 31.275-6.479 4.84a2.228 2.228 0 0 1-1.192.544 2.27 2.27 0 0 1-1.915-.642l-.383-2.776c3.301.943 7.305.107 9.969-1.966Z" />
                <Path fill="#000" fill-rule="evenodd" d="M175.551 19.308c1.266.464 2.214 1.81 1.812 3.282-.367 1.487-2.506 3.693-4.024 3.321a1.439 1.439 0 0 1-.535-.255c-.346 2.685-.805 4.585-2.567 5.935a7.055 7.055 0 0 1-1.641.917c-.942.382-3.173 1.182-5.389 1.182l.005.005c-1.742-.102-3.698-.245-5.201-1.1-4.167-2.37-4.554-5.191-5.063-13.01a9.495 9.495 0 0 1 .287-3.218c.23-.119.49-.251.777-.394-.381 1.068-.546 2.265-.443 3.576.535 8.257 1.034 10.402 4.748 12.51 1.136.683 2.608.8 3.963.963 2.363.296 5.043-.657 6.087-1.08.591-.244 1.085-.514 1.498-.835 1.716-1.314 2.073-3.311 2.414-6.21.021-.29.438-.371.576-.117 1.044 1.742 3.571-1.034 3.912-2.328.279-1.062-.372-2.228-1.405-2.567a5.92 5.92 0 0 0 .189-.577Z" clip-rule="evenodd" />
                <Path fill="#000" d="M176.287 22.233a1.591 1.591 0 0 0-1.176-1.248c-.815-.122-1.238 1.106-1.213 1.844-.112.81-.54 2.226.877 1.758-.357.443-1.218.377-1.406-.255-.209-.677-.016-1.38-.041-2.053.086-.907.856-2.099 1.915-1.757.729.265 1.187 1.034 1.044 1.706v.005Z" />
                <Path fill="#000" d="M174.368 24.235c-.168-.805-.25-1.187-.815-1.701.428-.255.907.102 1.121.499.188.433.076.937-.306 1.202Z" />
                <Path fill="#000" fill-rule="evenodd" d="m179.019 234.714.585-3.198.621-.008-.591 3.23-.615-.024Zm14.439.561.157-3.94.626-.008-.16 3.972-.623-.024Zm-71.082-.561.754-4.124.603.09-.743 4.058-.614-.024Zm14.438.561.106-2.641.623.092-.102 2.573-.627-.024Z" clip-rule="evenodd" />
                <Path fill="#000" fill-rule="evenodd" d="m196.125 235.382-.994 21.18a.325.325 0 0 1-.328.31l-30.442-.372a.325.325 0 0 1-.304-.428l3.749-11.242a.324.324 0 0 1 .229-.212l7.525-1.894 1.296-8.132a.325.325 0 0 1 .333-.274l18.624.723a.326.326 0 0 1 .312.341Zm-.665.297-18.008-.7-1.284 8.059a.326.326 0 0 1-.242.264l-7.56 1.902-3.552 10.652 29.683.363.963-20.54Z" clip-rule="evenodd" />
                <Path fill="#000" d="M194.809 256.547h-42.056c-2.287 0-3.79-2.405-2.771-4.457 1.671-3.373 18.135-7.163 18.135-7.163l.443 8.93h25.933l.316 2.685v.005Zm-12.968-15.659c-2.303-.311-4.468-.673-6.775-.779 2.211-.76 4.763-.347 6.775.779Zm.613-2.445c-2.302-.311-4.467-.673-6.775-.78 2.211-.759 4.763-.346 6.775.78Z" />
                <Path fill="#000" fill-rule="evenodd" d="m139.491 235.382-.998 21.18a.325.325 0 0 1-.329.31l-30.441-.372a.325.325 0 0 1-.304-.428l3.749-11.242a.324.324 0 0 1 .228-.212l7.53-1.894 1.291-8.132a.326.326 0 0 1 .334-.274l18.629.723a.326.326 0 0 1 .311.341Zm-.664.297-18.013-.7-1.279 8.059a.327.327 0 0 1-.242.264l-7.565 1.902-3.552 10.652 29.683.363.968-20.54Z" clip-rule="evenodd" />
                <Path fill="#000" d="M138.166 256.547H96.11c-2.288 0-3.79-2.404-2.772-4.457 1.671-3.372 18.135-7.162 18.135-7.162l.443 8.93h25.934l.316 2.684v.005Zm-12.968-15.659c-2.303-.311-4.468-.673-6.775-.779 2.211-.76 4.763-.347 6.775.779Zm.624-2.445c-2.302-.311-4.467-.673-6.775-.78 2.211-.759 4.763-.346 6.775.78Z" />
                <Path fill="#000" fill-rule="evenodd" d="M154.726 107.553c.04.022.098.052.15.069.147.05.333.089.555.12 3.237.464 13.143-.701 13.143-.701a.325.325 0 0 1 .206.045s2.441 1.473 5.152 2.012h.001c1.021.205 2.114-.396 3.071-1.156 1.505-1.195 2.666-2.83 2.686-2.859l11.64-16.616a.324.324 0 0 1 .586.13l.378 2.161 5.458-.3a.323.323 0 0 1 .343.325V231.28a.325.325 0 0 1-.321.325l-26.764.347a.326.326 0 0 1-.329-.312l-4.287-104.633-24.54 106.384a.325.325 0 0 1-.365.248l-24.782-3.672a.325.325 0 0 1-.272-.381l20.349-108.63a.324.324 0 0 1 .319-.265h51.254v-10.893h-49.091a.322.322 0 0 1-.25-.118.32.32 0 0 1-.07-.267l2.924-15.608a.324.324 0 0 1 .301-.265l5.893-.324V43c0-.126.072-.241.187-.294l5.71-2.67a.326.326 0 0 1 .463.284l.767 23.379 23.962-4.211-2.886-23.412a.325.325 0 0 1 .322-.364h5.889c.158 0 .293.113.32.269l5.303 30.584a.324.324 0 0 1-.031.203l-17.788 35.072a.324.324 0 0 1-.379.165c-1.175-.335-2.161-.563-2.743-.563-1.252 0-4.007 1.102-6.629 2.409-2.611 1.302-5.094 2.811-5.805 3.701Zm16.984 1.595a20.395 20.395 0 0 1-3.169-1.449c-1.091.124-10.124 1.128-13.203.687-.473-.068-.822-.179-1.013-.313a.6.6 0 0 1-.277-.42c-.019-.144.017-.311.156-.489l.001-.001c.728-.925 3.305-2.531 6.036-3.893 2.732-1.362 5.614-2.477 6.919-2.477.577 0 1.527.2 2.663.516l17.619-34.738-5.238-30.209h-5.248l2.879 23.353a.323.323 0 0 1-.266.36l-24.635 4.33a.321.321 0 0 1-.26-.068.322.322 0 0 1-.121-.241l-.763-23.261-5.076 2.373v50.315a.325.325 0 0 1-.308.325l-5.944.327-2.805 14.973h32.053Zm4.683 0h12.289c.179 0 .325.145.325.325v11.543a.326.326 0 0 1-.325.325h-51.309l-20.237 108.032 24.152 3.58 25.015-108.444a.326.326 0 0 1 .642.059l4.373 106.73 26.127-.338V91.126l-5.403.297a.324.324 0 0 1-.338-.268l-.293-1.671-11.188 15.973-.001.001s-1.224 1.731-2.813 2.993a8.328 8.328 0 0 1-1.016.697Z" clip-rule="evenodd" />
                <Path fill="#000" fill-rule="evenodd" d="M189.011 109.473v11.543a.326.326 0 0 1-.325.325H46.181a.325.325 0 0 1-.325-.325v-11.543c0-.18.146-.325.325-.325h142.505c.179 0 .325.145.325.325Zm-.65.325H46.506v10.893H188.36v-10.893Z" clip-rule="evenodd" />
                <Path fill="#000" d="M226.261 119.04H18.487v21.451h14.579v116.056h6.46V140.491h165.697v116.056h6.459V140.491h14.579V119.04Zm-52.296-9.602v.54h-30.289l4.371-11.217a1.537 1.537 0 0 1 1.507-1.238h.897c1.131 0 1.88 1.192 1.375 2.21l-1.024 2.756h8.798l1.278-4.014c.24-.575.795-.952 1.422-.952h2.002a1.54 1.54 0 0 1 1.451 2.047l-.698 2.013c-3.586 1.171-9.439 4.33-10.59 5.792-1.426 1.823 14.151 0 14.151 0-.076-.036 2.68 1.594 5.349 2.063Zm-16.702-39.703 22.689-3.561c-3.78 12.857-15.297 13.815-22.689 3.56Zm33.144 35.77a94.043 94.043 0 0 1 9.893-6.79 92.358 92.358 0 0 0-8.176 8.568l-1.717-1.778Zm10.694.855 5.985-2.078-4.732 4.208-1.253-2.13Zm-7.968 5.711 5.176.713-4.926 1.742-.25-2.455Z" />
                <Path fill="#000" fill-rule="evenodd" d="M172.496 20.558c-.394.087-.87-.111-1.353-.81-.88-1.28-1.924-4.098-2.574-6.003 1.881 1.885 2.659 5.277 3.927 6.813Zm-16.441-5.548c-2.02 2.47-2.912 5.121-2.712 5.817-.847-1.307-1.3-2.613-1.43-3.873.069.008.139.01.212.007 0 0 1.642-.932 3.93-1.952Z" clip-rule="evenodd" />
                <Path fill="#000" d="M104.301 109.717H82c-.546.016-.953-.606-.709-1.1.413-.886.76-1.34 1.305-1.701.641-.474 1.97-1.457 5.318-2.405 1.793-.489 3.85-1.599 5.761-1.375 3.204.53 10.483 5.782 10.794 6.006.245.158.138.58-.168.57v.005Zm-11.146-6.011c-1.594.072-3.525.948-5.068 1.401-3.24.917-4.508 1.854-5.115 2.308-.473.305-.748.682-1.11 1.462-.046.122.02.209.143.224h21.338c-2.134-1.431-7.411-5.17-10.188-5.395Z" />
                <Path fill="#000" d="M93.06 109.718H82.313c-.744.025-1.238-.892-.794-1.498.422-.622 4.273-4.264 7.065-3.642.168.035.27.203.234.366a.306.306 0 0 1-.367.235c-2.338-.53-5.954 2.705-6.418 3.387-.168.286.036.525.285.535h10.744c.397 0 .407.617 0 .617Z" />
                <Path fill="#000" d="M87.948 109.718h-1.62c-1.05.015-1.426-1.198-.845-1.992.906-1.32 6.82-2.573 8.675-1.834a.311.311 0 0 1 .173.402.312.312 0 0 1-.403.174c-1.69-.678-7.264.621-7.941 1.609-.29.408-.224 1.029.336 1.024h1.62c.403 0 .403.617 0 .617h.005Z" />
                <Path fill="#000" d="M84.361 109.733c-1.003.096-1.834-.709-1.34-1.666 1.442-1.89 3.882-2.736 5.991-3.749.942-.393 1.793-.892 2.791-1.147 1.575-.376 2.975.245 4.335.846.2.061.398.239.29.464-.101.229-.35.208-.54.101-1.262-.56-2.572-1.135-3.937-.809-2.71 1.049-5.664 2.236-7.91 4.044-1.02.856-.5 1.437.692 1.294.285.01.8-.117.81.311-.03.489-.836.249-1.182.316v-.005Zm89.978.046c-2.343-.178-5.394-1.844-5.792-2.083-12.322 1.36-15.17.891-14.324-.51 1.253-1.589 7.305-4.768 10.738-5.894 2.313-.728 2.522-.555 5.12.112 3.932 1.136 9.938 3.566 9.994 3.587.178.066.255.31.138.463-.133.184-3.082 4.32-5.869 4.32l-.005.005Zm-5.726-2.71c.057 0 .113.015.158.046-.02-.015 2.629 1.564 5.242 2.022 2.114.341 4.676-2.71 5.456-3.713-1.727-.637-9.047-3.699-12.307-3.979-3.821.454-11.08 4.554-12.455 6.128.662.647 7.62.224 13.906-.499v-.005Z" />
                <Path fill="#000" d="M163.223 108.209a.314.314 0 0 1-.3-.229c-.352-1.268 3.815-2.796 5.624-3.392a.29.29 0 0 1 .209.005l4.487 1.777c.372.148.148.724-.229.576l-4.381-1.737c-2.491.83-4.426 1.803-4.971 2.333l4.91-.479c.173-.005.321.107.336.275a.309.309 0 0 1-.275.337c-.03 0-5.389.529-5.415.524l.005.01Zm-3.615.24c-1.747-.764 4.677-4.89 5.41-5.277.352-.189.657.341.301.54-2.272 1.263-5.405 3.79-5.41 4.365a.306.306 0 0 1-.301.367v.005Zm-3.123.01c-1.548-.371 3.566-4.202 5.375-5.669.315-.245.697.239.376.489-2.582 2.002-5.323 4.376-5.445 4.875.01.173-.132.305-.306.311v-.006Z" />
                <Path fill="#000" d="M157.797 108.495c-3.424 0-4.009-.555-3.566-1.329.229-.26.657.035.509.341.204.163 1.432.693 8.461.087a.313.313 0 0 1 .337.28.313.313 0 0 1-.281.336c-2.404.209-4.167.285-5.455.285h-.005Zm-1.727-89.527c-.724-.184-.097-.856.927-1.462.922-.53 1.885-.545 1.925-.55a.307.307 0 1 1 .006.616c-.011 0-.851.02-1.625.464-.739.422-.968.779-.973.779a.321.321 0 0 1-.265.143l.005.01Zm11.501-1.748c-.245-.02-.703-.412-1.793-.387-.851.026-1.223.235-1.223.235-.346.193-.657-.321-.316-.53.046-.03.505-.29 1.518-.321 1.08-.02 1.921.402 1.956.418.286.137.169.596-.142.585Zm-5.389 9.073a.309.309 0 0 1-.311-.31l.021-3.363c0-.168.137-.305.31-.305s.311.137.311.31l-.02 3.363a.308.308 0 0 1-.311.305Z" />
                <Path fill="#000" fill-rule="evenodd" d="M173.765 21.677a.324.324 0 0 0 .324-.309l.001-.02-.001.016a.324.324 0 0 1-.318.308l-.006.005-.004-.005c-.01 0-.02 0-.029-.002-.541-.055-1.005-.347-1.417-.82-.545-.623-1.004-1.577-1.482-2.626-.569-1.248-1.17-2.635-2.021-3.712-.807-1.02-1.843-1.757-3.318-1.77-5.215-.05-13.208 4.502-13.208 4.502a.32.32 0 0 1-.145.042c-.822.038-1.402-.492-1.741-1.385-.68-1.786-.373-5.107.342-6.977.338-.881 1.101-2.212 2.346-3.405 1.07-1.023 3.695-3.231 5.518-3.691 3.736-.964 8.122.515 11.368 2.63l.002.002c5.579 3.705 6.788 10.708 5.997 14.474-.215 1.021-.582 1.811-1.033 2.264-.355.356-.766.522-1.208.478a.364.364 0 0 0 .033.001Zm-.005-.005c-.039-.049-.32-.397-.32-.325 0 .275.281.32.32.325Zm.085-.64c.307.01.573-.18.805-.492.3-.405.532-1.006.687-1.74.754-3.59-.402-10.265-5.719-13.798-3.101-2.02-7.282-3.466-10.851-2.545l-.001.001c-1.733.437-4.211 2.558-5.229 3.531-1.159 1.11-1.874 2.347-2.188 3.167-.576 1.504-.878 4.007-.551 5.747.102.54.262 1.005.507 1.327.187.247.428.4.734.407.826-.458 8.417-4.593 13.461-4.545 1.695.015 2.895.844 3.822 2.017.882 1.117 1.512 2.552 2.102 3.845.376.827.736 1.593 1.144 2.167.356.5.738.853 1.23.903a.513.513 0 0 1 .047.008Z" clip-rule="evenodd" />
                <Path fill="#000" d="M169.792 4.725c-2.308 1.824-6.516 3.597-7.066 2.593-.56-.718.963-2.644 3.464-4.432 1.182.454 2.562 1.131 3.602 1.84Zm-5.751-2.517c-1.156 2.614-4.065 6.144-5.104 5.461-.866-.443-.367-2.99 1.121-5.766 1.182-.123 2.506-.041 3.983.305Zm-7.026 1.987c-.784 3.204-.784 4.575-1.772 4.335-.754-.183-1.452-1.263-1.197-3.453 1.044-.999 2.857-2.491 4.63-2.94-.061.336-1.579 1.707-1.666 2.053l.005.005Zm16.752 15.293a.929.929 0 0 1-.922-.846c0-.04-.439-4.228-4.198-6.785-2.74-1.865-12.373 1.365-17.798 3.836a.927.927 0 0 1-.77-1.687c1.534-.697 15.114-6.739 19.612-3.683 2.94 1.997 4.162 4.774 4.666 6.516l.912-.78c.938-.774 2.119.601 1.203 1.411l-2.104 1.799a.928.928 0 0 1-.601.224v-.005Zm-14.106 1.518c.01-1.269-1.982-1.243-1.936.02.015 1.238 1.956 1.217 1.936-.02Zm7.617-.872c.011-1.268-1.981-1.243-1.935.02.015 1.238 1.956 1.218 1.935-.02Zm-3.343 10.84c-2.277 0-3.627-2.302-3.683-2.4a.314.314 0 0 1 .168-.447l6.327-2.145a.312.312 0 0 1 .403.234c.484 2.333-.785 4.753-3.215 4.753v.005Zm-2.934-2.394c1.875 2.822 5.95 2.272 5.593-1.895l-5.593 1.895Z" />
                <Path fill="#000" d="M164.341 28.697c-2.252.958-1.62 2.507.657 1.61 2.251-.958 1.62-2.506-.657-1.61Z" />
            </Svg>

            <Text h4 className='text-center font-poppins_bold truncate'>Gerencie sua oficina, facilite seus fluxos diários. Faça da sua oficina, o melhor lugar para o seu cliente.</Text>

            <View className='flex flex-col justify-center items-center mx-2'>
                <LoginButton text='Entre' textColor='white' icon='arrowright' iconSize={24} iconColor="white" backgroundColor='#0E3087' onPress={() => router.push('/(guest)/login')} />

                <Text className=''>Ou</Text>

                <LoginButton text='Cadastre-se' textColor='#0E3087' icon='arrowright' iconColor='#0E3087' iconSize={24} backgroundColor='transparent' border borderColor='#0E3087' onPress={() => router.push('/(guest)/register')} />
            </View>
        </View>
    );
}