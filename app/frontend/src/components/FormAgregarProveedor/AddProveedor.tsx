import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Request } from "../../api/requests";
import { ProveedorFormValues } from "../../types/FormProveedorProps";
import { RTimeValidation } from "../../utils/validation/inputs";
import Alert from "../Alertas/Alert";
import axios from "axios";

const AgregarProveedor: React.FC = () => {
  //valores iniciales que tendra el proveedor
  const valorInicial: ProveedorFormValues = {
    Nit: "",
    Nombre: "",
    NombreContacto: "",
    Telefono: "",
    Direccion: "",
    Redes: "",
    imagen: null,
  };
  //guardamos la informacion que vamos escribiendo
  const [formData, setFormData] = useState<ProveedorFormValues>(valorInicial);
  //Guardamos la imagen para verla, para luego subirla
  const [vistaPrevia, setVistaPrevia] = useState<string | null>(null);
  //Guardamos los errores
  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const validator = new RTimeValidation();
  const [alerta, setAlerta] = useState<{ mensaje: string; tipo: "exito" | "error" } | null>(null);
  const navigate = useNavigate();

  const limpiarFormulario = () => {
    setFormData(valorInicial);
    setVistaPrevia(null);
    setErrores({});
    navigate("/Proveedor"); // Redirige a la página de proveedores después de limpiar el formulario
  };

  //Revisamos cada vez que se cambie algo en los campos del formulario
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    //guardamos la imagen y se muestra la vista previa
    if (type === "file" && files) {
      const file = files[0];
      setVistaPrevia(URL.createObjectURL(file));
      setErrores((prev) => ({ ...prev, imagen: "" }));

      const nombreImagen = await subirImagen(file); // Esperamos a que se suba la imagen al backend y guardamos el nombre de la imagen que devuelve

      if (nombreImagen) {//si se subio correctamente la imagen
        // Actualizamos el estado del formulario con el nombre de la imagen
        setFormData((prev) => ({ ...prev, imagen: nombreImagen }));
      } else {
        // actualizamos el estado de errores para mostrar un mensaje en el campo 'imagen'
        setErrores((prev) => ({ ...prev, imagen: "Error al subir la imagen" }));
      }

  return;
    }

    if (name === "Nombre" && !validator.soloLetras(value)) return;
    if (name === "NombreContacto" && !validator.soloLetras(value)) return; 
    if (name === "Telefono"){
      if(!validator.soloNumeros(value)) return;
      if(value.length > 10) return; // Limita el número de caracteres a 10
    } 

    //Cuando tenemos el mensaje de campo requerido, y empezamos a copiar en dicho campo, se quita el mensaje de error
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }

    //guardar temporalmente dentro del formulario, o sea, actualiza la información que se está escribiendo
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const enviarProveedor = async (formData: ProveedorFormValues) => {

    const request = new Request("http://localhost:5000", formData);
    try {

      const response = await request.post("Proveedor/Insertar");
      console.log("Respuesta del servidor:", formData);
      if (response?.status === 200) {
        console.log("Alerta de éxito:", alerta);
        return true;
      } else if (response?.status >= 400) {
        throw new Error("Ya existe un provedor con ese Nit.");
      } else {
        throw new Error("Error al agregar el proveedor.");
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error al agregar el proveedor.");
    }
  };    

  //Cuando le damos al boton agregar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();//ayuda a que no se recargue la pag

    const nuevosErrores = validator.validarCamposProveedor(formData);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores); // Muestra los errores si los hay
      return;
    }
      try {
        setAlerta(null);
        await enviarProveedor(formData); // Llama a la función para enviar los datos
        setAlerta({ mensaje: "¡Proveedor agregado correctamente!", tipo: "exito" });// Muestra la alerta de éxito
         
       } catch (error:any) {
        if (error.message.includes("Nit")) {// El nombre "Nit" sale de la linea 90, ya que lanza el error con Nit
          setErrores(prev => ({
          ...prev,
          Nit: error.message // Esto muestra el mensaje debajo del input
        }));
      }
      setAlerta({ mensaje: error.message, tipo: "error" });
    }
  };

  // Función asincrónica que recibe un archivo de tipo File y retorna una promesa(Algo que se va a completar en el futuro (éxito o error)) con un string (nombre de la imagen) o null si hay error
  const subirImagen = async (file: File): Promise<string | null> => {//promesa no devuelve el resultado inmediatamente, si no que estara pendiente hasta que se cumpla, se usa cuando se trabaja con codigo asincrono
    const formData = new FormData();// Se crea un nuevo objeto FormData para enviar el archivo como parte del cuerpo de una solicitud HTTP
    formData.append("archivo", file);// Se agrega el archivo al FormData con la clave "archivo", que debe coincidir con lo que espera el backend
    try {
      const response = await axios.post("http://localhost:5000/api/Upload/subir/proveedor", formData, {//formData Cuerpo de la solicitud, con el archivo adjunto
      headers: { "Content-Type": "multipart/form-data" }, // Se especifica el tipo de contenido para que el backend procese correctamente el archivo
    });

      return response.data; // Si la solicitud es exitosa, se retorna el nombre del archivo que responde el backend
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      return null;
    }
  };

  return (
    <> 
    {alerta && <Alert mensaje={alerta.mensaje} tipo={alerta.tipo} redirectTo={alerta.tipo === "exito" ? "/Proveedor" : undefined}/>}

    <div className="min-h-screen flex items-center justify-center bg-white p-25">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl border border-gray-200 ">
        <h1 className="text-center text-4xl font-bold text-purple-400 mb-8">Agregar Proveedor</h1>

         {/* Este es el formulario donde se escriben los datos */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Aquí va la imagen */}
          <div className="flex flex-col items-center border border-purple-400 bg-gray-100 rounded-lg p-4 h-48 justify-center">
            <label htmlFor="imagen" className="cursor-pointer text-gray-500 text-sm text-center">
              {vistaPrevia ? (
                <img src={vistaPrevia} alt="Vista previa" className="h-full max-h-45 object-contain" />
              ) : (
                "Haz click para subir imagen"
              )}
              <input type="file" id="imagen" name="imagen" className="hidden" onChange={handleChange} />
            </label>
            {errores.imagen && (
              <p className="text-red-500 text-sm mt-2">{errores.imagen}</p>
            )}
          </div>

          <div className="space-y-4">
            <Campo label="Nit" name="Nit" value={formData.Nit} onChange={handleChange} error={errores.Nit} />
            <Campo label="Nombre" name="Nombre" value={formData.Nombre} onChange={handleChange} error={errores.Nombre} />
          </div>

          <Campo label="Nombre Contacto" name="NombreContacto" value={formData.NombreContacto} onChange={handleChange} error={errores.NombreContacto} />
          <Campo label="Teléfono" name="Telefono" value={formData.Telefono} onChange={handleChange} error={errores.Telefono}/>
          <Campo label="Dirección" name="Direccion" value={formData.Direccion} onChange={handleChange} error={errores.Direccion} />
          <Campo label="Redes" name="Redes" value={formData.Redes} onChange={handleChange} error={errores.Redes} />

          <div className="md:col-span-2 flex justify-end gap-4">
            <button type="button" onClick={limpiarFormulario} className="bg-cyan-200 hover:bg-cyan-300 px-4 py-2 rounded-md">
              Cancelar
            </button>
            
            <button type="submit" className="bg-cyan-200 hover:bg-cyan-300 px-4 py-2 rounded-md">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AgregarProveedor;

//Es un modelo donde podemos crear varias etiquetas de campo pero con diferentes valores
const Campo = ({
  label,    // El texto que se muestra arriba del campo (ej. "Nombre")
  name,     // El nombre del campo (ej. "nombre", "cantidad")
  type = "text",    // Si no le dicen qué tipo es, será "texto" por defecto
  value,    // El valor actual del campo
  onChange,   // Qué hacer cuando alguien escribe en el campo
  error,    // Si hay un error (por ejemplo: campo vacío), lo muestra
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      step={name === "cantidad" ? "1" : undefined}
      className="mt-1 block w-full rounded-md bg-gray-100 p-2 focus:outline-none"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);
