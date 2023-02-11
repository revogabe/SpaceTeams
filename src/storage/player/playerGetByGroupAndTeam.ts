import { playersGetByGroup } from "./playersGetByGroup"

export async function playerGetByGroupAndTeam(groups: string, team: string) {
  try {
    const storage = await playersGetByGroup(groups)

    const players = storage.filter((player) => player.team === team)
    return players
  } catch (error) {
    throw error
  }
}
