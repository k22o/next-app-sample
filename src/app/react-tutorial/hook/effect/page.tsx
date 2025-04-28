'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

const sleep = (delay:number) => {
    const start = Date.now()
    while (true) {
        if (Date.now() - start > delay) {
            break;
        }
    }
}

export default function Home() {

    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    return (
        <main>
            <h1>effect系</h1>
            <p> ?type=1なら、useEffect, それ以外ならuseLayoutEffect</p>
            {type === "1" && <UseEffectSample />}
            {type !== "1" && <UseLayoutEffectSample />}            
            <p>useIntersectionEffectは滅多に使わないので略</p>
        </main>
    )
}

/**
 * useEffectを使ったサンプル
 * レンダリング後にDOMを逐次更新するのに利用
 * EventListener的な使い方をするためのもの
 * useEffect(`第一引数(ラムダ関数)`, `第二引数`)
 *   - 第二が空 `[]` -> 初期render時にのみ、関数を実行
 *   - 第二に値あり -> 初回 + 指定した値に変化があった場合に関数を実行
 * 　- 省略 -> 再描画時
 */
function UseEffectSample() {
    const [isExecuted, setIsExecuted] = useState<boolean>(false);
    // 非同期的に呼ばれるので、最小は0が表示される
    useEffect(() => {
        sleep(2000);
        setIsExecuted(true);
    }, [])    

    return (
        <section>
            <h2>useEffect</h2>
            <p>isExecuted: {isExecuted ? "処理が終わりました" : "処理中です"}</p>
        </section>
    )
}


/**
 * useLayoutEffectを使ったサンプル
 * 同期的に実行されるので、useEffectより表示が遅くなる
 */
function UseLayoutEffectSample() {
    const [isExecuted, setIsExecuted] = useState<boolean>(false);
    useLayoutEffect(() => {
        sleep(2000);
        setIsExecuted(true);
    }, [])    

    return (
        <section>
            <h2>useLayoutEffect</h2>
            <p>isExecuted: {isExecuted ? "処理が終わりました" : "処理中です"}</p>
        </section>
    )
}