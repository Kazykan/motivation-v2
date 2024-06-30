import { Layout } from "./_ui/layout"
import logoSVG from "src/widgets/app-header/logo.svg"
import { MainNav } from "./_ui/main-nav"
import { Profile } from "./_ui/profile"
import { ModeToggle } from "@/components/mode-toggle"

export function AppHeader() {
  return (
    <Layout
    //   logo={<img src={logoSVG} />}
      nav={<MainNav />}
      profile={<Profile />}
      actions={<ModeToggle />}
    />
  )
}
