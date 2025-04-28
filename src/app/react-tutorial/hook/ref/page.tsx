'use client'

import { useRef, useState } from "react";

export default function Home() {

    return (
        <main>
            <h1>UseRef</h1>
            <p>useRefの仕組みは要素へのフォーカス・スクロール・アニメーションくらいにとどめて、基本はuseStateを使うべき</p>
            <UseRefSample1 />
            <UseRefSample2 />
            <HookCallBackRef />
        </main>
    )
}

/**
 * useStateのように入力値を管理するものを制御コンポーネントと呼ぶ。
 * 以下のように、そうでないものを非制御コンポーネントと呼ぶ。useRefを使って、値にアクセスする。
 * useStateと異なり、記述が簡単だが値の変化に追随した再描画はできない。
 * 
 * 以下の例では、refの実体は、HTMLのref属性によって紐づけられている
 */
function UseRefSample1() {
    const name = useRef<HTMLInputElement>(null);
    const showDialog = () => {
        alert(`名前: ${name.current?.value}`)
    }
    return (
        <section>
            <h2>useRef(1) 非制御コンポーネントとしての挙動</h2>
            <form>
                <div>
                    <label htmlFor="name">名前:</label>
                    <input id="name" name="name" type="text" ref={name} defaultValue={"太郎"}></input>
                </div>
                <div>
                    <button onClick={showDialog}>名前を表示する</button>      
                </div>                
            </form>  
        </section>
    )
}

/**
 * Ref Objectは、コンポーネントの破棄まで値を保持する。つまり、再描画されても、その値は保持されるということ。
 * Ref Objectを使うことで、関数コンポーネントにインスタンス変数的に値を持たせることができる。
 * 
 * 以下の例で、idをuseRefなしで使うと、再描画の度にローカル変数として別のidが生成されてうまく処理が動かない。
 */
function UseRefSample2() {

    const id = useRef<any>(null);
    const [count, setCount] = useState<number>(0);

    const handleStart = () => {
        if (id.current === null) {
            id.current = setInterval(() => setCount(c => c + 1), 1000);
        }
    }
    const handleEnd = () => {
        clearInterval(id.current);
        id.current = null;
    }

    return (
        <section>
            <h2>useRef(2) ローカル変数の
                維持</h2>
            <div>
                <button onClick={handleStart}>start</button>
                <button onClick={handleEnd}>end</button>
                <p>count: {count}</p>
            </div>
        </section>
    )
}

/**
 * useRefは使わないが、Ref属性を利用するパターン
 * 
 * ref要素にコールバック関数を仕込むことができる。
 * 以下の事例では、これによって表示されたときに自動でfocusをあてている
 */
function HookCallBackRef() {
    const [isShown, setIsShown] = useState<boolean>(false);
    const handler = () => setIsShown(!isShown);
    const callBackRef = (elem: HTMLInputElement) => elem?.focus();

    return (
        <section>
            <h2>CallBackRef</h2>
            <button onClick={handler}>表示&focus</button>
            { isShown && 
                <div>
                    <input id="str" type="text" ref={callBackRef}></input>
                </div>
            }

        </section>
    )

}