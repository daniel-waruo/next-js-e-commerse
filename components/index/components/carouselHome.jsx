import React from 'react';
import {MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBMask, MDBView} from "mdbreact";
import {carouselImageStyle} from "../../../_helpers";

class CarouselHome extends React.PureComponent {
  render() {
    const props = this.props;
    const carouselList = props.objects.map(
      (carousel, index) => {
        return (
          <MDBCarouselItem itemId={index + 1} key={index}>
            <MDBView>
              <div style={carouselImageStyle(carousel.imageUrl)} className={props.heightClass}/>
              <MDBMask overlay="black-light"/>
            </MDBView>
            <MDBCarouselCaption>
              <h3 className="h3-responsive">{carousel.title}</h3>
              <p>{carousel.caption}</p>
            </MDBCarouselCaption>
          </MDBCarouselItem>
        )
      }
    );

    return (
      <MDBCarousel
        activeItem={1}
        length={carouselList.length}
        showControls={true}
        showIndicators={true}
        slide={true}
        mobileGesture={true}
        onHoverStop={true}
      >
        <MDBCarouselInner>
          {carouselList}
        </MDBCarouselInner>
      </MDBCarousel>

    );
  }
}

export default CarouselHome;
