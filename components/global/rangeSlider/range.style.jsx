export const style =
  `.rail-outer {
  position: absolute;
  width: 100%;
  height: 42px;
  transform: translate(0%, -50%);
  border-radius: 7px;
  cursor: pointer;
  /*border: '1px solid white';*/
}

.rail-inner {
  position: absolute;
  width: 100%;
  height: 14px;
  transform: translate(0%, -50%);
  border-radius: 7px;
  pointer-events: none;
  background-color: rgb(155, 155, 155)
}

.handle-container {
  position: absolute;
  transform: translate(-50%, -50%);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  z-index: 5;
  width: 28px;
  height: 42px;
  cursor: pointer;
  /*border: '1px solid white';*/
  background-color: inherit;
}

.handle-slider {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
}

.keyboard-handle {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
}

.tick {
  position: absolute;
  margin-top: 22px;
  font-size: 10px;
  text-align: center;
}`