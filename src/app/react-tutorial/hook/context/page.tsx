'use client'

import AppProvider, { useAppContext } from "./AppProvider";

export default function Home() {

    return (
        <main>
            <h1>useContext</h1>
            <AppProvider>
                <ContextSample1 />
            </AppProvider>
        </main>
    )
}


function ContextSample1() {
    const {id, setNumber} = useAppContext();
    const handler = () => {
        setNumber(Math.random())
    }
    
    return (
        <section>
            <h2>サンプル1</h2>
                <p>{id}</p>
                <button onClick={handler}>番号を変更</button>
        </section>
    )
}