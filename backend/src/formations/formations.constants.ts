// src/formations/formations.constants.ts

export enum FormationEnum {

  FOUR_FOUR_TWO = '4-4-2',
  FOUR_THREE_THREE = '4-3-3',
  THREE_FOUR_THREE = '3-4-3',
  FOUR_FIVE_ONE = '4-5-1',
  THREE_FIVE_TWO = '3-5-2',
  FIVE_THREE_TWO = '5-3-2',
  THREE_THREE_FOUR = '3-3-4',
  FOUR_TWO_FOUR = '4-2-4',
  FIVE_TWO_THREE = '5-2-3',
  }
  
  export type FormationStructure = {
    defenders: number;
    midfielders: number;
    forwards: number;
  };
  
  export const FormationMap: Record<FormationEnum, FormationStructure> = {
    [FormationEnum.FOUR_FOUR_TWO]: { defenders: 4, midfielders: 4, forwards: 2 },
    [FormationEnum.FOUR_THREE_THREE]: { defenders: 4, midfielders: 3, forwards: 3 },
    [FormationEnum.THREE_FOUR_THREE]: { defenders: 3, midfielders: 4, forwards: 3 },
    [FormationEnum.FOUR_FIVE_ONE]: { defenders: 4, midfielders: 5, forwards: 1 },
    [FormationEnum.THREE_FIVE_TWO]: { defenders: 3, midfielders: 5, forwards: 2 },
    [FormationEnum.FIVE_THREE_TWO]: { defenders: 5, midfielders: 3, forwards: 2 },
    [FormationEnum.THREE_THREE_FOUR]: { defenders: 3, midfielders: 3, forwards: 4 },
    [FormationEnum.FOUR_TWO_FOUR]: { defenders: 4, midfielders: 2, forwards: 4 },
    [FormationEnum.FIVE_TWO_THREE]: { defenders: 5, midfielders: 2, forwards: 3 },
  };
  
  export function isFormationValid(formation: string): formation is FormationEnum {
    return Object.values(FormationEnum).includes(formation as FormationEnum);
  }