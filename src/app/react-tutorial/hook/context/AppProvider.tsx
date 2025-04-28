'use client'

import { createContext, ReactNode, useContext, useState } from "react";

type Props = {
    children: ReactNode;
}

type AppContextType = {
    id: string;
    setNumber: (number: number) => void;
}

// contextとして引き渡す値を設定する
const AppContext = createContext<AppContextType>({id:'', setNumber:()=>{}});


/**
 * 以下のProviderで定義された要素の子要素では、context内の値を使える
 */
export default function AppProvider({children}:Props) {

    const id = "abc"
    const [number, setNumber] = useState<number>(0);
    const contextValue = {id, setNumber};

    if (number !== 0) {
        alert(number)
    }
    
    return(
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

// 実際に外部から呼び出す際には、これを利用する
export function useAppContext():AppContextType {
    return useContext(AppContext)
}