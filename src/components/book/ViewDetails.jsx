import ImageGallery from "react-image-gallery";
import './style.scss'
import { Row } from "antd";
const ViewDetails = () =>{
  const handleOnClickImage = () =>{

  }
    const images = [
        {
          original: "https://picsum.photos/id/1018/1000/600/",
          thumbnail: "https://picsum.photos/id/1018/250/150/",
          originalClass: "original-image",
          thumbnailClass: "thumbnail-image"
        },
        {
          original: "https://picsum.photos/id/1015/1000/600/",
          thumbnail: "https://picsum.photos/id/1015/250/150/",
          originalClass: "original-image",
          thumbnailClass: "thumbnail-image"
        },
        {
          original: "https://picsum.photos/id/1019/1000/600/",
          thumbnail: "https://picsum.photos/id/1019/250/150/",
          originalClass: "original-image",
          thumbnailClass: "thumbnail-image"
        },
      ];
    return( 
      <div className="view-detail-book" style={{width:'1440px',margin:'0 auto'}}>
      <Row gutter={[20, 20]} >
         <ImageGallery
           //ref={refGallery}
          items={images}
          showPlayButton={false} //hide play button
          showFullscreenButton={false} //hide fullscreen button
          renderLeftNav={() => <></>} //left arrow === <> </>
          renderRightNav={() => <></>}//right arrow === <> </>
          slideOnThumbnailOver={true}  //onHover => auto scroll images
          onClick={() => handleOnClickImage()}
          />
          </Row>
      </div>
   
    )
}
export default ViewDetails