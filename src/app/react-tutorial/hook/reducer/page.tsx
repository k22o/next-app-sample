'use client'

import { useReducer } from "react"

export default function Home() {

    return (
        <main>
            <h1>UseReducer</h1>
            <ReducerSample />
        </main>
    )
}


type State = {
    count: number
}


type Action =
  | { type: 'update'; step: number }
  | { type: 'reset'; init: number };

/**
 * 複数のstateや、複雑な操作を伴うstateには、useReducerを使う
 * 
 * ActionをDispatcher関数に渡す
 * Dispatcher関数がReducerを呼び出す
 * Reducerがstateを更新する
 */
function ReducerSample() {
    const [state, dispatch] = useReducer(
        (state:State, action:Action) => {
            switch (action.type) {
                case 'update':
                    return {count: state.count + action .step}
                case 'reset':
                    return {count: action.init}
                default:
                    return state
            }
        },
        {
            count: 0
        }        
    );

    const handleUp = () => dispatch({type: 'update', step: 1})
    const handleDown = () => dispatch({type: 'update', step: -1})
    const handleReset = () => dispatch({type: 'reset', init: 0})

    return (
        <section>
            <h2>useReducerのサンプル</h2>
            <button onClick={handleUp}>UP</button>
            <button onClick={handleDown}>DOWN</button>
            <button onClick={handleReset}>Reset</button>
            <p>counter: {state.count}</p>
        </section>
    )
}