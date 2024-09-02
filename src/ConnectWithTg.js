import { useEffect, useState } from "react";

const tg = window.Telegram.WebApp;

function ConnectWithTg({ onUserData }) {
  const [or, setOr] = useState([]);

  useEffect(() => {
    tg.ready();

    const user = tg.initDataUnsafe?.user;
    if (user) {
      onUserData(user);
    }

    tg.MainButton.setText("Submit");
    tg.MainButton.show();

    const handleMainButtonClick = () => {
      setOr((prevOr) => [...prevOr, { item: 'item №' }]);
      tg.sendData("User clicked submit");

      tg.notify("Data has been sent!");
    };

    tg.MainButton.onClick(handleMainButtonClick);

    if (!user) {
      tg.MainButton.hide();
    }

    return () => {
      tg.MainButton.offClick(handleMainButtonClick);
    };
  }, [onUserData]);

  const onClose = () => {
    tg.close();
  };

  return (
    <div className="btn">
      <button onClick={onClose}>Close App</button>
      {or.length === 0 ? '' : or.map((i, idx) => (<div key={i.item + idx}>{i.item + (idx+1)}</div>))}
    </div>
  );
}

export default ConnectWithTg;
