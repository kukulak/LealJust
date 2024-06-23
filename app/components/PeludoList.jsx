import { Link } from "@remix-run/react";

const PeludoList = (lista) => {
  return (
    <div>
      perro
      {lista.length > 0 &&
        lista.map((peludo) => (
          <Link to={`/perro/${peludo.id}`} key={peludo.id}>
            <p>{peludo.nombre}</p>
            <p>{peludo.raza}</p>
          </Link>
        ))}
    </div>
  );
};

export default PeludoList;
