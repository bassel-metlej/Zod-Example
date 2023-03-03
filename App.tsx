import React from 'react';
import {SafeAreaView} from 'react-native';
import ZodExample, {userSchema} from './ZodExample';
import {z} from 'zod';

const App = () => {
  const onsubmitValues = (values: z.infer<typeof userSchema>) => {
    console.log(values);
  };
  return (
    <SafeAreaView>
      <ZodExample onsubmitValues={onsubmitValues} />
    </SafeAreaView>
  );
};

export default App;
