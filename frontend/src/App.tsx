import { useEffect, useMemo, useState } from "react"
import { TabsLayout } from "./components/Tabs-layout"
import { Navbar } from "./Navbar/navbar"
import { useTgUser } from "./store/tg_user"
import { IWebApp } from "./telegram/t.types"
import { useChildQuery } from "./hooks/useChildQuery"
import { CarouselDApiDemo } from "./components/carousel-layout"
import { DialogAddUser } from "./components/dialog"

function App() {
  const tgUserId = useTgUser((state) => state.tgUserId)
  const setTgUserId = useTgUser((state) => state.setTgUserId)
  const tgUserName = useTgUser((state) => state.first_name)
  const setTgUserName = useTgUser((state) => state.setFirstName)
  const [webApp, setWebApp] = useState<IWebApp | null>(null)

  const child = useChildQuery(tgUserId!)

  useEffect(() => {
    const telegram = (window as any).Telegram.WebApp
    if (telegram) {
      telegram.ready()
      setWebApp(telegram)
    }
  }, [])

  const tg = useMemo(() => {
    return webApp
      ? {
          tg: webApp,
          user: webApp.initDataUnsafe.user,
        }
      : {}
  }, [webApp])

  useEffect(() => {
    if (typeof tg.user?.id === "number") {
      setTgUserId(tg.user?.id)
      setTgUserName(tg.user?.first_name)
    }
    

  }, [webApp?.initDataUnsafe?.user?.id])

  return (
    <>
      <Navbar />
      {child.data ? (
        <TabsLayout />
      ) : (
        <>
          <div className="flex justify-center items-center relative mt-3">
            <CarouselDApiDemo />
          </div>
          {tgUserId && (
            <div className="flex justify-center items-center relative mb-3">
              {tgUserId && <DialogAddUser />}
            </div>
          )}
        </>
      )}

      {tg?.user?.photo_url && (
        <img src={tg.user.photo_url} alt="User Photo" />
      )}

    </>
  )
}

export default App
