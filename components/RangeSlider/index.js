import React from "react";
import {Handles, Rail, Slider, Ticks, Tracks} from "react-compound-slider";
import {Handle, SliderRail, Tick, Track} from "./components"; // example render components - source below
import './range-slider.css'

const sliderStyle = {
  position: "relative",
  width: "100%"
};

class RangeSlider extends React.PureComponent {
  constructor(props) {
    super(props);
    const {min, max, maxPrice, minPrice} = props;
    // if a min & max value are provided use minPrice and maxPrice
    this.state = {
      min: min || minPrice,
      max: max || maxPrice,
    }
  }

  onUpdate = e => {
    // set new state from change
    this.setState({
      min: e[0],
      max: e[1]
    })
  };

  onChange = e => {
    const min = e[0], max = e[1];
    this.props.updateFilter(min, max)
  };

  render() {
    const {maxPrice, minPrice} = this.props;
    const {min, max,} = this.state;
    const domain = [minPrice, maxPrice];
    const defaultValues = [min || minPrice, max || maxPrice];

    if (minPrice === maxPrice) return null;

    return (
      <>
        <div className={"text-white px-4"}>
          <p className={"py-1"}>
            <span className={"h5 test-bold"}>{this.props.title}</span>
            | KSh {min} - Ksh {max}</p>
          <div style={{height: 50, width: "100%"}}>
            <Slider
              mode={1}
              step={this.props.step}
              domain={domain}
              rootStyle={sliderStyle}
              onUpdate={this.onUpdate}
              onChange={this.onChange}
              values={defaultValues}
            >
              <Rail>
                {
                  ({getRailProps}) => {
                    return <SliderRail getRailProps={getRailProps}/>
                  }
                }
              </Rail>
              <Handles>
                {({handles, getHandleProps}) => (
                  <div style={{color: 'black'}} className="slider-handles">
                    {handles.map(handle => (
                      <Handle
                        className={"default-color"}
                        style={{backgroundColor: 'black'}}
                        key={handle.id}
                        handle={handle}
                        domain={domain}
                        getHandleProps={getHandleProps}
                      />
                    ))}
                  </div>
                )}
              </Handles>
              <Tracks left={false} right={false}>
                {({tracks, getTrackProps}) => (
                  <div className="slider-tracks">
                    {tracks.map(({id, source, target}) => (
                      <Track
                        className={"default-color-dark"}
                        key={id}
                        source={source}
                        target={target}
                        getTrackProps={getTrackProps}
                      />
                    ))}
                  </div>
                )}
              </Tracks>
              <Ticks count={5}>
                {({ticks}) => (
                  <div className="slider-ticks">
                    {ticks.map(tick => (
                      <Tick key={tick.id} tick={tick} count={ticks.length}/>
                    ))}
                  </div>
                )}
              </Ticks>
            </Slider>
          </div>
        </div>
      </>
    );
  }
}

export default RangeSlider;