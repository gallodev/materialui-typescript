import { useNavigate, useParams } from 'react-router-dom';

import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { useEffect, useState } from 'react';
import { VTextField, VForm, useVForm} from '../../shared/form';
import { Box, Grid, Paper } from '@mui/material';
import * as yup from 'yup';
import { IVFormErrors } from '../../shared/form/IVFormErrors';

export interface IFormData {
    email: string;
    cidadeId: number;
    nomeCompleto: string;
}

const FormValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  cidadeId: yup.number().required(),
  email: yup.string().required().email(),
  nomeCompleto: yup.string().required().min(3),
});

export const DetalheDePessoas: React.FC = () => {
 
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading,setIsLoading] = useState(false);
  const [name,setName] = useState('');
  const { formRef, handleSave, handleSaveAndClose, handleIsSaveAndClose } = useVForm();

  useEffect(() => {
    if(id !== 'nova') {
      setIsLoading(true);
      PessoasService.getById(Number(id))
        .then((res) => {
          setIsLoading(false);
          if(res instanceof Error) {
            alert(res.message);
          }else {
            setName(res.nomeCompleto);
            formRef.current?.setData(res);
          }          
        });
    } else {
      formRef.current?.setData({
        nomeCompleto: '',
        email: '',
        cidadeId: '',
      });
    }
  },[id]);

  const handleDelete = (id: number) => {
    if(confirm('Deseja realmente apagar?')) {
      PessoasService.deleteById(id).then((res) => {
        if(res instanceof Error) {
          alert(res.message);
        }
        navigate('/pessoas');
      });
    }
  };

  const handleSaveData = (data: IFormData) => {
    setIsLoading(true);        
    FormValidationSchema
      .validate(data, {abortEarly: false})
      .then((validateData) => {
        if(id === 'nova') {
          setIsLoading(false);
          PessoasService.create(validateData).then((res) => {
            setIsLoading(false);
            if(res instanceof Error) {
              alert(res.message);
            } else {
              if(handleIsSaveAndClose()) {
                navigate('/pessoas');
              } else {
                navigate(`/pessoas/detalhe/${res}`);
              }
            }
          });
        } else {
          PessoasService.updateById(Number(id),{id: Number(id) , ...validateData}).then((res) => {
            setIsLoading(false);
            if(res instanceof Error) {
              alert(res.message);
            }
            if(handleIsSaveAndClose()) {
              navigate('/pessoas');
            }
          });
        }
      }).catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if(!error.path) return;
          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
    
  };

  return(
    <LayoutBase title={id !== 'nova' ? name : 'Nova pessoa'}
      toolbar={
        <FerramentasDeDetalhe
          showReturnButton
          showSaveButton
          showSaveAndCloseButton
          showNewButton={id !== 'nova'}
          showDeleteButton={id !== 'nova'}

          handleSaveAndCloseClick={handleSaveAndClose}
          handleSaveClick={handleSave}
          handleDeleteClick={() => handleDelete(Number(id))}
          handleReturnClick={() => navigate('/pessoas')}
          handleNewClick={() => navigate('/pessoas/detalhe/nova')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSaveData}>
        <Box margin={2} component={Paper} variant='outlined'>
          <Grid container direction={'column'} padding={2} spacing={2}>
            <Grid container item direction={'row'}>
              <Grid item xs={12} md={8} lg={6} xl={4}>
                <VTextField 
                  fullWidth
                  disabled={isLoading}
                  onChange={(e) => setName(e.target.value)}
                  name='nomeCompleto' 
                  placeholder='Nome completo'/>                  
              </Grid>
            </Grid>
            <Grid container item direction={'row'}>
              <Grid item xs={12} md={8} lg={6} xl={4}>
                <VTextField 
                  fullWidth
                  disabled={isLoading}
                  name='email' 
                  placeholder='Email'/>
              </Grid>
            </Grid>
            <Grid container item direction={'row'}>
              <Grid item xs={12} md={8} lg={6} xl={4}>
                <VTextField 
                  fullWidth
                  disabled={isLoading}
                  name='cidadeId' 
                  placeholder='Cidade id'/>
              </Grid>
            </Grid>
          </Grid>
        </Box>        
      </VForm>
    </LayoutBase>
  );
};