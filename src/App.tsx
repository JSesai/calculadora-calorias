import Form from "./components/Form"
import { useReducer } from "react" //importamos el use reducer de react para poder usarlo
import { ActivityActions, activityReducer, initialState } from "./reducers/activity-reducer" //para usar use reducer requerimos el estado inicial y la fn reductora, esto lo hemos definido en el otro archivo por eso lo exportamos


function App() {
  //state corresponde al estado y dispatch es la fn que dispara las acciones
  const [state, dispatch] = useReducer(activityReducer, initialState) //Pasamos como argumento la funcion reductora estado inicial
  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorias
          </h1>
          <button>Reiniciar App</button>
        </div>
      </header>

      <section className="bg-lime-500 p-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
          //pasamos dispatch como prop si lo instanciamos directo en el componente pierde la referencia, eso no pasaria si se tuviera un estado global
            dispatch={dispatch}
           />
        </div>
      </section>

    </>
  )
}

export default App
