import { BioCard } from './BioCard';
import { EducationCard } from './EducationCard';
import { LocationCard } from './LocationCard';

export function BentoGrid() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginBottom: '3rem',
      }}
    >
      <BioCard />
      <EducationCard />
      <LocationCard />
    </div>
  );
}
