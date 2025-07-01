import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"


type TSessionState = {
    accessToken?: string 
    isLogin?: boolean //<
    setIsLogin: (isLogin: boolean) => void //<
    username?: string 
    rol?: string 
    userId?: number //<
    monto?: number
    setMonto: (monto?: number) => void
    setUserId: (userId?: number) => void //<
    routeId ?: string
    routeStatus : boolean
    setUsername: (username : string) => void 
    setRouteStatus : (status : boolean) => void
    setRol: (rol : string) => void
    setAccessToken: (accessToken : string) => void 
    setRouteId : (routeId ?: string) => void
    clearSession: () => void 
}


const useSessionStore = create<TSessionState>()(
    devtools(
        persist(
            (set) => ({
                accessToken: undefined,
                username: undefined,
                rol: undefined,
                routeStatus: false,
                routeId : undefined,
                userId: undefined, //<
                isLogin: false, //<
                monto: undefined,
                setMonto: (monto? : number) => set(() => ({ monto })), 
                setIsLogin: (isLogin : boolean) => set(() => ({ isLogin })), //<
                setRouteStatus : (routeStatus : boolean) => set(() => ({ routeStatus })),
                setUsername: (username : string) => set(() => ({ username })),
                setUserId: (userId? : number) => set(() => ({ userId })), //<
                setAccessToken: (accessToken : string) => set(() => ({ accessToken })),
                setRol: (rol : string) => set(() => ({ rol })),
                setRouteId : (routeId ?: string) => set(() => ({ routeId })),
                clearSession: () => (
                    set(() => ({
                        accessToken: undefined,
                        rol: undefined,
                        username: undefined
                    }))
                )                
            }),
            {
                name: 'sessionStore',
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
)

export default useSessionStore