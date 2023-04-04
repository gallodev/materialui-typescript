import { LayoutBase } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';

export const Dashboard: React.FC = () => {
  return (
    <LayoutBase title="Página inicial" toolbar={<FerramentasDeDetalhe showSaveAndCloseButton/>}>
        testando
    </LayoutBase>
  );
};