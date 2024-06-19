import { useEffect, useState } from 'react'

const ImageFitFill = ({ alt, src }) => {
  // objectPosition: 'top'
  // objectPosition: 'center'

  const stylesImage = {
    portrait: {
      marginTop: '-120px',
      objectPosition: 'top',
      maxHeight: '504px' //384
    },
    landscape: {
      marginTop: '0px',
      objectPosition: 'center',
      maxHeight: '384px' //384
    },
    square: {
      marginTop: '-80px',
      objectPosition: 'top',
      maxHeight: '464px' //384
    }
  }

  const [imgSize, setImgSize] = useState()

  useEffect(() => {
    const img = new Image()
    img.onload = function () {
      if (this.width > this.height) {
        setImgSize('landscape')
      } else if (this.width < this.height) {
        setImgSize('portrait')
      } else {
        setImgSize('square')
      }
      // setSize(this.width + 'x' + this.height)
    }

    img.src = src
  }, [src])

  return (
    <div className="overflow-hidden shadow-2xl sticky top-10  rounded-xl w-11/12 z-10 mt-4 ">
      {/* <SimpleParallax scale={1.5} delay={1} transition="cubic-bezier(0,0,0,1)"> */}
      <img
        style={stylesImage[imgSize]}
        alt={alt}
        src={src}
        // src="/img/IMG_0238.png"
        className=" object-cover rounded-xl max-h-96 w-full  shadow-black/50 "
      />
      {/* </SimpleParallax> */}

      {/* <p className=" text-xl text-center w-full absolute text-gray-500">
        {imgSize}
      </p> */}
    </div>
  )
}

export default ImageFitFill
