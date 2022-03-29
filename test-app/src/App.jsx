import "./App.css";
import { Grid } from "react-grid-system";
import { useEffect, useState } from "react";

import "react-grid-system/dist/styles.css";

function App() {
  const [images, setImages] = useState([]);
  const [col, setCol] = useState(1);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=2&limit=20")
      .then((res) => res.json())
      .then((data) =>
        setImages(data?.map((image) => image.download_url) || [])
      );
  }, []);

  const onChangeCol = (inc) => () => {
    setCol((c) => c + inc);
  };

  return (
    <div className="App">
      <h1>Grid preview</h1>
      <h2>Auto Height grid</h2>
      <button onClick={onChangeCol(-1)}>-</button>
      <input type="number" value={col} readOnly />
      <button onClick={onChangeCol(1)}>+</button>
      <Grid col={col}>
        {images.map((image, i) => (
          <div className="element" key={image}>
            <img src={image} />
            <span>{i + 1}</span>
          </div>
        ))}
      </Grid>
    </div>
  );
}

export default App;
