import { useEffect, useMemo, useState } from "react"
import { TabsLayout } from "./components/Tabs-layout"
import { Navbar } from "./Navbar/navbar"
import { useTgUserId } from "./store/tg_user_id"
import { IWebApp } from "./telegram/t.types"
import { useChildQuery } from "./hooks/useChildQuery"

function App() {
  const tgUserId = useTgUserId((state) => state.tgUserId)
  const setTgUserId = useTgUserId((state) => state.setTgUserId)

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
    }
  }, [webApp?.initDataUnsafe?.user?.id])

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center relative">
        <TabsLayout />
      </div>

      <p>{tgUserId}</p>

      {tg?.user?.first_name}
      {child.data && (
        <>
          <p>{child.data?.sex}</p>
          <p>{child.data?.phone}</p>
        </>
      )}
    </>
  )
}

export default App
