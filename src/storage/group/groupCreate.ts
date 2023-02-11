import AsyncStorage from "@react-native-async-storage/async-storage"

import { GROUP_COLLECTION } from "@storage/storageConfig"
import { AppError } from "@utils/AppError"
import { groupsGetAll } from "./groupGetAll"

export async function groupCreate(newGroups: string) {
  try {
    const storedGroups = await groupsGetAll()

    const groupAlreadyExists = storedGroups.includes(newGroups)

    if (groupAlreadyExists) {
      throw new AppError("Já existe uma turma com esse nome")
    }

    const storage = JSON.stringify([...storedGroups, newGroups])
    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  } catch (error) {
    throw error
  }
}
