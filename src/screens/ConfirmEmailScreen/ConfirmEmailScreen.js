import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

export default function ConfirmEmailScreen() {
  const route = useRoute();
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      username: route?.params?.username,
    },
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const username = watch('username');

  const onConfirmPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await Auth.confirmSignUp(data.username, data.code);
      navigation.navigate('SignIn');
    } catch (e) {
      Alert.alert('Oops! Something went wrong', e.message);
    } finally {
      setLoading(false);
    }
  };

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };

  const onResendPressed = async () => {
    try {
      const response = await Auth.resendSignUp(username);
      Alert.alert('Success', 'Code was resent to your email');
    } catch (e) {
      Alert.alert('Oops! Something went wrong', e.message);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput
          control={control}
          name="username"
          rules={{required: 'Username is required'}}
          placeholder={'Enter your username'}
        />
        <CustomInput
          control={control}
          name="code"
          placeholder={'Enter your confirmation code'}
          rules={{required: 'Code is required'}}
        />

        <CustomButton
          onPress={handleSubmit(onConfirmPressed)}
          text={loading ? 'Loading...' : 'Confirm'}
        />

        <CustomButton
          text="Resend code"
          type="SECONDARY"
          onPress={onResendPressed}
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
