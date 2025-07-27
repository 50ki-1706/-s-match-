import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const BioArea = ({
  profileText,
  setProfileText,
  isEditing,
}: {
  profileText: string;
  setProfileText: (value: string) => void;
  isEditing: boolean;
}) => {
  return (
    <Card>
      <CardContent className='pt-6'>
        {isEditing ? (
          <Textarea value={profileText} onChange={(e) => setProfileText(e.target.value)} rows={4} />
        ) : (
          <p className='leading-relaxed text-gray-700'>{profileText}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default BioArea;
