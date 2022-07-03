import { createStyles } from '@mantine/core';

export default createStyles((theme, { selected }) => {
  const colors = theme.fn.variant({
    color: theme.colors[theme.primaryColor][theme.fn.primaryShade()],
    variant: 'light',
  });

  return {
    root: {
      backgroundColor: selected ? colors.background : null,
      ':hover': {
        backgroundColor: selected ? `${colors.hover} !important` : undefined,
        '& .mantine-Button-icon': {
          color: colors.color,
        },
        '& .mantine-Button-label': {
          color: colors.color,
        },
      },
    },
    inner: { justifyContent: 'flex-start' },
    label: { fontWeight: 500, color: !selected ? theme.colors.gray[6] : null },
    icon: {
      color: !selected ? theme.colors.gray[6] : null,
      marginLeft: '2px',
    },
  };
});
