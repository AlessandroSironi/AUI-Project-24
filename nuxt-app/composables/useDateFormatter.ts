export enum DateType {
    'message date (weekday hh:mm)',
    'fulldate (weekday - month - year)',
}

export const useDateFormatter = (date: Date, dateType: DateType): string => {
    let formattedDate: string = '';
    switch (dateType) {
        case DateType['fulldate (weekday - month - year)']:
            const day = date.getDate();
            const month = date.toLocaleString('en-US', { month: 'long' }); // Get full month name
            const year = date.getFullYear();
            // Format the date as "day month year"
            formattedDate = `${day} ${month} ${year}`;
            break;

        case DateType['message date (weekday hh:mm)']:
            const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' }); // Get full day name
            const hours = date.getHours();
            const minutes = date.getMinutes();
            // Format the time as "hh:mm"
            const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
            // Combine day and time into the desired format
            formattedDate = `${dayOfWeek} ${formattedTime}`;
            break;
    }
    return formattedDate;
};
