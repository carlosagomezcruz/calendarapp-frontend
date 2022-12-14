import { addHours } from "date-fns";
import { useUiStore, useCalendarStore } from "../../hooks"

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handledClickNew = () => {
        setActiveEvent({
            title: 'Hola',
            notes: 'Mundo',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Fernando'
            }
        });
        openDateModal();
    }



    return (
        <button
            className="btn btn-primary fab"
            onClick={handledClickNew}
        >
            <i className="fas fa-plus"></i>

        </button>
    )
}

