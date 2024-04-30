import "../../../assets/css/files.css"

const FilesView = () => {
  // Carpetas quemadas
  const files = Array(15).fill({ name: 'Documento', type: 'folder' });


  // SVG files
  const FolderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
    </svg>
  );
  return (
    <div className="flex min-h-screen text-center">
      {/* Contenedor izquierda opciones */}
      <div className="w-1/3 bg-[#333] p-4 text-white">
        <ul className="menu-options">
          <li>Cargar archivos</li>
          <li>Descargar archivos</li>
          <li>Crear directorio</li>
          <li>Renombrar</li>
          <li>Compartir</li>
        </ul>
      </div>
      {/* Contenedor principal*/}
      <div className="w-2/3 bg-[#60a5fa] p-12">
        <h2 className="text-6xl font-hand mb-5">Tus archivos</h2>
        <div className="grid grid-cols-5 gap-4">
          {files.map((file, index) => (
            <div key={index} className="file-item">
              <FolderIcon />
              <p>{file.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilesView;