function Error({ title, children }) {
  return (
    <div className=" m-10 flex flex-col items-center">
      <div className=" m-3 text-4xl">!!!</div>
      <h2 className=" text-2xl">{title}</h2>
      {children}
    </div>
  )
}

export default Error
