import { formatSignedAmount } from '@shared/utils/format';
import Tag from '@ui/components/Tag/Tag';
import { COLORS } from '@ui/theme/colors';
import { TagColorKey } from '@ui/theme/tagColors';
import styled from 'styled-components/native';

type Props = {
  label: string;
  amount: number;
  description: string;
  tagLabel: string;
  tagColor?: TagColorKey;
};

const OperationListItem = ({
  label,
  amount,
  description,
  tagLabel,
  tagColor,
}: Props) => {
  const amountColor = amount > 0 ? COLORS.primary : COLORS.text;

  return (
    <Container>
      <TopRow>
        <LabelContainer>
          <Label numberOfLines={1}>{label}</Label>
          <Description numberOfLines={2}>{description}</Description>
        </LabelContainer>
        <Amount $amountColor={amountColor}>{formatSignedAmount(amount)}</Amount>
      </TopRow>
      <TagContainer>
        <Tag label={tagLabel} color={tagColor} />
      </TagContainer>
    </Container>
  );
};

export default OperationListItem;

const Container = styled.View({
  paddingVertical: 16,
  paddingHorizontal: 24,
  backgroundColor: COLORS.white,
  gap: 8,
});

const TopRow = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

const LabelContainer = styled.View({
  flexShrink: 1,
});

const TagContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'flex-end',
});

const Label = styled.Text({
  fontSize: 14,
  fontFamily: 'OpenSans-Semibold',
  color: COLORS.text,
});

const Description = styled.Text({
  fontSize: 11,
  fontFamily: 'OpenSans-Italic',
  color: COLORS.darkGray,
});

const Amount = styled.Text<{ $amountColor: string }>(({ $amountColor }) => ({
  fontSize: 16,
  fontFamily: 'OpenSans-Semibold',
  color: $amountColor,
}));
