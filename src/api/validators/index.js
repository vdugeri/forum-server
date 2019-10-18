export const requiredStringValidator = {
  validator: val => {
    return val && val.trim().length > 0;
  },
  message: props => `${props.value} must not be blank`
};

export const emailAddressValidator = {
  validator: val => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
  },
  message: props => `${props.value} must be a valid email address`
};
