import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    isVisible: boolean
    cancelHandler: () => void
    loginHandler: () => void
}

const ModalToLoginAlert = (props: Props) => {
    return (<Modal 
        visible={props.isVisible} 
        animationType='fade' transparent={true}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                {/* Title Section */}
                <Text style={styles.titleText}>Restricted Action</Text>

                {/* Content Section */}
                <View style={styles.contentContainer}>
                    <Text style={styles.contentText}>
                        Only registered users can add manga to favorites
                    </Text>
                </View>

                {/* Buttons Container */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => props.cancelHandler()}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.loginButton]}
                        onPress={() => props.loginHandler()}
                    >
                        <Text style={styles.loginButtonText}>Go to login page</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </Modal>);
}

const styles = StyleSheet.create({
    centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden', // This ensures children don't overflow rounded corners
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    contentContainer: {
        padding: 20,
    },
    contentText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    button: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        borderRightWidth: 1,
        borderRightColor: '#eee',
    },
    loginButton: {
        backgroundColor: 'white',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
    },
    loginButtonText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ModalToLoginAlert;