import { LayoutBase } from '../../shared/layouts';
import { BarraDeFerramentas } from '../../shared/components';

export const Dashboard: React.FC = () => {
  return (
    <LayoutBase title="Página inicial" toolbar={<BarraDeFerramentas isShowSearch/>}>
        testando
    </LayoutBase>
  );
};