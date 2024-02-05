import { useRanger } from "react-ranger";
import styled, { createGlobalStyle } from "styled-components";

const STEP = 5;
const MIN = 0;
const MAX = 500;

const GlobalStyles = createGlobalStyle`
  body {
   font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
   font-weight: 300;
  }
`;

export const Track = styled("div")`
  display: inline-block;
  height: 8px;
  width: 100%;
`;

export const TickLabel = styled("div")`
  position: absolute;
  font-size: 0.6rem;
  color: rgba(0, 0, 0, 0.5);
  top: 100%;
  transform: translate(-50%, 1.2rem);
  white-space: nowrap;
`;

export const Segment = styled("div")`
  background: ${(props) =>
    props.index === 0
      ? "#ddd"
      : props.index === 1
      ? "#2bb1ba"
      : props.index === 2
      ? "#ddd"
      : "#ddd"};
  height: 100%;
`;

export const Handle = styled("div")`
  background: #2bb1ba;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  font-size: 0.6rem;
  white-space: nowrap;
  color: white;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  transform: ${(props) =>
    props.active
      ? "translateX(-10px) scale(1.2)"
      : "translateX(-10px) scale(1)"};
`;

const PriceRange = ({ range, setRange }) => {
  const { getTrackProps, segments, handles } = useRanger({
    min: MIN,
    max: MAX,
    stepSize: STEP,
    values: range,
    onChange: setRange,
  });

  return (
    <div className="price-range">
      <GlobalStyles />

      <Track {...getTrackProps()}>
        {segments.map(({ getSegmentProps }, i) => (
          <Segment {...getSegmentProps()} index={i} />
        ))}
        {handles.map(({ value, active, getHandleProps }) => (
          <button
            {...getHandleProps({
              style: {
                appearance: "none",
                border: "none",
                background: "transparent",
                outline: "none",
              },
            })}
          >
            <Handle active={active ? "true" : undefined}>{value} €</Handle>
          </button>
        ))}
      </Track>
    </div>
  );
};

export default PriceRange;
