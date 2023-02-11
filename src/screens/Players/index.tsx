import { useState } from "react"
import { FlatList } from "react-native"
import { useRoute } from "@react-navigation/native"

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

type RouteParams = {
  groups: string
}

export function Players() {
  const [team, setTeam] = useState("Time A")
  const [players, setPlayers] = useState([])

  const route = useRoute()
  const { groups } = route.params as RouteParams

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={groups}
        subtitle="adicione a galera e separe os times"
      />
      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" type="PRIMARY" />
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
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
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

      <Button title="Remover turma" type="SECONDARY" />
    </Container>
  )
}
