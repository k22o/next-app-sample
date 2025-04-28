'use client'

import { memo, useCallback, useMemo, useState } from "react";

function sleep(millis: number) {
    const start = Date.now();
    while(Date.now() - start < millis);
}

export default function Home() {
    return (
        <main>
            <h1>Memo系</h1>
            <ul>
                <li>useMemo: 関数の結果をメモする</li>
                <li>memo: コンポーネントの再描画を制御する</li>
                <li>useCallback: 関数自体をメモする</li>
            </ul>
            <MemoSample/>
        </main>
    )
}

function MemoSample() {
    const [count1, setCount1] = useState<number>(0);
    const [count2, setCount2] = useState<number>(0);
    // (3) useCallback
    // useCallbackを設定しないと、再描画の度に関数が再定義されて、CustomButtonが再描画される
    // これがないと、CustomButtonをmemoしていても、関数が再定義されるので、引数が異なった判定になり、再描画される
    const increment = useCallback(() => setCount1(c => c + 1), []);
    const decrement = useCallback(() => setCount2(c => c - 1), []);
    // const increment = () => setCount1(c => c + 1);
    // const decrement = () => setCount2(c => c - 1);

    // (1) useMemo
    // []で定義したものが変更した場合にしか更新処理は働かず、以前のものがそのまま利用される
    const heavyProcess = useMemo(() => {
        sleep(1000);
        return count1 * 100;
    }, [count1]);

    // (2) memo
    // コンポーネントをメモすることで、MemoSampleが再描画されたとしても、
    // 引数に変更がないなら、このコンポーネント部分は以前のものが利用され、再定義はされない

    return(
        <section>
            <h2>memo関数の例</h2>
            <CustomButton handler={increment} id={"id1"}>Count UP</CustomButton>
            <CustomPara id={"id1"} count={count1} />
            <p>{heavyProcess}</p>
            <CustomButton handler={decrement} id={"id2"}>Count DOWN</CustomButton>
            <CustomPara id={"id2"} count={count2} />
        </section>
    )
}


const CustomButton = memo(({handler, id, children}:{handler:any, id:string, children:any})=> {
    console.log(`click: ${id}`)
    return(
        <button onClick={handler}>{children}</button>
    )
})
const CustomPara = memo(({count, id}:{count:number, id:string})=> {
    console.log(`display p tag: ${id}`)
    return (
        <p>{id}:{count}</p>
    )
})
