import { Button, Modal, Text, View } from "react-native";

interface Props {
    isVisible: boolean
    cancelHandler: (arg: boolean) => void
}

const ModalToLoginAlert = (props: Props) => {
    return (<Modal 
        visible={props.isVisible} 
        animationType='fade'>
            <View>
                <Text>Only registered users can add manga to favorites</Text>
                <Button title='Login' onPress={() => {
                    props.cancelHandler(true)
                }} />
            </View>
        </Modal>);
}

export default ModalToLoginAlert;