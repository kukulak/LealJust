import { Link, json, useLoaderData } from "@remix-run/react";
// import { getTotalUsers } from '../data/auth.server'
// import { getCuponUsageCount } from '../data/cupon.server'
import { getAllCupons } from "../data/cupon.server";
import ListCupons from "../components/ListCupons";
// import getCuponUsageStats from '../data/stats.server'

const CuponsList = () => {
  // const { totalUsers, totalCupon } = useLoaderData()
  // const { cuponsList, stats } = useLoaderData()
  const totalCupon = useLoaderData();
  console.log("STATS", totalCupon);

  const groupedCupones = totalCupon.reduce((acc, cupon) => {
    if (!acc[cupon.categoria]) {
      acc[cupon.categoria] = [];
    }
    acc[cupon.categoria].push(cupon);
    return acc;
  }, {});

  return (
    <div className="mt-10 w-full flex justify-center">
      <div className="w-10/12">
        <h1 className="text-lg mb-20 ">Todos los Cupones</h1>
        {/* <p>{totalUsers}</p>
      {totalCupon &&
        totalCupon.map(totalC => <p key={totalC.id}> {totalC.nombre} </p>)} 
        
        */}
        {/* {totalCupon &&
        totalCupon.map(stat => (
          <div key={stat.id}>
            <p> {stat.nombre}</p>
            <p> {stat.descripcion}</p>
            <p>{stat._count.used}</p>
          </div>
        ))} */}
        {/* <ListCupons cupons={cuponsList} /> */}
        <ListCupons cupons={groupedCupones} />
      </div>
    </div>
  );
};

export default CuponsList;

export async function loader() {
  const cuponsList = await getAllCupons();
  // const stats = await getCuponUsageStats()
  // console.log('stats', stats)

  // const totalUsers = await getTotalUsers()
  // const totalCupon = await getCuponUsageCount()
  // console.log(totalCupon)
  // return { totalUsers, totalCupon }
  // return json({ stats })
  return cuponsList;
  // return totalCupon

  // return stats
}
