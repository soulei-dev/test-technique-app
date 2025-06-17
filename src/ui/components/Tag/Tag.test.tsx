import React from 'react';
import { render } from '@testing-library/react-native';
import Tag from './Tag';
import { COLORS } from '@ui/theme/colors';
import { TAG_COLOR_MAP } from '@ui/theme/tagColors';

const extractStyle = (element: any) => {
  const styles = Array.isArray(element.props.style)
    ? element.props.style
    : [element.props.style];
  return Object.assign({}, ...styles);
};

describe('Tag', () => {
  it('renders label and applies correct text and background colors when color is provided', () => {
    const { getByText, toJSON } = render(<Tag label="Frais" color="purple" />);
    const label = getByText('Frais');
    const tree = toJSON();

    const containerStyle = extractStyle(tree);
    const labelStyle = extractStyle(label);

    expect(label).toBeTruthy();
    expect(containerStyle.backgroundColor).toBe(
      TAG_COLOR_MAP.purple.backgroundColor,
    );
    expect(labelStyle.color).toBe(TAG_COLOR_MAP.purple.textColor);
  });

  it('renders label with fallback text and background colors when color is not provided', () => {
    const { getByText, toJSON } = render(<Tag label="Revenus" />);
    const label = getByText('Revenus');
    const tree = toJSON();

    const containerStyle = extractStyle(tree);
    const labelStyle = extractStyle(label);

    expect(label).toBeTruthy();
    expect(containerStyle.backgroundColor).toBe(COLORS.white);
    expect(labelStyle.color).toBe(COLORS.text);
  });

  it('renders fallback "Non catégorisé" tag with gray border and default colors', () => {
    const { getByText, toJSON } = render(<Tag label="" />);
    const label = getByText('Non catégorisé');
    const tree = toJSON();

    const containerStyle = extractStyle(tree);
    const labelStyle = extractStyle(label);

    expect(label).toBeTruthy();
    expect(containerStyle.backgroundColor).toBe(COLORS.white);
    expect(containerStyle.borderColor).toBe(COLORS.gray);
    expect(containerStyle.borderWidth).toBe(1);
    expect(labelStyle.color).toBe(COLORS.text);
  });
});
