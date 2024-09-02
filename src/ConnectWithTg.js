import { useEffect, useState } from "react";

const tg = window.Telegram.WebApp;

function ConnectWithTg({ onUserData }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    tg.ready();

    const user = tg.initDataUnsafe?.user;
    if (user) {
      setUserData(user);
      onUserData(user); // Передаем данные пользователя в родительский компонент
    }
  }, []);

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
