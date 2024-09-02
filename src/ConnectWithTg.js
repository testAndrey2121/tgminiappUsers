import { useEffect } from "react";

const tg = window.Telegram.WebApp;

function ConnectWithTg({ onUserData }) {
  useEffect(() => {
    tg.ready();

    const user = tg.initDataUnsafe?.user;
    if (user) {
      onUserData(user);
    }

    // Пример установки состояния мини-приложения
    tg.MainButton.setText("Submit");
    tg.MainButton.show();

    tg.MainButton.onClick(() => {
      tg.sendData("User clicked submit");
    });

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
    </div>
  );
}

export default ConnectWithTg;
