import { useEffect, useMemo, useState } from "react"
import { TabsLayout } from "./components/Tab-layout/Tabs-layout"
import { Navbar } from "./Navbar/navbar"
import { useTgUser } from "./store/tg_user"
import { IWebApp } from "./telegram/t.types"
import { useChildQuery } from "./hooks/useChildQuery"
import { CarouselDApiDemo } from "./components/carousel-layout"
import { DialogAddUser } from "./components/form/dialog-add-user"

function App() {
  const setTgUserId = useTgUser((state) => state.setTgUserId)
  const setTgUserName = useTgUser((state) => state.setFirstName)
  const [webApp, setWebApp] = useState<IWebApp | null>(null)
  const tgUserId = useTgUser((state) => state.tgUserId)

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
  }, [tg.user?.id])

  const child = useChildQuery(tgUserId, !!tgUserId)

  return (
    <>
      <Navbar />
      {typeof tg.user?.id === "number" && tg.user.id !== undefined && (
        <>
          {child.data ? (
            <div>
              <TabsLayout />
            </div>
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
        </>
      )}

      {tg?.user?.photo_url && <img src={tg.user.photo_url} alt="User Photo" />}
    </>
  )
}

export default App
