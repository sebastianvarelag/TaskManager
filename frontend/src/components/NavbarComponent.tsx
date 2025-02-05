import { ListChecks } from "lucide-react"
import { Container, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"

export const NavbarComponent = () => {
  return (
    <Navbar className="bg-dark">
        <Container fluid className="d-flex text-white gap-2">
          <ListChecks width={28} height={28}/>
          <Navbar.Brand className="w-100">
              <Link to={"/"} className="text-decoration-none text-white fw-bold fs-4">
                Gestor de Tareas
              </Link>
            </Navbar.Brand>
        </Container>
      </Navbar>
  )
}
