const HumanoList = lista => {
  return (
    <div>
      {lista.nombre && (
        <>
          <div> humano</div>
          {lista.map(humano => (
            <div className="bg-gray-500" key={humano.id}>
              {' '}
              {humano.nombre}{' '}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default HumanoList
