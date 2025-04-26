import Sidebar from "../../components/pagInicio/sidebar";
import Header from "../../components/pagInicio/header";
import AgregarProveedor from "../../components/FormAgregarProveedor/AddProveedor";

export default function Dashboard() {
    return (
      <div className="flex w-full h-screen">
        <Sidebar />
        <main className="flex-1 bg-white p-6 overflow-auto">
          <Header />
          {/*Formulario de proveedores */}
          <AgregarProveedor />
        </main>
      </div>
    );
  }