import React, { useState } from 'react';
import styled from 'styled-components/native';
import { COLORS } from '@ui/theme/colors';

export type FilterOption = 'group' | 'az' | 'za';

type Props = {
  onChange: (filter: FilterOption) => void;
};

const CategorySortButtons = ({ onChange }: Props) => {
  const [active, setActive] = useState<FilterOption>('group');

  const handlePress = (option: FilterOption) => {
    setActive(option);
    onChange(option);
  };

  return (
    <ButtonContainer>
      <SortButton
        isActive={active === 'group'}
        label="Groupes"
        onPress={() => handlePress('group')}
      />
      <SortButton
        isActive={active === 'az'}
        label="A - Z"
        onPress={() => handlePress('az')}
      />
      <SortButton
        isActive={active === 'za'}
        label="Z - A"
        onPress={() => handlePress('za')}
      />
    </ButtonContainer>
  );
};

export default CategorySortButtons;

// ================= Styled =================

const ButtonContainer = styled.View({
  flexDirection: 'row',
  gap: 8,
});

const StyledButton = styled.TouchableOpacity<{ $active: boolean }>(
  ({ $active }) => ({
    backgroundColor: $active ? COLORS.primary : COLORS.gray200,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  }),
);

const StyledLabel = styled.Text<{ $active: boolean }>(({ $active }) => ({
  color: $active ? COLORS.white : COLORS.gray350,
  fontFamily: $active ? 'OpenSans-Semibold' : 'OpenSans-Regular',
  fontSize: 14,
}));

// ================= Sub component =================

type SortButtonProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

const SortButton = ({ label, isActive, onPress }: SortButtonProps) => (
  <StyledButton onPress={onPress} $active={isActive}>
    <StyledLabel $active={isActive}>{label}</StyledLabel>
  </StyledButton>
);
