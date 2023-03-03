import {Formik} from 'formik';
import React from 'react';
import {TextInput, StyleSheet, View, Button, Text} from 'react-native';
import {z} from 'zod';
import {withZodSchema} from 'formik-validator-zod';

export const userSchema = z.object({
  email: z.string().email().optional(),
  password: z.union([z.string().min(3), z.number().min(3)]),
});

interface componentProps {
  onsubmitValues: (values: z.infer<typeof userSchema>) => void;
}

const ZodExample = ({onsubmitValues}: componentProps) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, actions) => {
        actions.resetForm();
        onsubmitValues(values);
      }}
      validate={withZodSchema(userSchema)}>
      {({handleSubmit, handleChange, values, handleBlur, errors, touched}) => (
        <View>
          <TextInput
            style={errors.email && touched.email ? styles.error : styles.input}
            placeholder="email"
            onChangeText={handleChange('email')}
            value={values.email}
            onBlur={handleBlur('email')}
          />
          {errors.email && touched.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          <TextInput
            style={
              errors.password && touched.password ? styles.error : styles.input
            }
            placeholder="password"
            onChangeText={handleChange('password')}
            value={values.password}
            onBlur={handleBlur('password')}
          />
          {errors.password && touched.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <View style={styles.buttonStyle}>
            <Button onPress={handleSubmit} title="submit" color="#841584" />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default ZodExample;
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 20,
  },
  error: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 20,
  },
  errorText: {
    marginHorizontal: 10,
    color: 'red',
  },
  buttonStyle: {
    marginTop: 20,
  },
});
