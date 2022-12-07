import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();
  const pwd = watch('password');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onRegisterPressed = async data => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const {user} = await Auth.signUp({
        username: data.username,
        password: data.password,
        attributes: {
          email: data.email,
          name: data.name,
          preferred_username: data.username,
        },
        // autoSignIn: {
        //   optional - enables auto sign in after user is confirmed
        //   enabled: true,
        // },
      });
      navigation.navigate('ConfirmEmail', {username: user.username});
    } catch (e) {
      Alert.alert('Oops! Something went wrong', e.message);
    } finally {
      setLoading(false);
    }
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          control={control}
          name="name"
          placeholder={'Name'}
          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Name must be at most 24 characters long',
            },
          }}
        />

        <CustomInput
          control={control}
          name="username"
          placeholder={'Username'}
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Username must be at most 24 characters long',
            },
          }}
        />
        <CustomInput
          control={control}
          name="email"
          placeholder={'Email'}
          rules={{required: 'Email is required', pattern: EMAIL_REGEX}}
        />
        <CustomInput
          control={control}
          name="password"
          placeholder={'Password'}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be minimum 8 characters long',
            },
          }}
          secureTextEntry
        />
        <CustomInput
          control={control}
          name="passwordRepeat"
          placeholder={'Repeat password'}
          rules={{
            required: 'Password is required',
            validate: value => value === pwd || 'Pasword do not match',
          }}
          secureTextEntry
        />
        <CustomButton
          onPress={handleSubmit(onRegisterPressed)}
          text={loading ? 'Loading...' : 'Register'}
        />
        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>
        <SocialSignInButtons />
        <CustomButton
          text="Have an account? Sign in"
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
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});
