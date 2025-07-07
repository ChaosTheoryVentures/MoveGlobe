import { MatrixText } from './matrix-text';
import { useLanguage } from '../../contexts/LanguageContext';

export function Overlay() {
  const { t } = useLanguage();

  const aiUseCases = [
    t('home.aiUseCases.leadGeneration'),
    t('home.aiUseCases.scaling'),
    t('home.aiUseCases.costReduction'),
    t('home.aiUseCases.automation'),
    t('home.aiUseCases.insights'),
    t('home.aiUseCases.productivity'),
    t('home.aiUseCases.customerService'),
    t('home.aiUseCases.optimization')
  ];

  return (
    <MatrixText 
      baseText="AI " 
      texts={aiUseCases}
      description={t('home.description')}
      ctaText={t('home.cta')}
    />
  );
}