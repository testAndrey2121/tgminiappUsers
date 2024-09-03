import { useEffect, useState } from "react";

const tg = window.Telegram.WebApp;

function ConnectWithTg({ onUserData }) {
  const [or, setOr] = useState([]);
  const [openTime] = useState(new Date().toLocaleTimeString());
  const [photoUrl, setPhotoUrl] = useState('');
  const botToken = '7290809911:AAHlU0ScT0TrWwsAx-pFBXOGBC5FWqw5H6Y'; // Замените на ваш токен

  useEffect(() => {
    tg.ready();

    const user = tg.initDataUnsafe?.user;

    // // Отправляем данные на сервер
    // fetch('http://localhost:3000/api/checkData', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(tg),
    // });

    fetch(`https://api.telegram.org/bot${botToken}/getUserProfilePhotos?user_id=${user.id}`)
        .then(response => response.json())
        .then(data => {
          if (data.result.photos.length > 0) {
            const fileId = data.result.photos[0][0].file_id;
            return fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`);
          } else {
            throw new Error('No photos found');
          }
        })
        .then(response => response.json())
        .then(data => {
          const filePath = data.result.file_path;
          const url = `https://api.telegram.org/file/bot${botToken}/${filePath}`;
          setPhotoUrl(url);
        })
        .catch(error => {
          console.error('Error fetching user photo:', error);
        });

    if (user) {
      onUserData({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        languageCode: user.language_code,
        photoUrl: photoUrl,
        platform: tg.platform || 'Unknown',
        colors: tg.colorScheme || 'Not available',
        isPremium: tg.isPremium,
        regDate: new Date(tg.initDataUnsafe.auth_date * 1000).toLocaleString(),
      });
    }

    tg.MainButton.setText("Submit");
    tg.MainButton.show();

    const handleMainButtonClick = () => {
      setOr(prevOr => [...prevOr, { item: `item №${or.length + 1}` }]);
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
  }, [onUserData, or.length, photoUrl]);

  const onClose = () => {
    tg.close();
  };

  return (
    <div className="btn">
      <button onClick={onClose}>Close App</button>
      {photoUrl && <img src={photoUrl} alt="User Photo" style={{ width: '100px', height: '100px' }} />}
      {or.length === 0 ? '' : or.map((i, idx) => (<div key={i.item + idx}>{i.item + (idx + 1)}</div>))}
      <p><strong>Form Open Time:</strong> {openTime}</p>
    </div>
  );
}

export default ConnectWithTg;
