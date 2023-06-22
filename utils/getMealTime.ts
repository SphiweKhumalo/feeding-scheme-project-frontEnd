enum RefListServingTime {
    Breakfast,
    Lunch,
  }
  
  export default function getMealTime(servingTime: RefListServingTime): string {
    switch (servingTime) {
      case RefListServingTime.Breakfast:
        return 'Breakfast';
      case RefListServingTime.Lunch:
        return 'Lunch';
      default:
        return '';
    }
  }
  
  // Example usage
  const servingTime: RefListServingTime = RefListServingTime.Breakfast;
  const mealTime: string = getMealTime(servingTime);
  
  console.log(mealTime); // Output: "Breakfast"
  