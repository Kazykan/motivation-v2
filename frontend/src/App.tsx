import { useEffect, useMemo, useState } from "react"
import { TabsLayoutParent } from "./components/Tab-layout/Tabs-layout-parent"
import { Navbar } from "./Navbar/navbar"
import { useTgUser } from "./store/tg_user"
import { IWebApp } from "./telegram/t.types"
import { useChildByBotUserIdQuery } from "./hooks/useChildQuery"
import { CarouselDApiDemo } from "./components/carousel-layout"
import { DialogAddChild } from "./components/form/dialog-add-child"
import { DialogAddParent } from "./components/form/dialog-add-parent"
import { useParentBotUserIdQuery } from "./hooks/useParentQuery"
import { TabsLayoutChild } from "./components/Tab-layout/Tabs-layout-child"
import { useWeek } from "./store/week"
import { useChild } from "./store/user"

function App() {
  const setTgUserId = useTgUser((state) => state.setTgUserId)
  const setTgUserName = useTgUser((state) => state.setFirstName)
  const [webApp, setWebApp] = useState<IWebApp | null>(null)
  const tgUserId = useTgUser((state) => state.tgUserId)
  const setParentId = useTgUser((state) => state.setParentId)
  const setChildBotUserId = useTgUser((state) => state.setChildBotUserId)
  const currentWeek = useWeek((state) => state.current_week)
  const setStartOfWeek = useWeek((state) => state.setStartOfWeek)
  const setEndOfWeek = useWeek((state) => state.setEndOfWeek)
  const setChildId = useChild((state) => state.setChildId)

  useMemo(
    () => setStartOfWeek(currentWeek),
    [currentWeek]
  )

  useMemo(() => setEndOfWeek(currentWeek), [currentWeek])

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

  const child = useChildByBotUserIdQuery(tgUserId, !!tgUserId)
  const parent = useParentBotUserIdQuery(tgUserId, !!tgUserId)

  useEffect(() => {
    if (parent.data?.bot_user_id !== undefined) {
      setParentId(parent.data?.bot_user_id)
    }
  }, [parent.data])

  useEffect(() => {
    if (child.data?.bot_user_id !== undefined) {
      setChildBotUserId(child.data?.bot_user_id)
      setChildId(child.data?.id)
    }
  }, [child.data])

  return (
    <>
      <Navbar />
      {typeof tg.user?.id === "number" && tg.user.id !== undefined && (
        <>
          {child.data && <TabsLayoutChild />}
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
    </>
  )
}

export default App
