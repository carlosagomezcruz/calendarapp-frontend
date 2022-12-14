import { useDispatch, useSelector } from 'react-redux';
import calendarApi from '../api/calendarApi';
import { onAddNewEvent, onDeleteEvente, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);


    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {

        //TODO: Update event
        try {

            // Actualizando
            if (calendarEvent.id) {

                await calendarApi.put(`events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }

            //Creando
            const { data } = await calendarApi.post('events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));


        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');

        }

    }

    const startDeletingEvent = async (calendarEvent) => {
        //TODO: Llegar al backend
        try {
            await calendarApi.delete(`events/${calendarEvent.id}`, calendarEvent);
            Swal.fire('Eliminado!', 'Se ha eliminado con exito!', 'success');
            dispatch(onDeleteEvente());

        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }


    }

    const startLoadingEvents = async () => {
        try {

            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));


        } catch (error) {
            console.log('Error cargando evento');
            console.log(error)

        }
    }

    return {
        //Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //Metodos
        setActiveEvent,
        startDeletingEvent,
        startSavingEvent,
        startLoadingEvents

    }

}
