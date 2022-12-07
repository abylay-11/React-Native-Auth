import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

export default function ForgotPasswordScreen() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onSendPressed = async data => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      await Auth.forgotPassword(data.username);
      navigation.navigate('NewPassword', {username: data.username});
    } catch (e) {
      Alert.alert('Oops! Something went wrong', e.message);
    } finally {
      setLoading(false);
    }
  };

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          name="username"
          control={control}
          placeholder={'Username'}
          rules={{required: 'Username is required'}}
        />

        <CustomButton
          onPress={handleSubmit(onSendPressed)}
          text={loading ? 'Loading...' : 'Send'}
        />
        <CustomButton
          text="Back to Sign in"
          type="TERTIARY"
          onPress={onSignInPressed}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051c60',
    margin: 10,
  },
});
