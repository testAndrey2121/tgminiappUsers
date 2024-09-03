import { useEffect, useState } from "react";

const tg = window.Telegram.WebApp;

function ConnectWithTg({ onUserData }) {
  const [or, setOr] = useState([]);
  const [openTime] = useState(new Date().toLocaleTimeString());
  
  useEffect(() => {
    tg.ready();

    const user = tg.initDataUnsafe?.user;

    const data1 = tg.initData
    fetch('http://localhost:3000/api/checkData', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data1)
    })

    if (user) {
      onUserData({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        languageCode: user.language_code,
        photoUrl: user.photo_url,
        platform: user.platform || 'Unknown',
        colors: user.colors || 'Not available',
        isPremium: user.is_premium || false
      });
    }

    tg.MainButton.setText("Submit");
    tg.MainButton.show();

    const handleMainButtonClick = () => {
      setOr((prevOr) => [...prevOr, { item: `item №${or.length + 1}` }]);
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
  }, [onUserData, or.length]);

  const onClose = () => {
    tg.close();
  };

  return (
    <div className="btn">
      <button onClick={onClose}>Close App</button>
      {or.length === 0 ? '' : or.map((i, idx) => (<div key={i.item + idx}>{i.item + (idx + 1)}</div>))}
      <p><strong>Form Open Time:</strong> {openTime}</p>
    </div>
  );
}

export default ConnectWithTg;
