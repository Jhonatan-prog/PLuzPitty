import React, { useState } from "react";
import { ProductoFormValues } from "../../types/FormProductsProps";

const AgregarProducto: React.FC = () => {
  const valorInicial: ProductoFormValues = {
    codigo: "",
    nombre: "",
    cantidad: 0,
    fechaIngreso: "",
    valorUnitario: 0,
    valorSinIVA: 0,
    valorCompra: 0,
    imagen: null,
  };

  const [formData, setFormData] = useState<ProductoFormValues>(valorInicial);
  const [vistaPrevia, setVistaPrevia] = useState<string | null>(null);
  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  const limpiarFormulario = () => {
    setFormData(valorInicial);
    setVistaPrevia(null);
    setErrores({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    const sinEspeciales = /^[a-zA-Z0-9\s\-\/.]*$/;
    const soloLetras = /^[a-zA-Z\s\-]*$/;

    if (type === "file" && files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, imagen: file }));
      setVistaPrevia(URL.createObjectURL(file));
      setErrores((prev) => ({ ...prev, imagen: "" }));
      return;
    }

    if (!sinEspeciales.test(value)) return;
    if (name === "nombre" && !soloLetras.test(value)) return;
    if (name === "cantidad" && value.includes(".")) return; // evita decimales

    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const validarCampos = (): boolean => {
    const nuevosErrores: { [key: string]: string } = {};
    if (!formData.codigo) nuevosErrores.codigo = "Este campo es obligatorio";
    if (!formData.nombre) nuevosErrores.nombre = "Este campo es obligatorio";
    if (!formData.fechaIngreso) nuevosErrores.fechaIngreso = "Este campo es obligatorio";
    if (formData.cantidad <= 0) nuevosErrores.cantidad = "Debe ser mayor a 0";
    if (formData.valorUnitario <= 0) nuevosErrores.valorUnitario = "Debe ser mayor a 0";
    if (formData.valorSinIVA <= 0) nuevosErrores.valorSinIVA = "Debe ser mayor a 0";
    if (formData.valorCompra <= 0) nuevosErrores.valorCompra = "Debe ser mayor a 0";
    if (!formData.imagen) nuevosErrores.imagen = "La imagen es obligatoria";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validarCampos()) {
      console.log("Formulario válido:", formData);
      limpiarFormulario();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-25">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl border border-gray-200 ">
        <h1 className="text-center text-4xl font-bold text-purple-400 mb-8">Agregar producto</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Campo label="Código del producto" name="codigo" value={formData.codigo} onChange={handleChange} error={errores.codigo} />
            <Campo label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} error={errores.nombre} />
          </div>

          <Campo label="Cantidad en stock" name="cantidad" type="number" value={formData.cantidad.toString()} onChange={handleChange} error={errores.cantidad} />
          <Campo label="Fecha ingreso dd/mm/aaaa" name="fechaIngreso" type="date" value={formData.fechaIngreso} onChange={handleChange} error={errores.fechaIngreso} />
          <CampoMoneda label="Valor unitario COP" name="valorUnitario" value={formData.valorUnitario} onChange={handleChange} error={errores.valorUnitario} formatter={formatter} />
          <CampoMoneda label="Valor sin IVA COP" name="valorSinIVA" value={formData.valorSinIVA} onChange={handleChange} error={errores.valorSinIVA} formatter={formatter} />
          <CampoMoneda label="Valor de compra COP" name="valorCompra" value={formData.valorCompra} onChange={handleChange} error={errores.valorCompra} formatter={formatter} />

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
  );
};

export default AgregarProducto;

const Campo = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
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
  label,
  name,
  value,
  onChange,
  error,
  formatter,
}: {
  label: string;
  name: string;
  value: number;
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
        {formatter.format(value)}
      </span>
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);
