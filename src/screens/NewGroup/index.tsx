import { useState } from "react"
import { useNavigation } from "@react-navigation/native"

import { Button } from "@components/Button"
import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Input } from "@components/Input"
import { Container, Content, Icon } from "./styles"
import { groupCreate } from "@storage/group/groupCreate"
import { AppError } from "@utils/AppError"
import { Alert } from "react-native"

export function NewGroup() {
  const [groups, setGroups] = useState("")

  const navigation = useNavigation()

  async function handleSubmit() {
    try {
      if (groups.trim().length === 0) {
        return Alert.alert("Erro", "Informe o nome da turma")
      }

      await groupCreate(groups)
      navigation.navigate("players", { groups })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message)
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar o grupo")
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova Turma"
          subtitle="crie uma turma para adicionar pessoas"
        />
        <Input placeholder="Nome da turma" onChangeText={setGroups} />
        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleSubmit}
        />
      </Content>
    </Container>
  )
}
