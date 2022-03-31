import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import Link from 'next/link';
import React from 'react';

export const NavbarItem = ({ icon, label, color, href }) => {
  const { isDark } = useAppColorscheme();

  return (
    <Link href={href} passHref>
      <UnstyledButton
        sx={(t) => ({
          borderRadius: t.radius.sm,
          padding: 8,
          '&:hover': {
            backgroundColor: isDark ? t.colors.gray[9] : t.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon
            radius="sm"
            size="lg"
            variant="light"
            // TODO: decide on colors
            color={isDark ? color : 'more-dark'}
          >
            {icon}
          </ThemeIcon>
          <Text size="md">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
};
