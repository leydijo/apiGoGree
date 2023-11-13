import { Customer } from "../interface/customer";

const areFieldsValid = (newCustomer: Customer): boolean => {
  const isValidPhone =
    typeof newCustomer.customer_phone === 'number' &&
    newCustomer.customer_phone.toString().length === 10;

  return (
    newCustomer.customer_type !== null &&
    newCustomer.customer_name !== null &&
    isValidPhone &&
    newCustomer.customer_email !== null &&
    newCustomer.customer_address !== null
  );
};

export { areFieldsValid };
