import { createContext, useEffect, useState } from 'react'

export interface articleTypes {
    Allurl: string[]
    Allsummary: string[]
    LocalData?: any
    active: boolean
    done: boolean
    CheckingActive?: (data: boolean) => void
    CheckingDone?: (data: boolean) => void
    gettingData?: (data: revievedDataTypes) => void
}

export interface revievedDataTypes {
    url: string
    summary: string
}

export const storeContext = createContext({
    Allurl: [],
    Allsummary: [],
    LocalData: '',
    active: false,
    done: false,
    gettingData: (data: revievedDataTypes) => {},
    CheckingActive: (data: boolean) => {},
    CheckingDone: (data: boolean) => {},
})

export const StoreProvider = (props: any) => {
    const LOCAL_STORAGE = JSON.parse(localStorage.getItem('AllData')!) || {
        Allurl: [],
        Allsummary: [],
    }
    const [store, setStore] = useState(LOCAL_STORAGE)
    const [active, setActive] = useState<boolean>(false)
    const [done, setDone] = useState<boolean>(false)

    // updating the store data
    const SettingNewStore = (data: revievedDataTypes) => {
        setStore({
            Allurl: [data.url, ...store.Allurl],
            Allsummary: [data.summary, ...store.Allsummary],
        })
    }

    const CheckingActiveHandler = (data: boolean) => {
        setActive(data)
    }

    const CheckingDoneHandler = (data: boolean) => {
        setDone(data)
    }

    // storing the data at localstorage
    const storingNewStoreInLocalStorage = () => {
        localStorage.setItem('AllData', JSON.stringify(store))
    }
    useEffect(() => storingNewStoreInLocalStorage(), [store])

    const newStore: articleTypes = {
        Allurl: store.Allurl,
        Allsummary: store.Allsummary,
        LocalData: LOCAL_STORAGE,
        active: active,
        done: done,
        gettingData: SettingNewStore,
        CheckingActive: CheckingActiveHandler,
        CheckingDone: CheckingDoneHandler,
    }

    return (
        <>
            <storeContext.Provider value={newStore}>
                {props.children}
            </storeContext.Provider>
        </>
    )
}
