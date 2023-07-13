export const charExistsPrompt = (charName: string) =>
  `A character named ${charName} exists and is a hero or villain in movies, comics, or games? If yes, return a JSON containing the characterName, also, if the character is known with another name, return the alsoKnown. Else return a JSON containing the characterName with null value.`

export const charKnownByAnotherNamePrompt = (charName: string) =>
  `Does the character ${charName} have another name, and is that name the main one in the same story? If yes, please return the name in the main role; otherwise, return NULL.`

export const charMainNamePrompt = (namesList: string[]) =>
  `What is the main name of the character? ${namesList.join(', ')}. Return the JSON containing the characterName and alsoKnown.`

export const charSummaryPrompt = (charName: string) => `Who is ${charName}? Return a JSON containing the summary, and also char_type: If villain or a hero.`

export const charHistoryPrompt = (charName: string) =>
  `Make sure you return only text and ou should not write in bullet points, enumerate items, or create topics. Build a narrative based on the following information: Tell the story of ${charName}, start with their personality, then their level of intelligence, followed by their appearance, their abilities, their specialty, their preferences, their fears, and finally their good or bad deeds. Convert the response to text and return the history.`

export const charAppearance = (charName: string) => `You should not write in bullet points or enumerate items, return only text not JSON. Utilize all your existing information to describe the appearance of the character ${charName}, preferably in a meticulous manner.`

export const charStrenghtsPrompt = `Considering the character's entire history, list up to 5 strenghts of the character, without explaining why, and return as array of string in javascript without line break.`

export const charWeaknessesPrompt = `Considering the character's entire history, list up to 5 weaknesses of the character, without explaining why, and return as array of string in javascript without line break.`

export const charAttributesPrompt = `Considering the entire character's history, assign values from 1 to 5 for each of the attributes below, without explaining why, and return as a javascript serialized json: strength,intelligence,speed,defense,vitality,agility,technique,mobility,endurance,evasion`
