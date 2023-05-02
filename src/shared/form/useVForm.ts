import { useRef } from 'react';
import { FormHandles } from '@unform/core';

export const useVForm = () => {
  const formRef = useRef<FormHandles>(null);
  const isNewAndClose = useRef(false);

  const handleSave = () => {
    isNewAndClose.current = false;
    formRef.current?.submitForm();
  };

  const handleSaveAndClose = () => {
    isNewAndClose.current = true;
    formRef.current?.submitForm();
  };

  const handleIsSaveAndClose = () => {
    return isNewAndClose.current;
  }; 



  return {
    formRef,

    handleIsSaveAndClose: handleIsSaveAndClose,
    handleSave: handleSave,
    handleSaveAndClose: handleSaveAndClose,
  };
};