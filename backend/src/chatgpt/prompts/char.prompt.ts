export const charExistsPrompt = (charName: string) =>
  `A character named ${charName} exists and is a hero or villain in movies, comics, or games? If yes, return a JSON containing the characterName. Else return a JSON containing the characterName with null value.`

export const charKnownByAnotherNamePrompt = (charName: string) =>
  `Do not explain. List all other names by which ${charName} is known separated by a semicolon.`

export const charMainNamePrompt = (namesList: string[]) =>
  `Do not explain. In the following list wich one is the main name of the character? ${namesList.join(', ')}. Response the correct name without any other word.`

export const charSummaryPrompt = (charName: string) => `Summarizing who is ${charName}? Is a hero, a villain, or both? Return a JSON with the properties: summary, char_type: villain, hero, or both.`

export const charHistoryPrompt = (charName: string) =>
  `Build a narrative based on the following information: Tell the story of ${charName}, start with their personality, then their level of intelligence, followed by their appearance, their abilities, their specialty, their preferences, their fears, and finally their good or bad deeds. Properties: history.`

export const charAppearance = (charName: string) => `You should not write in bullet points or enumerate items, return only text not JSON, and make sure to not maxout 1000 characters. Utilize all your existing information to describe the appearance of the character ${charName}, preferably in a meticulous manner.`

export const charStrenghtsPrompt = `Considering the entire history of the character, list 5 strenghts into a array format.`

export const charWeaknessesPrompt = `Considering the entire history of the character, list 5 weaknesses into a array format.`

export const charAttributesPrompt = `Considering the entire character's history, assign values from 1 to 5 for each of the attributes below, without explaining why, and return as a javascript serialized json: strength,intelligence,speed,defense,vitality,agility,technique,mobility,endurance,evasion`
