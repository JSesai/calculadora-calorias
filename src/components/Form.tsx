import { useState, FormEvent, ChangeEvent, Dispatch } from "react"
import {v4 as uuidv4} from "uuid" //libreria para generear id´s unicos
import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityActions } from "../reducers/activity-reducer"

//type para props del formulario
type FormProps = {
    dispatch: Dispatch<ActivityActions> //toma como referencia Dispach de react y un generic<> que hace referencia a ActivityActions  

}
//variable que contiene el valor del estado inicial del estate, se hace de esta manera para reutilizar cuando se setea al valor inicia
const initialState = {
    id: uuidv4(), //se llama a la fn que genera el id y es con el que arranca el formulario
    category: 1,
    name: '',
    calories: 0   
}

//fn del componente que recibe por prop la fns que manejan la logica del estado y es dispatch
export default function Form({ dispatch } : FormProps) { //se define el type de dispatch

    //estate local del formulario
    const [activity, setActivity] = useState<Activity>(initialState) //estate que maneja todos los campos del formulario y arranca con el estado inicial de la variable declarada en initialState

    //fn que maneja el estate local del formulario 
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        //valida si es numero o texto, lo hacemos metiendo las propiedades que deben de ser numericos a un array para usar includes, si esta escribiendo en algun elemento que tiene en su propiedad id category o calories retorna true
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        // console.log(isNumberField);       


        //setea un objeto al estate local con la 
        setActivity({
            ...activity, // toma una copia de los valores del estate local para que los conserve por que si no se hace setea todos los campos del formulario
            //abajo incgresa a la key del obj y puede ser category, name o calories, evalua si es un numero ya que category y calorias es el unico valor que sera un numero y para guardarlo como numero evalua con la fn
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
        //usamos el dipatch, se debe pasar el type y el payload 
        dispatch( { type: 'save-activity',payload: {newActivity: activity} } )
        //setea el estate al estado inicial y añade un nuevo id para que pueda ser usado en el proximo submiteo
        setActivity({...initialState, id: uuidv4() }) //toma una copia del estate inicial que tiene ud, category, name y calories pero al ponerle otravez el campo id setea el anterior por lo que quedara con los valores declarados en la variable de initialState pero con el id planchado con el valor que retorne el uuidv4
        
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
