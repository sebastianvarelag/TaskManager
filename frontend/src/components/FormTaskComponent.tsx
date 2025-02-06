import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { taskApi } from "../api/taskApi";
import { CreateTaskDTO } from "../types/Task";
import { useState } from "react";

interface FormState {
  isLoading: boolean;
  error: string | null;
}

export const FormTaskComponent = () => {
  const navigate = useNavigate();
  
  const { 
    register, // Acá cabe aclarar que esto lo puse así por el método de React Hook Form para validar fácilmente.
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

  const onSubmit = async (data: CreateTaskDTO) => {
    setFormState({ isLoading: true, error: null });

    //Llamada de la api que crea el task
    try {
      await taskApi.createTask(data);
      toast.success('Tarea creada correctamente');
      //Acá limpiamos el formulario
      reset();
      // Volvemos a la pantalla principal
      navigate('/');
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
      
      <h3>Añadir nueva tarea</h3>

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
          {formState.isLoading ? 'Cargando...' : 'Crear Tarea'}
        </button>
      </form>
    </>
  );
}