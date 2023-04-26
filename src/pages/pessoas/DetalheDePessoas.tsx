import { useNavigate, useParams } from 'react-router-dom';

import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { useEffect, useState } from 'react';

export const DetalheDePessoas:React.FC = () => {
 
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading,setIsLoading] = useState(false);
  const [name,setName] = useState('');

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
          }          
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

  const handleSave = () => {
    console.log('salvar');
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

          handleSaveAndCloseClick={handleSave}
          handleSaveClick={handleSave}
          handleDeleteClick={() => handleDelete(Number(id))}
          handleReturnClick={() => navigate('/pessoas')}
          handleNewClick={() => navigate('/pessoas/detalhe/nova')}
        />
      }
    >

    </LayoutBase>
  );
};