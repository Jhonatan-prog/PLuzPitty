import React, { useState } from "react";
import { Request } from "../../api/requests";
import { ProveedorFormValues } from "../../types/FormProveedorProps";
import { RTimeValidation } from "../../utils/validation/inputs";
import Alert from "../Alertas/Alert";


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


  const limpiarFormulario = () => {
    setFormData(valorInicial);
    setVistaPrevia(null);
    setErrores({});
  };

  //Revisamos cada vez que se cambie algo en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    //guardamos la imagen y se muestra la vista previa
    if (type === "file" && files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, imagen: file.name }));// Guardamos el nombre del archivo
      setVistaPrevia(URL.createObjectURL(file));
      setErrores((prev) => ({ ...prev, imagen: "" }));
      return;
    }

    if (name === "Nombre" && !validator.soloLetras(value)) return;
    if (name === "NombreContacto" && !validator.soloLetras(value)) return; 
    if (name === "Telefono" && !validator.soloNumeros(value)) return; 

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
      } else {
        console.error("Error al agregar el proveedor:", alerta);      
      }
    } catch (error) {
      console.error("Error al agregar el proveedor:", error);
      
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
        await enviarProveedor(formData); // Llama a la función para enviar los datos
        setAlerta({ mensaje: "¡Proveedor agregado correctamente!", tipo: "exito" });// Muestra la alerta de éxito
        limpiarFormulario(); 
       } catch (error) {
        setAlerta({ mensaje: "¡El proveedor NO se pudo agregar!", tipo: "error" });
      }
  };

  return (
    <> 
    {alerta && <Alert mensaje={alerta.mensaje} tipo={alerta.tipo} />}

    <div className="min-h-screen flex items-center justify-center bg-white p-25">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl border border-gray-200 ">
        <h1 className="text-center text-4xl font-bold text-purple-400 mb-8">Agregar Proveedor</h1>

         {/* Este es el formulario donde se escriben los datos */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Aquí va la imagen */}
          <div className="flex flex-col items-center border border-purple-400 bg-gray-100 rounded-lg p-4 h-48 justify-center">
            <label htmlFor="imagen" className="cursor-pointer text-gray-500 text-sm text-center">
              {vistaPrevia ? (
                <img src={vistaPrevia} alt="Vista previa" className="h-full object-contain" />
              ) : (
                "Haz clic para subir imagen"
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
          <Campo label="Telefono" name="Telefono" value={formData.Telefono} onChange={handleChange} error={errores.Telefono} />
          <Campo label="Direccion" name="Direccion" value={formData.Direccion} onChange={handleChange} error={errores.Direccion} />
          <Campo label="Redes" name="Redes" value={formData.Redes} onChange={handleChange} error={errores.Redes} />

          <div className="md:col-span-2 flex justify-end gap-4">
            <button
              type="button"
              onClick={limpiarFormulario}
              className="bg-cyan-200 hover:bg-cyan-300 px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              className="bg-cyan-200 hover:bg-cyan-300 px-4 py-2 rounded-md"
            >
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
