import { FinancialGoalList } from '@/entities/FinancialGoals';
import { Page } from '@/widgets/Page';

const FinancialGoalsPage = () => {
  return (
    <Page>
      <FinancialGoalList withAddButton />
    </Page>
  );
};

export default FinancialGoalsPage;
