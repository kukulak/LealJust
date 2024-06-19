import { useRef, useState } from 'react'

export const ImageUploader = ({ onChange, imageUrl, existedImage }) => {
  const [draggingOver, setDraggingOver] = useState(false)
  const fileInputRef = useRef(null)
  const dropRef = useRef(null)

  // 1
  const preventDefaults = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  // 2
  const handleDrop = e => {
    preventDefaults(e)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0])
      e.dataTransfer.clearData()
    }
  }

  // 3
  const handleChange = event => {
    console.log(event.currentTarget.files[0], 'WHAT IS THIS')
    console.log(event.currentTarget.files, 'ENTERING')
    ////////////
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      onChange(event.currentTarget.files[0])
    }
    ////////////
    // if (event.currentTarget.files && event.currentTarget.files[0]) {
    //   onChange(blober)
    // }
  }

  // 4
  return (
    <div
      ref={dropRef}
      className={`${
        draggingOver
          ? 'border-4 border-dashed border-yellow-300 border-rounded mt-20'
          : ''
      } group w-10/12 relative mt-20 flex justify-center items-center bg-gray-950 transition duration-300 ease-in-out hover:bg-gray-900 cursor-pointer hover:bg-opacity-20 h-60 min-h-[20rem] hover:border-gray-900 hover:border-[1px] border-[1px] border-gray-950 `}
      style={{
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        ...(imageUrl
          ? { backgroundImage: `url(${imageUrl})` }
          : { backgroundImage: `url(${existedImage})` })
      }}
      onDragEnter={() => setDraggingOver(true)}
      onDragLeave={() => setDraggingOver(false)}
      onDrag={preventDefaults}
      onDragStart={preventDefaults}
      onDragEnd={preventDefaults}
      onDragOver={preventDefaults}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      {imageUrl && (
        <div className="absolute w-full h-full bg-gray-950 opacity-40  transition duration-300 ease-in-out group-hover:opacity-0" />
      )}
      {
        <>
          <p className="flex justify-center align-middle -mt-1 font-extrabold text-4xl text-gray-200 cursor-pointer select-none transition duration-300 ease-in-out group-hover:opacity-0 pointer-events-none z-10">
            +
          </p>
          <p className=" ml-2 flex justify-center align-middle  text-gray-200 items-center select-none transition duration-300 ease-in-out group-hover:opacity-0 z-10">
            carga una imagen
          </p>
        </>
      }
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}
