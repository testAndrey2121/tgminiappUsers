import { useEffect } from "react";

const tg = window.Telegram.WebApp;

function ConnectWithTg({ onUserData }) {
  useEffect(() => {
    tg.ready();

    const user = tg.initDataUnsafe?.user;
    if (user) {
      onUserData(user);
    }
  }, [onUserData]); // Добавляем onUserData в зависимости

  const onClose = () => {
    tg.close();
  };

  return (
    <div className="btn">
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ConnectWithTg;
