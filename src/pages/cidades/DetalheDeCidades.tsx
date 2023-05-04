import { useNavigate, useParams } from 'react-router-dom';

import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { useEffect, useState } from 'react';
import { VTextField, VForm, useVForm} from '../../shared/form';
import { Box, Grid, Paper } from '@mui/material';
import * as yup from 'yup';
import { IVFormErrors } from '../../shared/form/IVFormErrors';

interface IFormData {   
    nome: string;
}

const FormValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const DetalheDeCidades: React.FC = () => {
 
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading,setIsLoading] = useState(false);
  const [name,setName] = useState('');
  const { formRef, handleSave, handleSaveAndClose, handleIsSaveAndClose } = useVForm();

  useEffect(() => {
    if(id !== 'nova') {
      setIsLoading(true);
      CidadesService.getById(Number(id))
        .then((res) => {
          setIsLoading(false);
          if(res instanceof Error) {
            alert(res.message);
          }else {
            setName(res.nome);
            formRef.current?.setData(res);
          }          
        });
    } else {
      formRef.current?.setData({
        nome: '',
      });
    }
  },[id]);

  const handleDelete = (id: number) => {
    if(confirm('Deseja realmente apagar?')) {
      CidadesService.deleteById(id).then((res) => {
        if(res instanceof Error) {
          alert(res.message);
        }
        navigate('/cidades');
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
          CidadesService.create(validateData).then((res) => {
            setIsLoading(false);
            if(res instanceof Error) {
              alert(res.message);
            } else {
              if(handleIsSaveAndClose()) {
                navigate('/cidades');
              } else {
                navigate(`/cidades/detalhe/${res}`);
              }
            }
          });
        } else {
          CidadesService.updateById(Number(id),{id: Number(id) , ...validateData}).then((res) => {
            setIsLoading(false);
            if(res instanceof Error) {
              alert(res.message);
            }
            if(handleIsSaveAndClose()) {
              navigate('/cidades');
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
    <LayoutBase title={id !== 'nova' ? name : 'Nova cidade'}
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
          handleReturnClick={() => navigate('/cidades')}
          handleNewClick={() => navigate('/cidades/detalhe/nova')}
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
                  name='nome' 
                  placeholder='Nome'/>                  
              </Grid>
            </Grid>
          </Grid>
        </Box>        
      </VForm>
    </LayoutBase>
  );
};