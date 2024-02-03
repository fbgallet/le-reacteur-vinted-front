import { Range, getTrackBackground } from "react-range";

const STEP = 5;
const MIN = 0;
const MAX = 500;

const PriceRange = ({ range, setRange }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        margin: "15px",
      }}
    >
      <Range
        values={range}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setRange(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "10px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: range,
                  colors: ["#548BF4", "#ccc"],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "24px",
              width: "24px",
              borderRadius: "4px",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div
              style={{
                height: "16px",
                width: "5px",
                backgroundColor: isDragged ? "#548BF4" : "#CCC",
              }}
            />
          </div>
        )}
      />
      <output style={{ marginTop: "30px" }} id="output">
        {range[0].toFixed(1)}
      </output>
    </div>
  );
};

export default PriceRange;
