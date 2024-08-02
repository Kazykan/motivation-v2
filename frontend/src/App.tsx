import { useEffect, useMemo, useState } from "react"
import { TabsLayoutParent } from "./components/Tab-layout/Tabs-layout-parent"
import { Navbar } from "./Navbar/navbar"
import { useTgUser } from "./store/tg_user"
import { IWebApp } from "./telegram/t.types"
import { useChildQuery } from "./hooks/useChildQuery"
import { CarouselDApiDemo } from "./components/carousel-layout"
import { DialogAddChild } from "./components/form/dialog-add-child"
import { DialogAddParent } from "./components/form/dialog-add-parent"
import { useParentQuery } from "./hooks/useParentQuery"
import { TabsLayoutChild } from "./components/Tab-layout/Tabs-layout-child"
import { IParentWithChildren } from "@/store/types"

function App() {
  const setTgUserId = useTgUser((state) => state.setTgChildId)
  const setTgUserName = useTgUser((state) => state.setFirstName)
  const [webApp, setWebApp] = useState<IWebApp | null>(null)
  const tgUserId = useTgUser((state) => state.tgChildId)
  const tgParentId = useTgUser((state) => state.tgParentId)
  const setParentId = useTgUser((state) => state.setParentId)

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
      setParentId(tg.user?.id)
      setTgUserName(tg.user?.first_name)
    }
  }, [tg.user?.id])

  const child = useChildQuery(tgUserId, !!tgUserId)
  const parent = useParentQuery(tgParentId, !!tgParentId)

  return (
    <>
      <Navbar />
      {typeof tg.user?.id === "number" && tg.user.id !== undefined && (
        <>
          {child.isLoading && <div>Loading...</div>}
          {child.data?.id && <TabsLayoutChild />}
          {parent.data && <TabsLayoutParent />}
          {!child.data && !parent.data && (
            <>
              <div className="flex justify-center items-center relative mt-3">
                <CarouselDApiDemo />
              </div>
              {tgUserId && (
                <div className="flex justify-center items-center relative mb-3">
                  <div className="space-y-3">
                    <div>
                      <p className="text-2xl text-foreground">
                        Создать аккаунт:
                      </p>
                    </div>
                    <div className="flex justify-center gap-3">
                      <DialogAddChild /> <DialogAddParent />
                    </div>
                  </div>
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
