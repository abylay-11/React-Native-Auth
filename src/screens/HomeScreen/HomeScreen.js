import {Auth} from 'aws-amplify';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomButton from '../../components/CustomButton';

export default function HomeScreen() {
  const onSignOutPressed = () => {
    Auth.signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <View style={styles.footer}>
        <CustomButton text="Sign Out" onPress={onSignOutPressed} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 10,
    marginTop: 'auto',
  },
});
