import { StudentAllergiesActionEnum } from "./action";
import { IStudentAllergiesActionContext, IStudentAllergiesStateContext } from "./context";

export function StudentAllergiesReducer(incomingState: IStudentAllergiesStateContext, action: ReduxActions.Action<IStudentAllergiesStateContext>): IStudentAllergiesStateContext {
  const { type, payload } = action;
  switch (type) {
    case StudentAllergiesActionEnum.fetchStudentAllergiesRequest:
      return { ...incomingState, ...payload };
    case StudentAllergiesActionEnum.createStudentAllergiesRequest:
      return { ...incomingState, StudentAllergiesState: [payload.StudentAllergiesCreated, ...incomingState?.StudentAllergiesState] };
      
      case StudentAllergiesActionEnum.getStudentAllergiesByIdRequest:
        return {
            ...incomingState,
            ...payload,
        }
    case StudentAllergiesActionEnum.deleteStudentAllergiesRequest:
      const { StudentAllergiesDeleted } = payload;
      const filtered = [...incomingState?.StudentAllergiesState].filter(({ StudentId }) => StudentId !== StudentAllergiesDeleted);
      return { ...incomingState, StudentAllergiesState: [...filtered] };
    case StudentAllergiesActionEnum.updateStudentAllergiesRequest:
      const { StudentAllergiesUpdated } = payload;
      const updatedState = [...incomingState?.StudentAllergiesState].map((allergy) => {
        if (allergy.StudentId === StudentAllergiesUpdated.StudentId && allergy.IngredientId === StudentAllergiesUpdated.IngredientId) {
          return {
            ...allergy,
            isCurrent: StudentAllergiesUpdated.IsCurrent, // Update the isCurrent property
          };
        }
        return allergy;
      });
      return { ...incomingState, StudentAllergiesState: updatedState };
      
      return { ...incomingState, StudentAllergiesState: updatedState };
      
    default:
      return incomingState;
  }
}
