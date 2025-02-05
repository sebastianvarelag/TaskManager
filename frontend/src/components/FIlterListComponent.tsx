import { Paintbrush, Search } from "lucide-react";
import { useState } from "react";
import { Button, Dropdown, Form, FormGroup } from "react-bootstrap";

interface PropsIFilterListComponent {
  onFilter: (title: string, completed: string) => void;
}

export const FIlterListComponent = ({onFilter}: PropsIFilterListComponent) => {

  //Estados value (para no usar react-hook-form en este caso)
  const [titleSearch, setTitleSearch] = useState('');
  const [completedSearch, setCompletedSearch] = useState('Selecciona una opción');


  //Seteamos los estados en la función que viene de los props
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilter(titleSearch, completedSearch);
  };

  //handle para limpiar los filtros
  const handleReset = () => {
    setTitleSearch('');
    setCompletedSearch('Todos');
    onFilter('', 'Todos');
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex align-items-center gap-4 text-white">
      <FormGroup className="mb-5" controlId="titleSearch">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          placeholder="Título de la tarea"
          value={titleSearch}
          onChange={(e) => setTitleSearch(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="mb-5" controlId="dropdownOption">
        <Form.Label>Estado</Form.Label>
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            {completedSearch}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setCompletedSearch('Todos')}>
              Todos
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setCompletedSearch('Completada')}>
              Completada
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setCompletedSearch('Incompleta')}>
              Incompleta
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </FormGroup>

      <div className="d-flex gap-2 mb-3">
        <Button type="submit" className="btn btn-primary h-100">
          <Search className="me-2"/>
          Buscar
        </Button>
        <Button 
          type="button" 
          className="btn btn-warning h-100"
          onClick={handleReset}
        >
          <Paintbrush className="me-2"/>
          Limpiar filtros
        </Button>
      </div>
    </Form>
  );
}
