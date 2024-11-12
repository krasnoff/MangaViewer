import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import ContentPageFrame from '../../components/content-page-frame';
import styles from '../../styles/content-page-style';
import { Controller, useForm } from 'react-hook-form';
import { LoginFormData } from '../../types/login-form-data';
import PressableLink from '../../components/pressable-link';
import CustomCheckbox from '../../components/custom-checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { getLogin } from '../../store/actions/login';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

function LoginScreen({ route, navigation }: any): JSX.Element {
    const dispatch = useDispatch();
    const data = useSelector(state => (state as unknown as any).LoginResponse);
    const errorData = useSelector(state => (state as unknown as any).ErrorResponse);
    const isFocused = useIsFocused();
    
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<LoginFormData>({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        },
    })

    const submitHandler = (data: LoginFormData) => {
        // console.log('submit handler', data);
        dispatch(getLogin({
            email: data.email,
            password: data.password,
            rememberMe: data.rememberMe
        }))
    }

    /**
     * handling successful request
     */
    useEffect(() => {
        const response: AxiosResponse = data.loginResponse;
        
        if (response.status === 200) {
            console.log('data response', response.data);     
        }
    }, [data]);

    /**
     * error handling in send request
     */
    useEffect(() => {
        const error: AxiosError = errorData.error;
        
        // console.log('error response data', error.response?.data);  
        // console.log('error response status', error.response?.status);
        // console.log('error response headers', error.response?.headers);           

        if (error.response?.status === 401 && (error.response?.data as any).error === 'invalid_grant') {
            console.log('handle error for wrong credentials'); 
        }
    }, [errorData]);

    return (
        <ContentPageFrame>
            <>
                <Text style={styles.subTitle}>Login</Text>

                <Controller
                    control={control}
                    rules={{
                        required: 'Email is required'/*,
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'Invalid email address',
                        },*/
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={stylesForms.input}
                            placeholder='Username or Email'
                            inputMode='text'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            maxLength={50}
                        />
                    )}
                    name="email"
                />
                {errors.email && <Text style={stylesForms.errorMessage}>{errors.email.message}</Text>}

                <Controller
                    control={control}
                    rules={{
                        maxLength: 50,
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={stylesForms.input}
                            placeholder='Password'
                            secureTextEntry={true}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            maxLength={50}
                        />
                    )}
                    name="password"
                />
                {errors.password && <Text style={stylesForms.errorMessage}>Password is required</Text>}
                    
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomCheckbox
                            label="Remember me"
                            checked={value}
                            onChange={onChange}
                        />
                    )}
                    name="rememberMe"
                />

                <View style={stylesForms.buttonWrap}>
                    <Button title="Login" onPress={handleSubmit(submitHandler)}/>
                </View>

                <View style={stylesForms.buttonWrap}>
                    <Text>Not a member yet?<PressableLink url={'https://mangadex.org/'}> Click here </PressableLink>to register</Text>
                </View>
            </>
        </ContentPageFrame>
    );
}

const stylesForms = StyleSheet.create({
    input: {
        height: 40,
        margin: 0,
        marginTop: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    buttonWrap: {
        marginTop: 12,
        marginBottom: 12,
        alignSelf: 'flex-start'
    },
    errorMessage: {
        color: 'red'
    },
    checkbox: {
        width: 64,
        height: 64
    }
});

export default LoginScreen;