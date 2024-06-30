"use client"
import { LogOut, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
// import { Skeleton } from "@/components/ui/skeleton"

export function Profile() {
//   const session = useAppSession()
  //   const { signOut, isPending: isLoadingSignOut } = useSignOut();

//   if (session.status === "loading") {
//     return <Skeleton className="w-8 h-8 rounded-full" />
//   }

//   if (session.status === "unauthenticated") {
//     return <SignInButton />
//   }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-px rounded-full self-center h-8 w-8"
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://img.itch.zone/aW1nLzI1ODg0MzUucG5n/original/BgfzCZ.png" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          {/* <ProfileAvatar profile='{user}' className="w-8 h-8" /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 mr-2">
        <DropdownMenuLabel>
          <p>Мой аккаунт</p>
          <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
            Rufat
          </p>
        </DropdownMenuLabel>
        <DropdownMenuGroup></DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <a href={`/profile/1`}>
              <User className="mr-2 h-4 w-4" />
              <span>Профиль</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem
          // disabled={isLoadingSignOut}
          // onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Выход</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
