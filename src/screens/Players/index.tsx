import { useState, useEffect, useRef } from "react"
import { Alert, FlatList, TextInput } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"

import { Button } from "@components/Button"
import { ButtonIcon } from "@components/ButtonIcon"
import { Filter } from "@components/Filter"
import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Input } from "@components/Input"
import {
  BubbleNumberPlayers,
  Container,
  Form,
  HeaderList,
  NumberOfPlayers,
} from "./styles"
import { PlayerCard } from "@components/PlayerCard"
import { ListEmpty } from "@components/ListEmpty"
import { AppError } from "@utils/AppError"
import { playerAddByGroup } from "@storage/player/playerAddByGroup"
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam"
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO"
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup"
import { groupRemoveByName } from "@storage/group/groupRemoveByName"

type RouteParams = {
  groups: string
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState("")
  const [team, setTeam] = useState("Time A")
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const route = useRoute()
  const { groups } = route.params as RouteParams

  const navigation = useNavigation()
  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("Erro", "Informe o nome da turma")
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, groups)

      newPlayerNameInputRef.current?.blur()

      setNewPlayerName("")
      fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message)
      } else {
        console.log(error)
        Alert.alert("Nova pessoa", "Não foi possível cadastrar a pessoa")
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playerGetByGroupAndTeam(groups, team)
      setPlayers(playersByTeam)
    } catch (error) {
      Alert.alert("Pessoas", "Não foi possível carregar as pessoas")
    }
  }

  async function handleDeletePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, groups)
      fetchPlayersByTeam()
    } catch (error) {
      Alert.alert("Remover Pessoa", "Não foi possível remover a pessoa")
    }
  }

  async function handleGroupRemove() {
    try {
      await groupRemoveByName(groups)
      navigation.navigate("groups")
    } catch (error) {
      Alert.alert("Remover Pessoa", "Não foi possível remover a pessoa")
    }
  }

  async function ButtonRemoveGroup() {
    Alert.alert("Remover", "Deseja realmente remover esse grupo?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => handleGroupRemove() },
    ])
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={groups}
        subtitle="adicione a galera e separe os times"
      />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" type="PRIMARY" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <BubbleNumberPlayers>
          <NumberOfPlayers>{players.length}</NumberOfPlayers>
        </BubbleNumberPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleDeletePlayer(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 25 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={ButtonRemoveGroup}
      />
    </Container>
  )
}
