import React, { useState } from "react";
import "./App.css";


function Test() {
  interface Persona {
    id: number;
    name: string;
    edad: number;
  };
  interface Producto {
    id: number;
    titulo: string;
    precio: number;
  };

  const [personas, setPersonas] = useState<Persona[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);

  const agregarPersona = () => {
    setPersonas([...personas, { id: personas.length, name: "Carlos", edad: 30 }]);
  };

  const agregarProducto = () => {
    setProductos([...productos, { id: productos.length, titulo: "Laptop", precio: 1200 }])
    // { titulo: "Laptop", precio: 1200 },
    // { titulo: "Mouse", precio: 25 },
  }
  function actualizarCampo<T, K extends keyof T>(obj: T, campo: K, valor: T[K]): T {
    return { ...obj, [campo]: valor };
  }

  interface ObjId {
    id: number
  }
  interface ListaProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
  }
  function Lista<T extends ObjId>({ items, renderItem}: ListaProps<T>): React.ReactNode {
    return <ul>{items.map((item) => <li key={item.id}>{renderItem(item)}</li>)}</ul>;
  }
  
  interface ContainerProps<T> {
    text: string;
    items: T[];
    addNew: () => void;
    clearList: () => void;
    renderItem: (item: T) => React.ReactNode;
  }
  function ListContainer<T extends ObjId>({text, items, addNew, clearList, renderItem}: ContainerProps<T>): React.ReactElement {
    return (
      <div className="col">
        <button onClick={addNew}>Agregar {text}</button>
        <button onClick={clearList}>Limpiar lista</button>
        <Lista
          items={items}
          renderItem={renderItem}
        />
      </div>
    )
  }

  interface RenderProps<T> {
    object: T;
    keys: (keyof T)[];
    onSave: (updated: T) => void;
  }
  function RenderElement<T>({object, keys, onSave}: RenderProps<T>): React.ReactNode {
    const [edit, setEdit] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<T>(object)

    const cambiarCampo = (campo: keyof T, valor: string) => {
      const valorConvertido = typeof object[campo] === "number" 
        ? Number(valor) 
        : valor;
      const actualizado = actualizarCampo(inputValue, campo, valorConvertido as T[typeof campo]);
      setInputValue(actualizado);
    };

    const saveChange = () => {
      setEdit(!edit)
      onSave(inputValue)
    }

    if (edit) {
      return (
        <span>
          {keys.map((key, index) => <>
            <input
              onChange={(evento: React.ChangeEvent<HTMLInputElement>) =>
                cambiarCampo(key, evento.target.value)
              }
              value={String(inputValue[key])}
            /> {index < keys.length-1 ? " - " : ""}
          </>)}
          <button onClick={saveChange}>Guardar</button>
        </span>
      )
    }
    return <span onClick={()=>setEdit(!edit)}>
        {keys.map((key, index) => <>
          {object[key]} {index < keys.length-1 ? " - " : ""}
        </>)}
      </span>
  }
  
  return (
    <main className="container">
      <h1>Testeos tsx</h1>
      <section className="list-elements row">
        <ListContainer
          text={"persona"}
          items={personas}
          addNew={agregarPersona}
          clearList={() => setPersonas([])}
          renderItem={(persona) =>
            <RenderElement 
              object={persona} 
              keys={["name", "edad"]} 
              onSave={(updated)=>setPersonas(
                personas.map(p => p.id === persona.id ? updated : p)
              )}
            />
          }
        />
        <ListContainer
          text={"producto"}
          items={productos}
          addNew={agregarProducto}
          clearList={() => setProductos([])}
          renderItem={(producto) =>
            <RenderElement 
              object={producto} 
              keys={["titulo", "precio"]} 
              onSave={(updated)=>setProductos(
                productos.map(p => p.id === producto.id ? updated : p)
              )}
            />
          }
        />
      </section>
    </main>
  );
}

export default Test;
