import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Operation } from '@operations/types';
import OperationListItem from '../OperationListItem/OperationListItem';
import { COLORS } from '@ui/theme/colors';

type Props = {
  date: string;
  operations: Operation[];
};

const OperationGroupItem = ({ date, operations }: Props) => {
  return (
    <View>
      <DateHeader>
        <DateLabel>{date}</DateLabel>
        <CountLabel>{operations.length} opérations</CountLabel>
      </DateHeader>
      {operations.map((op) => (
        <OperationListItem
          key={op.id}
          label={op.label}
          amount={op.amount}
          categoryLabel="-"
          tagLabel="-"
          tagColor="blue"
        />
      ))}
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
