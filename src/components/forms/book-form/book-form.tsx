import React from 'react';
import { Field, InjectedFormProps, reduxForm, WrappedFieldProps } from 'redux-form';
import { MdArrowForward } from 'react-icons/all';


interface RenderFieldProps extends WrappedFieldProps {
  label: string;
  name: string;
  type: string;
}

const validate = (values: { email: string }) => {
  const errors: { email?: string } = {};
  if (!values.email) {
    errors.email = 'Please enter an email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};


const renderField = ({
                       input,
                       label,
                       type,
                       name,
                       meta: { touched, error, warning }
                     }: RenderFieldProps) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '3rem' }}>
    <label style={{ display: 'none' }} htmlFor={name}><small>{label}</small></label>
    <input className={(touched && error) ? 'error' : ''} {...input} placeholder={label} name="name" type={type}/>
    {touched &&
    ((error && <small className="hint error">{error}</small>) ||
      (warning && <small>{warning}</small>))}
  </div>

);

const BookForm = (props: InjectedFormProps<{email: string}>) => {
  const { handleSubmit, pristine, reset, submitting, valid, anyTouched } = props;
  return (
    <form style={{ display: 'flex', alignItems: 'flex-start'}} onSubmit={handleSubmit}>
      <Field name="email" type="email" component={renderField} label="Email"/>
      <button className="btn-icon" type="submit" disabled={!anyTouched || !valid || submitting}>
        <MdArrowForward/>
      </button>
    </form>
  );
};

export default reduxForm({
  form: 'bookForm', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(BookForm);
