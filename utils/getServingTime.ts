export enum ServingTime
{
    Breakfast,
    Lunch,
}
export function getServingTime(digit:number) : string
{
    switch(digit)
    {
        case ServingTime.Breakfast : return 'Breakfast'
        case ServingTime.Lunch : return 'Lunch'
        default : return null
    }
} 