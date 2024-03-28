import { useMemo } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"
//type de props son definidos cada prop que se pasa 
type ActivityListProps = {
    activities: Activity[] //este es el estado y por prop se paso con el nombre de activities
}

//fn del componente
export default function ActivityList({ activities }: ActivityListProps) { //destructuramos lo que pasamos por props, como pasamos el estate desde app.tsx nombrado como activities que es un arreglo con objetos que son las actividades
    // console.log(activities);
    //usamos use memo para poder renderizar cada vez que cambie el arreglo de las categorias es decir que si se agrega un nuevo item
    const categoryName = useMemo(()=> 
    //se recibe la categoria cuando se llama a la fn que es un numero, entonces lo que hacemos es definir el tipo de dato y ese numero de categoria lo buscamos en los datos de categorias en data que es exportado arriba
    (category : Activity['category']) => categories.map(cat => cat.id === category ? cat.name : null)  ,[activities]) //si la categoria que pasamos coincide con el id de la categoria que estamos recorriendo devuelve el nombre caso contrario null

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">Comida</h2>
            {activities.map(activity => (
                <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
                    {/* muestra la actividad */}
                    <div className="space-y-2 relative">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'} `}>
                            {/* pasamos la categoria que traemos que es un numero y para asegurarnos que sea un numero le ponemos el signo + antes del parametro */}
                            {categoryName(+activity.category)} 
                        </p>
                        <p className="text-2xl font-bold pt-5">{activity.name}</p>
                        <p className="font-black text-4xl pt-5 text-lime-500"><span> {activity.calories} </span></p>
                    </div>

                    {/* muestra las acciones */}
                    <div></div>
                </div>
            ))}
        </>
    )
}
