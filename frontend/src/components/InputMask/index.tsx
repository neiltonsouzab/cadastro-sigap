import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IconBaseProps } from 'react-icons/lib';
import ReactInputMask, { Props as ReactInputMaskProps } from 'react-input-mask';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputMaskProps extends ReactInputMaskProps {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const InputMask: React.FC<InputMaskProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <ReactInputMask
        ref={inputRef}
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
      <Icon size={16} color={isFocused || isFilled ? '#F98B0C' : '#c9c9c0'} />
    </Container>
  );
};

export default InputMask;
