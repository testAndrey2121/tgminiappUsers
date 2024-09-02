import { useEffect } from "react";

const tg = window.Telegram.WebApp;

const [or, setOr] = ([])

function ConnectWithTg({ onUserData }) {
  useEffect(() => {
    tg.ready();

    const user = tg.initDataUnsafe?.user;
    if (user) {
      onUserData(user);
    }

    tg.MainButton.setText("Submit");
    tg.MainButton.show();

    tg.MainButton.onClick(() => {
      setOr([...or, {item: 'item1'}])
    });

    if (!user) {
      tg.MainButton.hide();
    }

    return () => {
      tg.MainButton.offClick();
    };
  }, [onUserData]);

  const onClose = () => {
    tg.close();
  };

  return (
    <div className="btn">
      <button onClick={onClose}>Close App</button>
      {or.length === 0 ? '' : or.map( (i, idx) => (<div key={i.item+idx}>{i.item}</div>))}
    </div>
  );
}

export default ConnectWithTg;
