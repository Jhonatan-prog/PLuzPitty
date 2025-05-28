import React, { useState } from "react";
import { ProductoFormValues } from "../../types/FormProductsProps";
import { RTimeValidation } from "../../utils/validation/inputs";
import Alert from "../Alertas/Alert";
import { useNavigate } from "react-router-dom";
import { Request } from "../../api/requests";
import axios from "axios";

const AgregarProducto: React.FC = () => {
  //valores iniciales que tendra el producto
  const valorInicial: ProductoFormValues = {
    CodigoProducto: "",
    Nombre: "",
    Descripcion: "",
    VlrUnitario: 0,
    VlrSinIva: 0,
    VlrCompra: 0,
    Stock: 0,
    FechaIngreso: "",
    imagen: null,
  };
  //guardamos la informacion que vamos escribiendo
  const [formData, setFormData] = useState<ProductoFormValues>(valorInicial);
  //Guardamos la imagen para verla, para luego subirla
  const [vistaPrevia, setVistaPrevia] = useState<string | null>(null);
  //Guardamos los errores
  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const validator = new RTimeValidation();
  const [alerta, setAlerta] = useState<{ mensaje: string; tipo: "exito" | "error" } | null>(null);
  const navigate = useNavigate();

  //formateara los precios a pesos colombianos COP
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  const limpiarFormulario = () => {
    setFormData(valorInicial);
    setVistaPrevia(null);
    setErrores({});
    navigate("/inventario"); // Redirige a la página de inventario después de limpiar el formulario
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

    //evita numeros y caracteres especiales
    if (!validator.sinespeciales(value)) return;
    if (name === "nombre" && !validator.soloLetras(value)) return;
    if (name === "cantidad" && value.includes(".")) return; // evita decimales

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

  //Cuando le damos al boton agregar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();//ayuda a que no se recargue la pag
    const nuevosErrores = validator.validarCamposProducto(formData);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    try {
        setAlerta(null);
        await enviarProducto(formData); // Llama a la función para enviar los datos
        setAlerta({ mensaje: "¡Producto agregado correctamente!", tipo: "exito" });// Muestra la alerta de éxito 
    } catch (error:any) {
        if (error.message.includes("código")) {// El nombre "código" sale de la linea 119, ya que lanza el error con código
          setErrores(prev => ({
          ...prev,
          CodigoProducto: error.message // Esto muestra el mensaje debajo del input
        }));
      }
      setAlerta({ mensaje: error.message, tipo: "error" });
    }
      
  };

  const enviarProducto = async (formData: ProductoFormValues) => {

    const request = new Request("http://localhost:5000", formData);
    try {

      const response = await request.post("producto/Insertar");
      console.log("Respuesta del servidor:", formData);
      if (response?.status === 200) {
        console.log("Alerta de éxito:", alerta);
        return true;
      } else if (response?.status >= 400) {
        throw new Error("Ya existe un producto con ese código.");
      } else {
        throw new Error("Error al agregar el producto.");
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error al agregar el producto.");
    }
  };   

  // Función asincrónica que recibe un archivo de tipo File y retorna una promesa(Algo que se va a completar en el futuro (éxito o error)) con un string (nombre de la imagen) o null si hay error
  const subirImagen = async (file: File): Promise<string | null> => {//promesa no devuelve el resultado inmediatamente, si no que estara pendiente hasta que se cumpla, se usa cuando se trabaja con codigo asincrono
    const formData = new FormData();// Se crea un nuevo objeto FormData para enviar el archivo como parte del cuerpo de una solicitud HTTP
    formData.append("archivo", file);// Se agrega el archivo al FormData con la clave "archivo", que debe coincidir con lo que espera el backend
    try {
      const response = await axios.post("http://localhost:5000/api/Upload/subir/producto", formData, {//formData Cuerpo de la solicitud, con el archivo adjunto
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
    {alerta && <Alert mensaje={alerta.mensaje} tipo={alerta.tipo} redirectTo={alerta.tipo === "exito" ? "/inventario" : undefined}/>}

    <div className="min-h-screen flex items-center justify-center bg-white p-25">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl border border-gray-200 ">
        <h1 className="text-center text-4xl font-bold text-purple-400 mb-8">Agregar producto</h1>

         {/* Este es el formulario donde se escriben los datos */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Aquí va la imagen */}
          <div className="flex flex-col items-center border border-purple-400 bg-gray-100 rounded-lg p-4 h-48 justify-center">
            <label htmlFor="imagen" className="cursor-pointer text-gray-500 text-sm text-center">
              {vistaPrevia ? (
                <img src={vistaPrevia} alt="Vista previa" className="h-full object-contain max-h-45" />
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
            <Campo label="Código del producto" name="CodigoProducto" value={formData.CodigoProducto} onChange={handleChange} error={errores.CodigoProducto} />
            <Campo label="Nombre" name="Nombre" value={formData.Nombre} onChange={handleChange} error={errores.Nombre} />
          </div>

          <Campo label="Cantidad en stock" name="Stock" type="number" value={formData.Stock.toString()} onChange={handleChange} error={errores.Stock} />
          <Campo label="Fecha ingreso dd/mm/aaaa" name="FechaIngreso" type="date" value={formData.FechaIngreso} onChange={handleChange} error={errores.FechaIngreso} />
          <CampoMoneda label="Valor unitario COP" name="VlrUnitario" value={formData.VlrUnitario.toString()} onChange={handleChange} error={errores.VlrUnitario} formatter={formatter} />
          <CampoMoneda label="Valor sin IVA COP" name="VlrSinIva" value={formData.VlrSinIva.toString()} onChange={handleChange} error={errores.VlrSinIva} formatter={formatter} />
          <CampoMoneda label="Valor de compra COP" name="VlrCompra" value={formData.VlrCompra.toString()} onChange={handleChange} error={errores.VlrCompra} formatter={formatter} />
          <Campo label="Descripción" name="Descripcion" value={formData.Descripcion} onChange={handleChange} />

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

export default AgregarProducto;

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

const CampoMoneda = ({
  label,    // Texto que aparece arriba del campo (como "Valor unitario COP")
  name,     // El nombre del campo (como "valorUnitario")
  value,    // El número que está escrito dentro del campo
  onChange, // Qué hacer cuando alguien cambia el valor
  error,    // Si hay un error, lo muestra
  formatter,  // Formateador que convierte el número a dinero (ej: $50.000)
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  formatter: Intl.NumberFormat;
}) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <div className="relative">
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md bg-gray-100 p-2 pr-16 focus:outline-none"
      />
      <span className="absolute right-3 top-2 text-gray-400 text-sm">
        {formatter.format(Number(value))}
      </span>
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);
