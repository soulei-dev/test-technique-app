import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { CategoriesGroup, Category } from '@categories/types';
import { COLORS } from '@ui/theme/colors';
import Divider from '@ui/components/Divider/Divider';
import { TAG_COLOR_MAP, TagColorKey } from '@ui/theme/tagColors';
import { Spacer } from '@ui/components/Spacer/Spacer';

type Props = {
  label: string;
  color: TagColorKey;
  categories: Category[];
  onCategorySelect: (cat: Category, group: CategoriesGroup) => void;
};

const CategoryGroupItem = ({
  label,
  color,
  categories,
  onCategorySelect,
}: Props) => {
  const colors = TAG_COLOR_MAP[color];
  const group: CategoriesGroup = {
    id: categories[0].groupId,
    label,
    color,
  };

  return (
    <View>
      <GroupHeader $bgColor={colors.backgroundColor}>
        <GroupLabel $color={colors.textColor}>{label}</GroupLabel>
      </GroupHeader>

      {categories.map((cat, index) => (
        <View key={cat.id}>
          <ButtonContainer onPress={() => onCategorySelect(cat, group)}>
            <CategoryLabel>{cat.label}</CategoryLabel>
            <CategoryDescription>{cat.description}</CategoryDescription>
          </ButtonContainer>
          {index < categories.length - 1 && <Divider />}
        </View>
      ))}
    </View>
  );
};

export default CategoryGroupItem;

const GroupHeader = styled.View<{ $bgColor: string }>(({ $bgColor }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: $bgColor,
  paddingVertical: 4,
  paddingHorizontal: 24,
}));

const GroupLabel = styled.Text<{ $color: string }>(({ $color }) => ({
  fontSize: 11,
  fontFamily: 'OpenSans-Regular',
  color: $color,
}));

const ButtonContainer = styled.TouchableOpacity({
  paddingVertical: 16,
  paddingHorizontal: 24,
  backgroundColor: 'white',
  gap: 4,
});

const CategoryLabel = styled.Text({
  fontSize: 16,
  fontFamily: 'OpenSans-Semibold',
  color: COLORS.text,
});

const CategoryDescription = styled.Text({
  fontSize: 14,
  fontFamily: 'OpenSans-Regular',
  color: COLORS.darkGray,
});
