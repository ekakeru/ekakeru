"use client";

import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  Menu,
  rem,
  Text,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";

export function SessionAccountMenu() {
  const { data: session } = useSession();

  return session === null ? (
    <Button onClick={() => signIn()} variant="light">
      Login
    </Button>
  ) : (
    <Group justify="center">
      <Menu
        withArrow
        width={300}
        position="bottom"
        transitionProps={{ transition: "pop" }}
        withinPortal
      >
        <Menu.Target>
          <ActionIcon variant="default">
            <Avatar radius="xl" src={session?.user?.image} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>
            <Group>
              <Avatar radius="xl" src={session?.user?.image} />

              <div>
                <Text fw={500}>{session?.user?.name}</Text>
                <Text size="xs" c="dimmed">
                  {session?.user?.email}
                </Text>
              </div>
            </Group>
          </Menu.Item>

          <Menu.Divider />

          {/* <Menu.Label>Settings</Menu.Label> */}
          {/* <Menu.Item
            leftSection={
              <IconSettings
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
          >
            Account settings
          </Menu.Item> */}
          <Menu.Item
            color="red"
            leftSection={
              <IconLogout
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            onClick={() => {
              void signOut();
            }}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
