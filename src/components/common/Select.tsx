'use client';

import React from 'react';
import ReactSelect, {
  StylesConfig,
  type CSSObjectWithLabel,
  type OptionProps,
  type ControlProps,
  type DropdownIndicatorProps,
} from 'react-select';

const SIZE_CONFIG = {
  small: {
    minHeight: 40,
    borderRadius: 8,
    paddingX: 12,
    paddingY: 8,
    fontSize: '0.875rem', // 14px - matches Input text-sm
    optionPadding: '8px 12px',
    optionBorderRadius: 6,
    indicatorPaddingRight: 8,
  },
  medium: {
    minHeight: 48,
    borderRadius: 12,
    paddingX: 16,
    paddingY: 4,
    fontSize: '1rem', // 16px
    optionPadding: '12px 16px',
    optionBorderRadius: 8,
    indicatorPaddingRight: 12,
  },
} as const;

const buildControlStyles = (size: 'small' | 'medium', isFocused: boolean) => {
  const config = SIZE_CONFIG[size];
  const borderColor = isFocused
    ? 'var(--color-primary)'
    : 'var(--color-border)';

  return {
    minHeight: config.minHeight,
    borderRadius: config.borderRadius,
    borderWidth: 1,
    borderColor,
    boxShadow: 'none',
    backgroundColor: 'var(--color-background)',
    '&:hover': {
      borderColor,
    },
  };
};

const buildValueContainerStyles = (size: 'small' | 'medium') => {
  const config = SIZE_CONFIG[size];

  return {
    paddingLeft: config.paddingX,
    paddingRight: config.paddingX,
    paddingTop: config.paddingY,
    paddingBottom: config.paddingY,
  };
};

const buildTextStyles = (size: 'small' | 'medium') => {
  const config = SIZE_CONFIG[size];

  return {
    margin: 0,
    padding: 0,
    fontSize: config.fontSize,
  };
};

const buildMenuStyles = (size: 'small' | 'medium') => {
  const config = SIZE_CONFIG[size];

  return {
    borderRadius: config.borderRadius,
    overflow: 'hidden',
    boxShadow: 'none',
    border: '1px solid var(--color-border)',
    marginTop: 4,
  };
};

const buildOptionStyles = (
  size: 'small' | 'medium',
  isSelected: boolean,
  isFocused: boolean,
) => {
  const config = SIZE_CONFIG[size];

  const backgroundColor = isSelected
    ? 'var(--color-primary)'
    : isFocused
      ? 'var(--color-muted)'
      : 'transparent';

  const color = isSelected
    ? 'var(--color-primary-foreground)'
    : 'var(--color-foreground)';

  return {
    fontSize: size === 'small' ? '0.875rem' : '0.9375rem',
    padding: config.optionPadding,
    borderRadius: config.optionBorderRadius,
    backgroundColor,
    color,
    cursor: 'pointer',
  };
};

const buildIndicatorStyles = (size: 'small' | 'medium', isOpen?: boolean) => {
  const config = SIZE_CONFIG[size];

  return {
    color: 'var(--color-muted-foreground)',
    paddingRight: config.indicatorPaddingRight,
    '&:hover': {
      color: 'var(--color-foreground)',
    },
    ...(isOpen !== undefined && {
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease-in-out',
    }),
  };
};

type SelectProps = React.ComponentProps<typeof ReactSelect> & {
  size?: 'small' | 'medium';
};

const getSelectStyles = (size: 'small' | 'medium'): StylesConfig => {
  return {
    control: (base: CSSObjectWithLabel, state: ControlProps) => ({
      ...base,
      ...buildControlStyles(size, state.isFocused),
    }),

    valueContainer: (base: CSSObjectWithLabel) => ({
      ...base,
      ...buildValueContainerStyles(size),
    }),

    input: (base: CSSObjectWithLabel) => ({
      ...base,
      ...buildTextStyles(size),
      color: 'var(--color-foreground)',
    }),

    singleValue: (base: CSSObjectWithLabel) => ({
      ...base,
      ...buildTextStyles(size),
      color: 'var(--color-foreground)',
    }),

    placeholder: (base: CSSObjectWithLabel) => ({
      ...base,
      ...buildTextStyles(size),
      color: 'var(--color-muted-foreground)',
    }),

    menu: (base: CSSObjectWithLabel) => ({
      ...base,
      ...buildMenuStyles(size),
    }),

    menuList: (base: CSSObjectWithLabel) => ({
      ...base,
      padding: 4,
    }),

    option: (base: CSSObjectWithLabel, state: OptionProps) => ({
      ...base,
      ...buildOptionStyles(size, state.isSelected, state.isFocused),
    }),

    indicatorSeparator: () => ({
      display: 'none',
    }),

    dropdownIndicator: (
      base: CSSObjectWithLabel,
      state: DropdownIndicatorProps,
    ) => ({
      ...base,
      ...buildIndicatorStyles(size, state.selectProps.menuIsOpen),
    }),

    clearIndicator: (base: CSSObjectWithLabel) => ({
      ...base,
      ...buildIndicatorStyles(size),
    }),
  };
};

const Select = ({ size = 'medium', ...props }: SelectProps) => {
  const styles = getSelectStyles(size);

  return (
    <div>
      <ReactSelect {...props} styles={styles} />
    </div>
  );
};

export default Select;
