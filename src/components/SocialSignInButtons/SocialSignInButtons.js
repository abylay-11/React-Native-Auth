import React from 'react';
import {StyleSheet} from 'react-native';
import CustomButton from '../../components/CustomButton';

export default function SocialSignInButtons({}) {
  const onSignInFacebook = () => {
    console.warn('onSignInFacebook');
  };

  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  };

  const onSignInApple = () => {
    console.warn('onSignInApple');
  };

  return (
    <>
      <CustomButton
        text="Sign In with Facebook"
        bgColor="#E7EAF4"
        fgColor="#4765A9"
        onPress={onSignInFacebook}
      />
      <CustomButton
        text="Sign In with Google"
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
        onPress={onSignInGoogle}
      />
      <CustomButton
        text="Sign In with Apple"
        bgColor="#E3e3e3"
        fgColor="#363636"
        onPress={onSignInApple}
      />
    </>
  );
}

const styles = StyleSheet.create({});
