const Rewards = ({ numero, promocion, style }) => {
  //cambia el color de fondo dependiendo del tipo de cupon, si es vacio el fondo es mas claro hay que buscar un icono.
  // bg-gray-800

  return (
    <div
      className=" p-5 w-40 h-40 rounded-xl flex flex-col justify-center align-middle items-center  text-center animate-placa"
      style={
        style
          ? { backgroundColor: `#1f2937${Math.ceil(style * 100)}` }
          : { backgroundColor: `#1f2937` }
      }
    >
      {numero && <div className="text-3xl animate-mensaje"> {numero} </div>}
      {!numero ? (
        <div> {promocion} </div>
      ) : (
        <div className="text-xs mt-5 animate-mensaje"> {promocion} </div>
      )}
    </div>
  )
}

export default Rewards
