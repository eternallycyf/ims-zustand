//@ts-nocheck
import { compose, create } from 'ims-zustand';
import { persist } from 'zustand/middleware';

function logMiddleware(func) {
  return function (set, get, store) {
    function newSet(...args) {
      console.log('调用了 set，新的 state：', get());
      return set(...args);
    }
    return func(newSet, get, store);
  };
}

const useXxxStore = compose(
  create,
  logMiddleware,
  persist,
)(
  (set) => ({
    aaa: '',
    bbb: '',
    updateAaa: (value: string) => set(() => ({ aaa: value })),
    updateBbb: (value: string) => set(() => ({ bbb: value })),
  }),
  {
    name: 'test',
  },
);

function Bbb() {
  return (
    <div>
      <Ccc></Ccc>
    </div>
  );
}

function Ccc() {
  const aaa = useXxxStore((state) => state.aaa);

  return <p>hello, {aaa}</p>;
}

export default function App() {
  const updateAaa = useXxxStore((state) => state.updateAaa);
  const aaa = useXxxStore((state) => state.aaa);

  return (
    <div>
      <input onChange={(e) => updateAaa(e.currentTarget.value)} value={aaa} />
      <Bbb></Bbb>
    </div>
  );
}
