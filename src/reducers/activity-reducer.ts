import { Activity } from "../types";
//use reducer es una alternativa a useState ; utiliza dentro de ella useState

//los reducers en react nos ayudan a manejar estados complejos en react, y transiciones de estado que involucran logica mas compleja. Es adecuado cuando para situaciones donde el nmuevo estado depende del estado anterior o cuando hay multiples subvalroes o logica condicional a considerar

//COMPOSICION -> el hook useEReducer toma dos argumentos:
// reducer: Una funcion que toma el estado actual y una accion, y devuelve un nuevo estado
//estado inicial: El esatado inicial del reducer



//*definimos el type de este reducer ; registro de actions
export type ActivityActions = 
{ type: 'save-activity', payload: {newActivity: Activity} } |
{ type: 'set-activeId', payload: {id: Activity['id']} } 

//*definimos el type para estate inicial
type ActivityState = {
    activities: Activity[], //definimos que va a ser un arreglo de actividades, que actividades son objetos
    activeId: Activity['id']
}
//* Estado inicial del Reducer
export const initialState : ActivityState = {
    activities: [],
    activeId: ''
}

//! fn reductora = Reducer : definimos el estate que es el estado y el tipo es activityState y es igual a su estado inicial, y el accion es la accion que modifica el estate y su tipe es activityActions
export const activityReducer = (state: ActivityState = initialState, action: ActivityActions) => {

    if(action.type === 'save-activity'){
        // console.log('desde el type save-activity');
        // console.log(action.payload.newActivity);
        
        //retoramos el estate con los valores que contiene para no perderlos y agregamos la actividad que dispara el dispatch
        return {
            ...state,//copia del estado
            activities: [...state.activities, action.payload.newActivity] //seteo del estado de ativities
        }
       
    }
    //action para ac
    if(action.type === 'set-activeId'){
        console.log('editando', action.payload.id);
        
    }

    //retornamos el estate, es importante para que no marque errores
    return state
}
