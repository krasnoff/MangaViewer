import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import ContentPageFrame from '../../components/content-page-frame';
import styles from '../../styles/content-page-style';
import { Controller, useForm } from 'react-hook-form';
import { LoginFormData } from '../../types/login-form-data';

function LoginScreen({ route, navigation }: any): JSX.Element {
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<LoginFormData>({
        defaultValues: {
            email: "",
            password: "",
        },
    })
    
    const submitHandler = (data: LoginFormData) => {
        console.log('submit handler', data)
    }

    return (
        <ContentPageFrame>
            <>
                <Text style={styles.subTitle}>Login</Text>

                <Controller
                    control={control}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'Invalid email address',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={stylesForms.input}
                            placeholder='Email'
                            inputMode='email'
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

                <View style={stylesForms.buttonWrap}>
                    <Button title="Login" onPress={handleSubmit(submitHandler)}/>
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
        width: 70
    },
    errorMessage: {
        color: 'red'
    }
});

export default LoginScreen;