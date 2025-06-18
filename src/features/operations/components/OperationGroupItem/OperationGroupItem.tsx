import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Operation } from '@operations/types';
import OperationListItem from '../OperationListItem/OperationListItem';
import { COLORS } from '@ui/theme/colors';
import Divider from '@ui/components/Divider/Divider';
import { CategoriesGroup, Category } from '@categories/types';

type Props = {
  date: string;
  operations: Operation[];
  categories: Category[];
  categoriesGroups: CategoriesGroup[];
};

const OperationGroupItem = ({
  date,
  operations,
  categories,
  categoriesGroups,
}: Props) => {
  return (
    <View>
      <DateHeader>
        <DateLabel>{date}</DateLabel>
        <CountLabel>{operations.length} opérations</CountLabel>
      </DateHeader>
      {operations.map((op, index) => {
        const category = categories.find((c) => c.id === op.categoryId);
        const categoryGroup = categoriesGroups.find(
          (g) => g.id === category?.groupId,
        );

        return (
          <View key={op.id}>
            <OperationListItem
              label={op.label}
              amount={op.amount}
              categoryLabel={category?.label ?? ''}
              tagLabel={categoryGroup?.label ?? ''}
              tagColor={categoryGroup?.color ?? undefined}
            />
            {index < operations.length - 1 && <Divider />}
          </View>
        );
      })}
    </View>
  );
};

export default OperationGroupItem;

const DateHeader = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: COLORS.gray200,
  paddingVertical: 4,
  paddingHorizontal: 24,
});

const DateLabel = styled.Text({
  fontSize: 11,
  fontFamily: 'OpenSans-Regular',
  color: COLORS.text,
});

const CountLabel = styled.Text({
  fontSize: 11,
  color: COLORS.gray350,
  fontFamily: 'OpenSans-Regular',
});
