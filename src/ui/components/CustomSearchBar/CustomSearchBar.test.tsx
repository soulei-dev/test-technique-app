import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomSearchBar from './CustomSearchBar';

jest.mock('@expo/vector-icons/Ionicons', () => {
  return () => <></>;
});

describe('CustomSearchBar', () => {
  it('renders the search input with the placeholder', () => {
    const { getByPlaceholderText } = render(
      <CustomSearchBar placeholder="Rechercher un élément" />,
    );

    expect(getByPlaceholderText('Rechercher un élément')).toBeTruthy();
  });

  it('displays the provided value', () => {
    const { getByDisplayValue } = render(
      <CustomSearchBar value="Initial value" />,
    );

    expect(getByDisplayValue('Initial value')).toBeTruthy();
  });

  it('calls onChangeText on every input change', () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <CustomSearchBar
        placeholder="Rechercher un élément"
        value=""
        onChangeText={onChangeTextMock}
      />,
    );

    const input = getByPlaceholderText('Rechercher un élément');

    fireEvent.changeText(input, 'T');
    fireEvent.changeText(input, 'TE');
    fireEvent.changeText(input, 'TES');
    fireEvent.changeText(input, 'TEST');

    expect(onChangeTextMock).toHaveBeenCalledTimes(4);
    expect(onChangeTextMock).toHaveBeenNthCalledWith(1, 'T');
    expect(onChangeTextMock).toHaveBeenNthCalledWith(2, 'TE');
    expect(onChangeTextMock).toHaveBeenNthCalledWith(3, 'TES');
    expect(onChangeTextMock).toHaveBeenNthCalledWith(4, 'TEST');
  });
});
