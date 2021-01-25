// Запрос на сервер по определённому apiLink

export default function dataRequest(apiLink, setInfo, infoName) {
  fetch(`${apiLink}`)
    .then((response) => response.json())
    .then((data) => {
      setInfo({ data, infoType: infoName });
    });
}

//
