import React from 'react';
import Background from '~/components/Background';
import Button from '~/components/Button';
import Input from '~/components/Input';

export default function SignIn() {
  return (
    <Background>
      <Input style={{ marginTop: 30 }} icon="call" placeholder="Name" />
      <Button>Sign In</Button>
    </Background>
  );
}
