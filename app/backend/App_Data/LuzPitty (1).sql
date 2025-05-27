

-- Script de Creaci�n de Base de Datos para el MVP



CREATE DATABASE luzPitty;
go
USE luzPitty
go

CREATE TABLE Usuario (
    IdUsuario INT IDENTITY(1,1) PRIMARY KEY,
    NombreUsuario VARCHAR(100) NOT NULL,
    Contraseña VARCHAR(100) NOT NULL,
    Correo VARCHAR(100) NOT NULL UNIQUE,
    NombreRol VARCHAR(50) NOT NULL,
    Telefono VARCHAR(20) NOT NULL  -- changed from INT to VARCHAR
);
go

CREATE TABLE Rol (
    NombrePermiso VARCHAR(50) NOT NULL UNIQUE,
	NombreRol varchar(50) PRIMARY KEY  not null,
	Estado CHAR(2) NOT NULL CHECK (Estado IN ('Si', 'No'))
);
go

CREATE TABLE Permiso (
    NombrePermiso VARCHAR(100) PRIMARY KEY NOT NULL,
	Estado CHAR(2) NOT NULL CHECK (Estado IN ('Si', 'No'))
);
go
-- Tabla intermedia RolPermiso (N:M)
CREATE TABLE RolPermiso (
    NombreRol varchar(50),
    NombrePermiso varchar(100),
    PRIMARY KEY (NombreRol, NombrePermiso),
    FOREIGN KEY (NombreRol) REFERENCES Rol(NombreRol),
    FOREIGN KEY (NombrePermiso) REFERENCES Permiso(NombrePermiso)
);
go
-- Tabla intermedia UsuarioRol (N:M)
CREATE TABLE UsuarioRol (
    IdUsuario int,
    NombreRol varchar(50),
    PRIMARY KEY (IdUsuario, NombreRol),
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario),
    FOREIGN KEY (NombreRol) REFERENCES Rol(NombreRol)
);
go
CREATE TABLE Producto (
    CodigoProducto VARCHAR(100) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion TEXT,
    VlrUnitario money NOT NULL,
	VlrSinIva money NOT NULL,
	VlrCompra money NOT NULL,
    Stock INT NOT NULL,
    FechaIngreso datetime NOT NULL,
	imagen varchar(255) not null
);
go
CREATE TABLE Cliente (
    IdCliente INT PRIMARY KEY identity(1,1),
    Nombre VARCHAR(100) NOT NULL,
    Telefono VARCHAR(15) NOT NULL,
	Dirección varchar(100) NOT NULL,

);
go
CREATE TABLE Factura (
    IdFactura VARCHAR(100) PRIMARY KEY,
    FechaCompra DATETIME NOT NULL,
	Nit int not null,
	Direccion varchar(100) not null,
	Telefono int not null,
	Redes varchar(60),
	Cantidad smallint NOT NULL,
	VlrUnitario money not null,
    TotalPagar money NOT NULL,
	IdCliente int not null,
	FOREIGN KEY (IdCliente) REFERENCES Cliente(IdCliente)
);
go
--Tabla Intermedia FacturaProducto
CREATE TABLE FacturaProducto (
    IdFactura VARCHAR(100),
    CodigoProducto VARCHAR(100),
    PRIMARY KEY (IdFactura, CodigoProducto),
    FOREIGN KEY (IdFactura) REFERENCES Factura(IdFactura),
    FOREIGN KEY (CodigoProducto) REFERENCES Producto(CodigoProducto)
);
go
CREATE TABLE Proveedor (
    Nit VARCHAR(100) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
	NombreContacto VARCHAR(100) NOT NULL,
    Telefono VARCHAR(15) NOT NULL,
    Direccion VARCHAR(100) NOT NULL,
    Redes varchar(60),
    imagen varchar(255) not null
);
go
-- Tabla intermedia ProductoProveedor (N:M)
CREATE TABLE ProductoProveedor (
    Nit VARCHAR(100),
    CodigoProducto  VARCHAR(100),
    PRIMARY KEY (Nit, CodigoProducto),
    FOREIGN KEY (Nit) REFERENCES Proveedor(Nit),
    FOREIGN KEY (CodigoProducto) REFERENCES Producto(CodigoProducto)
);
go
CREATE TABLE Inventario (
    IdInventario INT PRIMARY KEY IDENTITY(1,1),
    ImagenProducto varchar(255) not null,
    Cantidad INT NOT NULL,
	NombreProducto varchar(60) not null,
    DescripcionProducto text,
	Estado CHAR(2) NOT NULL CHECK (Estado IN ('Si', 'No')),
	CodigoProducto VARCHAR(100) NOT NULL,
    FOREIGN KEY (CodigoProducto) REFERENCES Producto(CodigoProducto)
);
go
CREATE TABLE Transaccion (
    CodigoTransaccion VARCHAR(100) PRIMARY KEY,
	Fecha datetime not null,
    Estado CHAR(2) NOT NULL CHECK (Estado IN ('Activo', 'Proceso', 'Desactivado')),
    Subtotal money NOT NULL,
	IdFactura VARCHAR(100) NOT NULL,
    FOREIGN KEY (IdFactura) REFERENCES Factura(IdFactura),
   
);

go
CREATE TABLE Devolucion (
    IdDevolucion INT PRIMARY KEY IDENTITY(1,1),
    Motivo TEXT NOT NULL,
    Valor money NOT NULL,
	CodigoProductoEntregado int not null,
	CodigoProductoDevuelto int not null,
	NombreEmpleado varchar(60) not null,
	Fecha datetime not null,
	IdCliente int not null,
	IdFactura VARCHAR(100) NOT NULL,
    FOREIGN KEY (IdFactura) REFERENCES Factura(IdFactura),
	FOREIGN KEY (IdCliente) REFERENCES Cliente(IdCliente)
);
go
CREATE TABLE HistorialDomicilio(
	IdHistorialDomicilio int primary key IDENTITY(1,1),
	Fecha datetime not null,
	IdCliente int not null,
	CcEmpleado int not null,
	IdFactura varchar(100) not null, 
	FOREIGN KEY (IdFactura) REFERENCES Factura(IdFactura),
	FOREIGN KEY (CcEmpleado) REFERENCES Usuario(IdUsuario),
	FOREIGN KEY (IdCliente) REFERENCES Cliente(IdCliente)
)
