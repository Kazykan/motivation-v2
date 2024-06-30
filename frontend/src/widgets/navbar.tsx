import { ModeToggle } from "@/components/mode-toggle"
import { Profile } from "./app-header/_ui/profile"

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <nav className="flex items-start md:items-center gap-6 text-sm font-medium flex-col md:flex-row ">
          <div className="transition-colors hover:text-foreground/80 text-foreground/60">
            dsadas
          </div>
          {/* <link
        className="transition-colors hover:text-foreground/80 text-foreground/60"
        href="/map"
        >
        Карта
        </link>
        <link
        className="transition-colors hover:text-foreground/80 text-foreground/60"
        href="/learn"
        >
        Обучение
      </link> */}
        </nav>
        <div className="space-x-5 pr-2 items-center">
          <ModeToggle />
          <Profile />
        </div>
      </div>
    </header>
  )
}
