import { LayoutBase } from '../../shared/layouts';
import { FerramentasDaListagem } from '../../shared/components';

export const Dashboard: React.FC = () => {
  return (
    <LayoutBase title="Página inicial" toolbar={<FerramentasDaListagem isShowSearch/>}>
        testando
    </LayoutBase>
  );
};