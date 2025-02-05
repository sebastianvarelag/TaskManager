import { Paintbrush, Search } from 'lucide-react';
import { useState } from 'react';
import { Button, Dropdown, Form, FormGroup } from 'react-bootstrap';

interface PropsIFilterListComponent {
	onFilter: (title: string, completed: string) => void;
}

export const FIlterListComponent = ({
	onFilter,
}: PropsIFilterListComponent) => {
	//Estados value (para no usar react-hook-form en este caso)
	const [titleSearch, setTitleSearch] = useState('');
	const [completedSearch, setCompletedSearch] = useState(
		'Selecciona una opción'
	);

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
		<Form onSubmit={handleSubmit} className="w-100">
			<div className="row align-items-center">

				<div className="col-12 col-md-4 mb-4">
					<FormGroup controlId="titleSearch">
						<Form.Label>Título</Form.Label>
						<Form.Control
							type="text"
							placeholder="Título de la tarea"
							value={titleSearch}
							onChange={(e) => setTitleSearch(e.target.value)}
						/>
					</FormGroup>
				</div>

				<div className="col-12 col-md-4 mb-4">
					<FormGroup controlId="dropdownOption">
						<Form.Label>Estado</Form.Label>
						<Dropdown>
							<Dropdown.Toggle
								variant="light"
								id="dropdown-basic"
								className="w-100"
							>
								{completedSearch}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item
									onClick={() => setCompletedSearch('Todos')}
								>
									Todos
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() =>
										setCompletedSearch('Completada')
									}
								>
									Completada
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() =>
										setCompletedSearch('Incompleta')
									}
								>
									Incompleta
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</FormGroup>
				</div>
			</div>

			<div className="row align-items-center">
				<div className="col-12 col-md-4 mb-4">
					<div className="d-flex flex-column flex-md-row gap-2 w-100">
						<Button type="submit" className="btn btn-primary w-100">
							<Search className="me-2" />
							Buscar
						</Button>
						<Button
							type="button"
							className="btn btn-warning w-100"
							onClick={handleReset}
						>
							<Paintbrush className="me-2" />
							Limpiar
						</Button>
					</div>
				</div>
			</div>
		</Form>
	);
};
