import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

export default function NewPasswordScreen() {
  const route = useRoute();
  const username = route?.params?.username;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onSubmitPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await Auth.forgotPasswordSubmit(
        username,
        data.code,
        data.newPassword,
      );
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>New password screen</Text>

        <CustomInput
          name="code"
          control={control}
          placeholder="Code"
          rules={{required: 'Code is required'}}
        />
        <CustomInput
          control={control}
          name="newPassword"
          placeholder="Enter your new password"
          rules={{required: 'New password is required'}}
          secureTextEntry
        />

        <CustomButton
          onPress={handleSubmit(onSubmitPressed)}
          text={loading ? 'Loading...' : 'Submit'}></CustomButton>
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
