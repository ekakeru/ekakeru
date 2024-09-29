"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import MdiLogin from "~icons/mdi/login";
import MdiLogout from "~icons/mdi/logout";

export function SessionAccountMenu() {
  const { data: session } = useSession();

  return session === null ? (
    <Button onClick={() => signIn()} variant="outline">
      <MdiLogin />
      Login
    </Button>
  ) : (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="icon">
            <AvatarImage src={session?.user?.image ?? undefined} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={session?.user?.image ?? undefined} />
                <AvatarFallback>
                  {session?.user?.name?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="font-medium">{session?.user?.name}</div>
                <div className="text-muted-foreground text-xs">
                  {session?.user?.email}
                </div>
              </div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            color="red"
            onClick={() => {
              void signOut();
            }}
          >
            <MdiLogout />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
