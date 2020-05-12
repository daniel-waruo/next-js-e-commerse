import React from 'react';
import {MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBMask, MDBView} from "mdbreact";
import {carouselImageStyle} from "../_helpers";

function ProductCarousel(props) {

  let productList = props.objects.map(
    (image, index) => {
      return (
        <MDBCarouselItem itemId={index + 1} key={index}>
          <MDBView>
            <div style={carouselImageStyle(image, "-/scale_crop/500x500/smart/")} className={props.heightClass}/>
            <MDBMask overlay="black-light"/>
          </MDBView>
        </MDBCarouselItem>
      )
    }
  );

  return (
    <MDBCarousel
      activeItem={1}
      length={productList.length}
      showControls={true}
      showIndicators={true}
      slide={true}
      mobileGesture={true}
      onHoverStop={true}
    >
      <MDBCarouselInner>
        {productList}
      </MDBCarouselInner>
    </MDBCarousel>
  );
}

export default ProductCarousel;
