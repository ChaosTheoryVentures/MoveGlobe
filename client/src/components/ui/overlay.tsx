import { MatrixText } from './matrix-text';

export function Overlay() {
  const aiUseCases = [
    'to handle lead generation',
    'for scaling your business',
    'to cut costs by 60%',
    'to automate workflows',
    'for intelligent insights',
    'to boost productivity',
    'for customer service',
    'to optimize operations'
  ];

  return (
    <MatrixText 
      baseText="AI " 
      texts={aiUseCases}
    />
  );
}