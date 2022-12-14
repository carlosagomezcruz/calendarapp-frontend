import { dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import esEs from 'date-fns/locale/es';


const locales = {
    'es': esEs,
}

const frmt = {
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
}

export const localizer = dateFnsLocalizer(frmt);