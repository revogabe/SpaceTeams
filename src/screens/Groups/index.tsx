import { useState } from "react"
import { FlatList } from "react-native"

import { GroupCard } from "@components/GroupCard"
import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Container } from "./styles"
import { ListEmpty } from "@components/ListEmpty"
import { Button } from "@components/Button"

export function Groups() {
  const [groups, setGroups] = useState<string[]>([
    //"Galera do Basquete",
    //"Amigos",
    //"Turma do LOL",
  ])

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        ListEmptyComponent={() => (
          <ListEmpty message="Cadastre sua primeira turma!" />
        )}
      />

      <Button title="Criar nova turma" />
    </Container>
  )
}
