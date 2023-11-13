import { Range, getTrackBackground } from "react-range";
import "./searchFilterSlider.css";
import { useContext, useRef, useState } from "react";
import { ArticlesContext } from "../../context/articlesContext";

export default function SearchFilterSlider() {
  const [values, setValues] = useState([0, 500]);

  const { setPriceMin, setPriceMax, setPage } = useContext(ArticlesContext);
  const timerRef = useRef(null);

  const onValuesChange = (newValues) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setValues(newValues);
    timerRef.current = setTimeout(() => {
      setPriceMin(newValues[0]);
      setPriceMax(newValues[1]);
      setPage(1);
    }, 500);
  };

  return (
    <div className="slider-container">
      <Range
        step={1}
        min={0}
        max={500}
        values={values}
        onChange={onValuesChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="barre"
            style={{
              height: "6px",
              width: "100%",
              backgroundColor: "#ccc",
              background: getTrackBackground({
                values: values,
                colors: ["#ccc", "#017782", "#ccc"],
                min: 0,
                max: 500,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "16px",
              width: "16px",
              borderRadius: "50%",
              backgroundColor: "#999",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                marginTop: "1rem",
                padding: "4px",
                fontSize: "10px",
              }}
            >
              {values[index].toFixed(0)}€
            </div>
          </div>
        )}
      />
    </div>
  );
}
