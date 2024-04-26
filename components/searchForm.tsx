import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from "../assets/icons/icon";

const SearchForm = () => {
    const [inputText, setInputText] = useState<string>('');
    const navigation = useNavigation();
    
    const searchHandler = () => {
        console.log('on submit');
        // bottomSheetRef.current!.close();
        navigation.navigate('Home' as never);
    }
    
    const handleInputChange = (text: string) => {
        setInputText(text);
    };
    
    return (
        <View style={styles.formContainer}>
            <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={handleInputChange}
                placeholder="Search..."
            />
            <TouchableOpacity style={styles.button} onPress={() => searchHandler()}>
                <Icon name="Search" height="30" width="30" fill="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginTop: 50,
      },
      input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10,
        marginRight: 10,
        borderRadius: 5,
      },
      button: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
      }
});

export default SearchForm;