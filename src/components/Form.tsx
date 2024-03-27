import { useState, FormEvent, ChangeEvent } from "react"
import { categories } from "../data/categories"
import { Activity } from "../types"

export default function Form() {

    const [activity, setActivity] = useState<Activity>({
        category: 1,
        name: '',
        calories: 0
    })

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        //valida si es numero o texto, lo hacemos metiendo las propiedades que deben de ser numericos a un array para usar includes, si esta escribiendo en algun elemento que tiene en su propiedad id category o calories retorna true
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        // console.log(isNumberField);       


        //setea un objeto al estate
        setActivity({
            ...activity, // toma una copia de los valores del estate
            [e.target.id]: isNumberField ? +e.target.value : e.target.value // accede a la llave del objeto, gracias a que el id de los input y select son nombrados de la misma manera que el estate para que haga referencia de manera correcta al key del objeto del estate
        })
         
    }

    //valida que los campos no se encuentren vacios
    const isValidActivity = ()=> {
        //extraemos el valor del estate destructurando el objeto
        const { name, calories } = activity
        //evaluamos que estas variables no contyengan string vacio o valor de o
        return name.trim() !== '' && calories > 0

    }

    //fn que envia informacion del formulario
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('enviando');
        
    }
    
    return (
        <form
        onSubmit={handleSubmit}
            className="space-y-5 bg-white shadow p-10 rounded-lg"
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoria:</label>
                <select
                    id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}                           
                        >
                            {category.name}
                        </option>
                    ))}

                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Nombre:</label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg "
                    placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg "
                    placeholder="Calorias. Ej. 300 o 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                disabled= {!isValidActivity()}
                className="disabled:opacity-10 bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
            />
        </form>
    )
}
