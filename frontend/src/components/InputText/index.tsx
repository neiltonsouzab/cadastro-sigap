import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputProps,
  InputGroup,
  InputLeftElement,
  Icon as ChakraIcon,
} from '@chakra-ui/react';

type InputTextProps = {
  name: string;
  label?: string;
  touched?: boolean;
  errors?: string;
  icon?: React.ElementType;
} & InputProps;

const InputText: React.FC<InputTextProps> = ({
  name,
  label,
  touched,
  errors,
  icon: Icon,
  ...rest
}) => {
  return (
    <FormControl id={name} isInvalid={touched && !!errors}>
      {!!label && <FormLabel color="gray.600">{label}</FormLabel>}
      <InputGroup>
        {Icon && (
          <InputLeftElement pointerEvents="none">
            <ChakraIcon color="gray.300" as={Icon} />
          </InputLeftElement>
        )}
        <Input size="md" id={name} focusBorderColor="blue.600" {...rest} />
      </InputGroup>
      <FormErrorMessage>{errors}</FormErrorMessage>
    </FormControl>
  );
};

export default InputText;
