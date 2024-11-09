import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<CheckboxProps> = ({ label, checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    onChange && onChange(!isChecked);
  };

  return (
    <TouchableOpacity onPress={toggleCheckbox} style={styles.container}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <Text style={styles.checkmark}>✔</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007aff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checked: {
    backgroundColor: '#007aff',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});

export default CustomCheckbox;
