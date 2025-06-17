import { COLORS } from '@ui/theme/colors';
import { TAG_COLOR_MAP, TagColorKey } from '@ui/theme/tagColors';
import styled from 'styled-components/native';

type Props = {
  label: string;
  color?: TagColorKey;
};

const Tag = ({ label, color }: Props) => {
  const isUncategorized = label === '';
  const colors = color ? TAG_COLOR_MAP[color] : undefined;

  if (isUncategorized) {
    return (
      <UncategorizedContainer $bgColor={COLORS.white}>
        <Label $color={COLORS.text}>Non catégorisé</Label>
      </UncategorizedContainer>
    );
  }

  return (
    <Container $bgColor={colors?.backgroundColor || COLORS.white}>
      <Label $color={colors?.textColor || COLORS.text}>{label}</Label>
    </Container>
  );
};

export default Tag;

const Container = styled.View<{ $bgColor: string }>(({ $bgColor }) => ({
  paddingVertical: 4,
  paddingHorizontal: 8,
  borderRadius: 3,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: $bgColor,
}));

const UncategorizedContainer = styled(Container)<{ $bgColor: string }>(
  ({ $bgColor }) => ({
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: $bgColor,
  }),
);

const Label = styled.Text<{ $color: string }>(({ $color }) => ({
  fontSize: 11,
  fontFamily: 'OpenSans-Italic',
  color: $color,
}));
