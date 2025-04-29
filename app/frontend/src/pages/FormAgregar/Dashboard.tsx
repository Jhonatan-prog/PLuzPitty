import Sidebar from "../../components/pagInicio/sidebar";
import Header from "../../components/pagInicio/header";
import AgregarProducto from "../../components/FormAgregarProduct/AddProduct";

export default function Dashboard() {
    return (
      <div className="flex w-full h-screen">
        <Sidebar />
        <main className="flex-1 bg-white p-6 overflow-auto">
          <Header />
          {/*Formulario de productos */}
          <AgregarProducto />
        </main>
      </div>
    );
  }