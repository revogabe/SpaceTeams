import { useState, useCallback } from "react"
import { FlatList } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native"

import { GroupCard } from "@components/GroupCard"
import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Container } from "./styles"
import { ListEmpty } from "@components/ListEmpty"
import { Button } from "@components/Button"
import { groupsGetAll } from "@storage/group/groupGetAll"
import { Loading } from "@components/Loading"

export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate("new")
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)
      const data = await groupsGetAll()
      setGroups(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(groups: string) {
    navigation.navigate("players", { groups })
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, [])
  )

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Cadastre sua primeira turma!" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[{ paddingBottom: 25 }]}
        />
      )}

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  )
}
