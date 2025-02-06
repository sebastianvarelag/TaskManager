import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { taskApi } from "../api/taskApi";
import { CreateTaskDTO } from "../types/Task";
import { useEffect, useState } from "react";

interface FormState {
  isLoading: boolean;
  error: string | null;
}

type TaskParams = {
  taskId: string;
}

export const TaskEditComponent = () => {
  const navigate = useNavigate();
  
  //Agarramos el ID del param
  const { taskId } = useParams() as TaskParams;
  
  //Realizamos la misma configuración para la validación de campos
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm<CreateTaskDTO>({
    defaultValues: {
      title: '',
      description: '',
      completed: false
    },
  });

  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    error: null
  });


  useEffect(() => {
    //Cargamos la tarea
    const loadTask = async () => {
      if (!taskId) {
        navigate('/');
        return;
      }

      try {
        const loadedTask = await taskApi.getTask(+taskId);

        //Luego de cargarla asíncronamente, la seteamos en el form
        reset({
          title: loadedTask.title,
          description: loadedTask.description,
          completed: loadedTask.completed
        });
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Ocurrio un error al cargar la tarea');
        navigate('/');
      }
    };

    loadTask();
  }, [taskId, navigate, reset]);

  const onSubmit = async (data: CreateTaskDTO) => {
    setFormState({ isLoading: true, error: null });

    try {
      //Actualizamos la task
      await taskApi.updateTask(taskId, data);
      toast.success('Tarea actualizada correctamente.');
      reset(); //Limpiamos el form
      navigate('/'); //Volvemos al inicio
    } catch (error) {
      setFormState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Hubo un error al crear la tarea'
      });
      toast.error('Error al crear la tarea');
    }
  };

  return (
    <>
      <div className="mb-4">
        <Link to={'/'} 
          className="text-white text-decoration-none"
          onClick={() =>reset()}
          >
          <ChevronLeft width={20} height={20} />
          Regresar
        </Link>
      </div>
      
      <h3>Editar tarea</h3>

      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="title"
            placeholder="Escribe el título de la tarea"
            {...register('title', {
              required: 'El título es requerido',
              minLength: {
                value: 3,
                message: 'El título debe tener al menos 3 caracteres'
              },
              maxLength: {
                value: 50,
                message: 'El título no puede exceder los 20 caracteres'
              }
            })}
          />
          {errors.title && (
            <div className="invalid-feedback">
              {errors.title.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <textarea
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            style={{ maxHeight: '500px' }}
            id="description"
            placeholder="Escribe la descripción de la tarea (máx 100 carácteres)"
            maxLength={100}
            {...register('description', {
              maxLength: {
                value: 100,
                message: 'La descripción no puede exceder los 100 caracteres'
              }
            })}
            rows={3}
          />
          {errors.description && (
            <div className="invalid-feedback">
              {errors.description.message}
            </div>
          )}
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="completed"
            {...register('completed')}
          />
          <label className="form-check-label" htmlFor="completed">
            Completada
          </label>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={formState.isLoading}
        >
          {formState.isLoading ? 'Cargando...' : 'Actualizar Tarea'}
        </button>
      </form>
    </>
  );
}