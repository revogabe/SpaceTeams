import { Button } from "@components/Button"
import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Input } from "@components/Input"
import { useNavigation } from "@react-navigation/native"
import { TextInput } from "react-native"
import { Container, Content, Icon } from "./styles"

export function NewGroup() {
  const navigation = useNavigation()

  function handleSubmit() {
    navigation.navigate("players", { groups: "Galera da Empresa" })
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
        <Input placeholder="Nome da turma" />
        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleSubmit}
        />
      </Content>
    </Container>
  )
}
