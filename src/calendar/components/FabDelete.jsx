import { useSelector } from 'react-redux';
import { useCalendarStore } from "../../hooks"

export const FabDelete = () => {

    const { startDeletingEvent, hasEventSelected } = useCalendarStore();
    const { activeEvent } = useSelector(state => state.calendar);

    const handledDelete = () => {
        startDeletingEvent(activeEvent);
    }



    return (
        <button
            aria-label='btn-delete'
            className="btn btn-danger fab-danger"
            onClick={handledDelete}
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>

        </button>
    )
}

