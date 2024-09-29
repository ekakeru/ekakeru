"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import MdiLogin from "~icons/mdi/login";

export function SessionAccountMenu() {
  const { data: session } = useSession();

  return session === null ? (
    <Button onClick={() => signIn()} variant="outline" leftIcon={<MdiLogin />}>
      Login
    </Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          src={session?.user?.image ?? undefined}
          className="size-9 overflow-hidden rounded"
          alt={session?.user?.name ?? undefined}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center gap-2 p-2">
          <Avatar>
            <AvatarImage src={session?.user?.image ?? undefined} />
            <AvatarFallback>{session?.user?.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>

          <div>
            <div className="font-medium">{session?.user?.name}</div>
            <div className="text-muted-foreground text-xs">
              {session?.user?.email}
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          color="red"
          onClick={() => {
            void signOut();
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
