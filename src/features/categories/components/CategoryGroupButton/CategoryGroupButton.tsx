import React from 'react';
import styled from 'styled-components/native';
import Entypo from '@expo/vector-icons/Entypo';
import { TAG_COLOR_MAP, TagColorKey } from '@ui/theme/tagColors';
import { COLORS } from '@ui/theme/colors';

type Props = {
  label: string;
  color?: TagColorKey;
  onPress?: () => void;
};

const CategoryGroupButton = ({ label, color, onPress }: Props) => {
  const colors = color ? TAG_COLOR_MAP[color] : undefined;

  return (
    <Container
      $backgroundColor={colors?.backgroundColor || COLORS.white}
      onPress={onPress}
    >
      <Label $labelColor={colors?.textColor || COLORS.text}>{label}</Label>
      <Entypo name="chevron-thin-right" size={16} color={COLORS.text} />
    </Container>
  );
};

export default CategoryGroupButton;

const Container = styled.TouchableOpacity<{ $backgroundColor: string }>(
  ({ $backgroundColor }) => ({
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: $backgroundColor,
  }),
);

const Label = styled.Text<{ $labelColor: string }>(({ $labelColor }) => ({
  fontSize: 14,
  fontFamily: 'Eina03-SemiBold',
  color: $labelColor,
}));
