'use client'

import { useSearchParams } from "next/navigation";
import { useDeferredValue, useState, useTransition } from "react";

export default function Home() {

  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "";

  return(
    <main>
      <h1>遅延</h1>
      {type==="1" && <TransitionSample />}
      {type==="2" && <DeferredValueSample />}
      {!["1", "2"].includes(type) && <p>クエリパラメータtypeに正しい値を指定してください</p> }
    </main>
  )
}

/**
 * useTransition
 * 
 * handlerの中で、特定の更新処理の優先度を下げたいものを指定することで、その更新が終わる前に再描画を実行する。
 * 処理が重い場合など...
 */
function TransitionSample() {
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`); 
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);

    // 重いリストフィルタリングを低優先度で実行
    startTransition(() => {
      const newFiltered = items.filter(item => item.toLowerCase().includes(value.toLowerCase()));
      setFilteredItems(newFiltered);
    });
  };

  return (
  <section>
    <h2>useTransition</h2>
    <div>
    <p>入力した文字でフィルタリングします</p>
    <input type="text" value={inputValue} onChange={handleChange} />
      {isPending && <div>Loading...</div>}
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </section>
  );
}


/**
 * 利用意図はuseTransitionと一緒。
 * Transitionはstateの管理ロジックに介入できる場合に使うことで、処理を遅延させる。
 * 外部ライブラリに処理が存在するなどしてロジックに介入できない場合は、こちらを使って、値を遅延させる。
 */
function DeferredValueSample() {
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`); 
  const [inputValue, setInputValue] = useState('');
  
  // 入力値の遅延版を作成
  const deferredInput = useDeferredValue(inputValue);

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(deferredInput.toLowerCase())
  );

  return (
    <section>
      <h2>UseDeferredValueSample</h2>
      <p>入力した文字でフィルタリングします</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {/* 遅延中かどうかは自分で判定しないといけないことが多い */}
      {inputValue !== deferredInput && <div>Loading...</div>}
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

