import { createStyles, Group, UnstyledButton } from '@mantine/core';
import { useSpotlight } from '@mantine/spotlight';
import KbdShortcut from 'components/UI/KbdShortcut';
import { useAppColorscheme } from 'hooks/colorscheme';
import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
};

const useStyles = createStyles((t) => {
  const { isDark } = useAppColorscheme();

  return {
    btn: {
      backgroundColor: isDark ? t.colors.dark[8] : t.colors.gray[0],
      border: '1px solid',
      padding: '0.625rem 0.8rem',
      marginBottom: 16,
      borderColor: isDark ? 'transparent' : t.colors.gray[1],
      borderRadius: t.radius.md,

      '&:hover': {
        backgroundColor: isDark
          ? t.fn.darken(t.colors.dark[8], 0.1)
          : t.fn.darken(t.colors.gray[0], 0.008),
      },
    },

    box: {
      flex: 1,
    },
  };
});

const NavSearchItem = ({ icon }: Props) => {
  const { openSpotlight } = useSpotlight();
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.btn} onClick={openSpotlight}>
      <Group className={classes.box}>
        {icon}
        <Group spacing={8} position="apart" className={classes.box}>
          <span>Search</span>
          <KbdShortcut keys={['Ctrl', 'K']} />
        </Group>
      </Group>
    </UnstyledButton>
  );
};

export default NavSearchItem;
