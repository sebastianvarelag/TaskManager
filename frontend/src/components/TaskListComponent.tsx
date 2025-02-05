import { taskApi } from '../api/taskApi';
import { toast } from 'react-hot-toast';
import { FIlterListComponent } from './FIlterListComponent';
import { Check, CheckCircle, Edit, Plus, XCircle } from 'lucide-react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Task } from '../types/Task';

export const TaskListComponent = () => {
	const navigate = useNavigate();

	const [taskData, setTaskData] = useState<Task[]>([]);
	const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
		try {
			//Traemos la data
      const tasks = await taskApi.getTasks();
      setTaskData(tasks);
      setFilteredTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

	const handleFilter = (title: string, completed: string) => {
    let filtered = [...taskData];

    // Filtrar por 'título'
    if (title) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(title.toLowerCase())
      );
    }

		// Filtrar por 'todos'
    if (completed !== 'Todos') {
      filtered = filtered.filter(task => 
        completed === 'Completada' ? task.completed : !task.completed
      );
    }

		//Seteamos los task filtrados
    setFilteredTasks(filtered);
  };

	//Método para eliminar tarea con el id
	const handleDelete = async (id: string) => {
		try {
			await taskApi.deleteTask(id);
			toast.success('La tarea se eliminó correctamente.');
			fetchTasks();
		} catch (e) {
			console.error(e);
			toast.error('Ocurrido un error al eliminar la tarea.');
		}
	};

	//Método para actualizar el estado de la tarea con el id
	const handleToggle = async (id: string) => {
		try {
			await taskApi.toggleComplete(id);
			toast.success('La tarea se actualizó correcatmente.');
			fetchTasks();
		} catch (e) {
			console.error(e);
			toast.error('Ocurrido un error al actualizar la tarea.');
		}
	};

	const handleEdit = async (id: string, e: React.MouseEvent) => {
		// Esto lo puse para evitar que al dar click acá, afecte al completed en general
		// Ya que al dar click en la tarea también se actualiza el toggle.
		e.stopPropagation(); 
		
		navigate(`/edit/${id}`);
	}

	return (
		<>
			<FIlterListComponent onFilter={handleFilter}/>

			<div className="mb-4">
				<Link to="/new" className="text-white text-decoration-none">
					<Button className="btn btn-success">
							<Plus width={16} height={16} className="me-2" />
							Nueva tarea
					</Button>
				</Link>
			</div>

			<div className="list-group" style={{ maxWidth: '500px' }}>
				{
					filteredTasks.length === 0 ? (
						<div className='alert alert-primary'>
							No se encontraron tareas con los filtros que seleccionó
						</div>
					)
				: filteredTasks.map((task) => (
					<div
						key={task.id}
						className={`list-group-item list-group-item-action ${task.completed ? 'list-group-item-dark' : ''}`} 
            onClick={() => handleToggle(task.id)}
					>
						<div className="d-flex w-100 justify-content-between align-items-center">
							<div>
								<h5
									className={`mb-1 ${
										task.completed
											? 'text-muted text-decoration-line-through'
											: ''
									}`}
								>
									{task.title}
								</h5>
								<p className="mb-1">{task.description}</p>
							</div>
							<div className="btn-group gap-2">
								<button
									className={`btn btn-sm ${
										task.completed
											? 'btn-success'
											: 'btn-outline-success'
									}`}
									onClick={() =>
										handleToggle(task.id)
									}
								>
									{task.completed ? (
										<Check width={16} height={16} />
									) : (
										<CheckCircle width={16} height={16} />
									)}
								</button>
								<button
									className="btn btn-sm btn-outline-primary"
									onClick={(e) => handleEdit(task.id, e)}
								>
										<Edit width={16} height={16} />
								</button>
								<button
									className="btn btn-sm btn-outline-danger"
									onClick={(e) => {
										e.stopPropagation();
										if (
											window.confirm(
												'Oiga, está seguro de borrar la tarea?'
											)
										) {
											handleDelete(task.id);
										}
									}}
								>
									<XCircle width={16} height={16} />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};
