import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '@ui/theme/colors';
import { Category } from '@categories/types';
import Divider from '@ui/components/Divider/Divider';

type Props = {
  category: Category;
  showDivider?: boolean;
};

const CategoryItem = ({ category, showDivider = false }: Props) => (
  <>
    <Wrapper>
      <Label>{category.label}</Label>
      <Description>{category.description}</Description>
    </Wrapper>
    {showDivider && <Divider />}
  </>
);

export default CategoryItem;

const Wrapper = styled.View({
  paddingVertical: 16,
  paddingHorizontal: 24,
  backgroundColor: 'white',
  gap: 4,
});

const Label = styled.Text({
  fontSize: 16,
  fontFamily: 'OpenSans-Semibold',
  color: COLORS.text,
});

const Description = styled.Text({
  fontSize: 14,
  fontFamily: 'OpenSans-Regular',
  color: COLORS.darkGray,
});
