export  enum MeasuringUnit{
Grams,
Kilograms,
Milliliters,
Liters,
Number
}  

export function getMeasuringUnit(digit :number) :string
{
    switch(digit)
    {
        case MeasuringUnit.Grams : return 'Grams';
        case MeasuringUnit.Kilograms: return 'Kilograms';
        case MeasuringUnit.Milliliters: return 'Kilograms';
        case MeasuringUnit.Liters: return 'Kilograms';
        case MeasuringUnit.Number: return 'Number';
        default:return 'Null'

    }
}