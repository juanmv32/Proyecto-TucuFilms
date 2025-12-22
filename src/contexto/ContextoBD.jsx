import React, { createContext, useEffect, useState, useCallback } from 'react';
import data from '../assets/data/movie.json';

export const ContextoBD = createContext({
  categorias: [],
  cargando: true,
  error: null,
});

export const ProveedorPeliculas = ({ children: hijos }) => {
  const [categorias, establecerCategorias] = useState([]);
  const [cargando, establecerCargando] = useState(true);
  const [error, establecerError] = useState(null);

  /**
   * HOOK: useEffect (CARGAR DATOS)
   * 
   * PROPÓSITO: Cargar datos al iniciar la aplicación
   * 
   * FLUJO DETALLADO:
   * 1. Componente se monta
   * 2. useEffect se ejecuta
   * 3. Intenta cargar datos desde localStorage
   * 4. Si no hay en localStorage: carga desde JSON
   * 5. Guarda en localStorage para próximas veces
   * 6. Actualiza el estado con los datos
   * 
   * FLUJO GRÁFICO:
   *          ↓
   *    ¿localStorage tiene 'movieData'?
   *       /        \
   *      SÍ         NO
   *     /             \
   * Cargar de         Cargar de
   * localStorage      movie.json
   *     \             /
   *      \           /
   *    Guardar en localStorage
   *          ↓
   *    Actualizar estado
   * 
   * DEPENDENCIAS: [] (array vacío)
   * - Significa: ejecutar solo UNA VEZ, cuando el componente se monta
   * - Si las dependencias cambiaran, se ejecutaría de nuevo
   */
  useEffect(() => {
    try {
      // Limpiar localStorage viejos que ya no se usan
      // (Si cambiamos la estructura, eliminamos datos antiguos)
      localStorage.removeItem('peliculas');
      
      // Intentar cargar desde localStorage primero
      // localStorage.getItem() retorna null si no existe la clave
      const datosGuardados = localStorage.getItem('movieData');
      let categorias;
      
      if (datosGuardados) {
        // ✅ ENCONTRÓ EN LOCALSTORAGE
        // JSON.parse() convierte string JSON → objeto JavaScript
        categorias = JSON.parse(datosGuardados);
      } else {
        // ✅ NO ENCONTRÓ EN LOCALSTORAGE
        // Cargar desde el archivo JSON importado
        // ?? es operador nullish coalescing: si es null/undefined, usa []
        categorias = data.categorias ?? [];
        // Guardar en localStorage para próximas veces
        // JSON.stringify() convierte objeto JavaScript → string JSON
        localStorage.setItem('movieData', JSON.stringify(categorias));
      }

      // Actualizar el estado con los datos cargados
      establecerCategorias(categorias);
      // Indicar que terminó de cargar
      establecerCargando(false);
    } catch (err) {
      // Si algo falla:
      console.error('Error cargando JSON:', err);
      // 1. Guardar el error
      establecerError(err);
      // 2. Indicar que terminó (aunque con error)
      establecerCargando(false);
      // 3. Dejar array vacío
      establecerCategorias([]);
    }
  }, []); // Ejecutar solo al montar el componente

  /**
   * DATO DERIVADO: peliculas (lista plana de películas)
   * 
   * PROPÓSITO: Convertir estructura ANIDADA en estructura PLANA
   * 
   * ENTRADA (anidada):
   * {
   *   categorias: [
   *     { id: "cat-1", peliculas: [{id:1, titulo:"Película1"}, {id:2, titulo:"Película2"}] },
   *     { id: "cat-2", peliculas: [{id:3, titulo:"Película3"}] }
   *   ]
   * }
   * 
   * SALIDA (plana):
   * [
   *   { id: 1, titulo: "Película1", categoriaId: "cat-1" },
   *   { id: 2, titulo: "Película2", categoriaId: "cat-1" },
   *   { id: 3, titulo: "Película3", categoriaId: "cat-2" }
   * ]
   * 
   * MÉTODO: flatMap()
   * - map(): transforma cada elemento
   * - flat(): aplana arrays anidados
   * - flatMap(): combina ambas operaciones
   * 
   * CÓDIGO DESGLOSADO:
   * categorias.flatMap((cat) => 
   *   (cat.peliculas || [])  // Para cada categoría, obtener sus películas
   *     .map((p) => ({       // Para cada película, agregar el categoriaId
   *       ...p,              // Copiar todas las propiedades de la película
   *       categoriaId: cat.id // Agregar el ID de la categoría
   *     }))
   * )
   * 
   * WHY Useful:
   * - ListaDePeliculas necesita una lista plana para iterar fácilmente
   * - El modal necesita acceder al categoriaId de cada película
   * - Los filtros y búsquedas funcionan mejor con listas planas
   */
  const peliculas = categorias.flatMap((cat) =>
    (cat.peliculas || []).map((p) => ({ ...p, categoriaId: cat.id }))
  );

  /**
   * FUNCIÓN: actualizarPelicula
   * 
   * PROPÓSITO: Actualizar la lista de películas (crear, editar, eliminar)
   * 
   * PARÁMETRO:
   * @param {Array} listaPlanaActualizada - Array plano de películas actualizado
   *                                  (sin la estructura anidada de categorías)
   * 
   * RESPONSABILIDADES:
   * 1. Recibe una lista PLANA
   * 2. La reorganiza en estructura ANIDADA (categorías con sus películas)
   * 3. Actualiza el estado 'categorias'
   * 4. Guarda en localStorage
   * 
   * NOTA: useCallback() es una optimización que memoriza la función
   * Se ejecuta solo cuando las dependencias cambian
   * Dependencias: [] (nunca cambia)
   * 
   * EJEMPLO DE USO:
   * // Usuario elimina película con id=5
   * const nuevaLista = peliculas.filter(peli => peli.id !== 5)
   * actualizarPelicula(nuevaLista)  // Llama esta función
   * 
   * FLUJO INTERNO DE ESTA FUNCIÓN:
   * 1. Crear un objeto mapa vacío: map = {}
   * 2. Copiar las categorías existentes en el mapa
   *    (para preservar el orden y títulos)
   * 3. Redistribuir películas en sus categorías según categoriaId
   * 4. Reconstruir array de categorías desde el mapa
   * 5. Guardar en localStorage
   * 6. Actualizar el estado 'categorias'
   */
  const actualizarPelicula = useCallback((listaPlanaActualizada) => {
    // Actualizar categorias usando la función setState que modifica previo estado
    establecerCategorias((categoriasActuales) => {
      // Crear objeto mapa para reorganizar datos: { "cat-1": {...}, "cat-2": {...} }
      const mapa = {};

      // PASO A: INICIALIZAR MAPA CON CATEGORÍAS ACTUALES
      // Esto preserva:
      // - El orden de categorías (importante!)
      // - Los títulos de categorías
      // - La estructura general
      categoriasActuales.forEach((cat) => {
        // Copiar cada categoría pero vaciar su array de películas
        mapa[cat.id] = { ...cat, peliculas: [] };
      });

      // PASO B: CREAR CATEGORÍA POR DEFECTO SI NO HAY NINGUNA
      // Esto evita errores si se inicia sin categorías
      if (Object.keys(mapa).length === 0) {
        mapa['default'] = { id: 'default', titulo: 'Sin categoría', peliculas: [] };
      }

      // PASO C: DISTRIBUIR PELÍCULAS EN SUS CATEGORÍAS
      // Ahora recorremos la lista plana y metemos cada película
      // en su categoría correspondiente
      listaPlanaActualizada.forEach((p) => {
        // Obtener el categoriaId de la película
        // ?? (nullish coalescing) intenta alternativas si no existe
        // Prioridad: 1. categoriaId, 2. categoria, 3. primera categoría disponible
        const idCategoria = p.categoriaId ?? p.categoria ?? Object.keys(mapa)[0];
        
        // Si la categoría no existe aún en el mapa, crearla
        if (!mapa[idCategoria]) {
          mapa[idCategoria] = { id: idCategoria, titulo: idCategoria, peliculas: [] };
        }
        
        // Agregar la película a su categoría
        mapa[idCategoria].peliculas.push({ ...p });
      });

      // PASO D: RECONSTRUIR ARRAY DE CATEGORÍAS DESDE EL MAPA
      // Object.keys(mapa) retorna: ["cat-1", "cat-2", ...]
      // .map() convierte a array de categorías
      const nuevasCategorias = Object.keys(mapa).map((id) => mapa[id]);
      
      // PASO E: GUARDAR EN LOCALSTORAGE
      // Serializar a JSON y guardar
      localStorage.setItem('movieData', JSON.stringify(nuevasCategorias));
      
      // PASO F: RETORNAR EL NUEVO ESTADO
      // React automáticamente re-renderiza componentes que usan este contexto
      return nuevasCategorias;
    });
  }, []);

const agregarPelicula = useCallback((nuevaPeli, idCategoriaDestino) => {
    setCategorias((prevCategorias) => {
      // 1. Recorremos las categorías para encontrar la correcta
      const nuevasCategorias = prevCategorias.map((cat) => {
        if (cat.id === idCategoriaDestino) {
          // Si es la categoría buscada, agregamos la peli al array
          return { ...cat, peliculas: [...cat.peliculas, nuevaPeli] };
        }
        return cat; // Si no es, la dejamos igual
      });

      // 2. Guardamos en LocalStorage
      localStorage.setItem('movieData', JSON.stringify(nuevasCategorias));

      return nuevasCategorias;
    });
  }, []);




  return (
    <MovieContext.Provider value={{ categorias, loading, error, user, actualizarPelicula,agregarPelicula }}>
      {children}
    </MovieContext.Provider>
  );
};

// Alias opcional
export const UserContext = MovieContext;
export const UseProvider = MovieProvider;
  /**
   * RETURN DEL PROVIDER
   * 
   * PROPÓSITO: Proporcionar los datos a través del contexto
   * 
   * VALUE (objeto que comparten todos los componentes):
   * {
   *   categorias: Array de categorías (estructura anidada)
   *   cargando: boolean ¿está cargando?
   *   error: null o Error object
   *   peliculas: Array plano de películas
   *   actualizarPelicula: Función para actualizar películas
   * }
   * 
   * CHILDREN:
   * Los componentes hijos que pueden consumir estos valores
   * 
   * VISUALIZACIÓN:
   * // En App.jsx:
   * <ProveedorPeliculas>
   *   <NavBar />
   *   <ListaDePeliculas />  ← puede usar useContext(ContextoBD)
   *   <Footer />
   * </ProveedorPeliculas>
   */
  return (
    <ContextoBD.Provider value={{ categorias, cargando, error, peliculas, actualizarPelicula }}>
      {hijos}
    </ContextoBD.Provider>
  );
};

/**
 * ALIASES (NOMBRES ALTERNATIVOS)
 * 
 * PROPÓSITO: Facilitar la importación en otros archivos
 * 
 * OPCIONES PARA IMPORTAR:
 * // Opción 1: Usar el alias ContextoBD
 * import { ContextoBD } from './contexto'
 * const { peliculas, actualizarPelicula } = useContext(ContextoBD)
 * 
 * // Opción 2: Usar ContextoPeliculas (nombre original)
 * import { ContextoPeliculas } from './contexto'
 * const { peliculas, actualizarPelicula } = useContext(ContextoPeliculas)
 * 
 * // Opción 3: Usar ProveedorPeliculas (para envolver la app)
 * import { ProveedorPeliculas } from './contexto'
 * <ProveedorPeliculas><App /></ProveedorPeliculas>
 */
export const ProveedorBD = ProveedorPeliculas;
