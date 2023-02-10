import { BackButton, BackIcon, Container, Logo } from "./styles"
import logoImg from "@assets/logo.png"
import { useNavigation } from "@react-navigation/native"

type Props = {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation()

  function handleBack() {
    navigation.navigate("groups")
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleBack}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  )
}
