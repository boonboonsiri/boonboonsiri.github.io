import React from 'react';
import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { Gallery } from 'react-grid-gallery';

import { RowsPhotoAlbum, ColumnsPhotoAlbum, MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import "react-photo-album/columns.css";
import "react-photo-album/masonry.css";


const ImageGrid = ({ transform, text, children }) => {
  var images = children.props.children.length ? children.props.children : [children.props.children];
  images = images.filter((image) => image.props)

  images = images.map((image) => {
    return { src: image.props.src, width: image.props.width, height: image.props.height }
  })

  const slides = images.map(({ src, width, height }) => ({
    src: src,
    width,
    height,
  }));

  const [index, setIndex] = useState(-1);

  // const handleClick = (index, item) => setIndex(index);

  return (

    <div className='ImageGrid'>
      {/* <Gallery
        images={images}
        onClick={handleClick}
        enableImageSelection={false}
        margin={6}
        rowHeight={400}
      /> */}

    <MasonryPhotoAlbum
        photos={slides}
        targetRowHeight={400}
        columns={Math.min(3, slides.length)}
        onClick={({ index: current }) => setIndex(current)}
        spacing={20}
      />
      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        carousel={{padding: '24px'}}
      />
    </div>
  );
};

export default ImageGrid;
