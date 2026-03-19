/* Refugio Images */
import R_Bano1 from './assets/RefugioLaVillaCasAcogedora/Baño1.avif';
import R_Bano1OtraVista from './assets/RefugioLaVillaCasAcogedora/Baño1OtraVista.avif';
import R_Bano2 from './assets/RefugioLaVillaCasAcogedora/Baño2.avif';
import R_Cocina from './assets/RefugioLaVillaCasAcogedora/Cocina.avif';
import R_CocinaVG from './assets/RefugioLaVillaCasAcogedora/CocinaVistaGeneral.avif';
import R_CocinaVL from './assets/RefugioLaVillaCasAcogedora/CocinaVistaLateral.avif';
import R_Comedor from './assets/RefugioLaVillaCasAcogedora/Comedor.avif';
import R_ComedorVC from './assets/RefugioLaVillaCasAcogedora/ComedorVistaCocina.avif';
import R_ComedorVS from './assets/RefugioLaVillaCasAcogedora/ComedorVistaDesdeSala.avif';
import R_Hab1 from './assets/RefugioLaVillaCasAcogedora/Habitacion1.avif';
import R_Hab1Otra from './assets/RefugioLaVillaCasAcogedora/Habitacion1OtraVista.avif';
import R_Hab2 from './assets/RefugioLaVillaCasAcogedora/Habitacion2.avif';
import R_Hab2Frente from './assets/RefugioLaVillaCasAcogedora/Habitacion2VistaFrente.avif';
import R_Hab3 from './assets/RefugioLaVillaCasAcogedora/Habitacion3.avif';
import R_Patio from './assets/RefugioLaVillaCasAcogedora/PatioTrasero.avif';
import R_Sala from './assets/RefugioLaVillaCasAcogedora/Sala.avif';
import R_SalaVG from './assets/RefugioLaVillaCasAcogedora/SalaVistaGeneral.avif';
import R_Exterior from './assets/RefugioLaVillaCasAcogedora/VistaExterior.avif';
import R_Exterior2 from './assets/RefugioLaVillaCasAcogedora/VistaExterior2.jpeg';

/* Duplex Images */
import D_Alcoba1 from './assets/DuplexLaVillaSogamosoCentro/Alcoba1.avif';
import D_Alcoba2 from './assets/DuplexLaVillaSogamosoCentro/Alcoba2.avif';
import D_Alcoba3 from './assets/DuplexLaVillaSogamosoCentro/Alcoba3.avif';
import D_Bano1 from './assets/DuplexLaVillaSogamosoCentro/Baño1.avif';
import D_Bano2 from './assets/DuplexLaVillaSogamosoCentro/Baño2.avif';
import D_Cocina from './assets/DuplexLaVillaSogamosoCentro/CocinaCompleta.avif';
import D_Comedor from './assets/DuplexLaVillaSogamosoCentro/Comedor.avif';
import D_ComedorVG from './assets/DuplexLaVillaSogamosoCentro/ComedorVistaGeneral.avif';
import D_ComedorVS from './assets/DuplexLaVillaSogamosoCentro/ComedorVistaSala.avif';
import D_Oficina from './assets/DuplexLaVillaSogamosoCentro/Oficina.avif';

/* Host */
import AnfitrionImg from './assets/Anfitrion.png';

export const listings = [
  {
    id: 1,
    title: "Refugio La Villa",
    location: "Sogamoso, Boyacá, Colombia",
    coordinates: [5.7147, -72.9331],
    price: "COP 232.433/night",
    maxGuests: 6,
    rating: 4.9,
    reviews: 1,
    hostImage: AnfitrionImg,
    category: "villa",
    featured: true,
    description: "🏡 Hermosa casa privada con zona verde y parqueadero, rodeada de cerca viva que brinda privacidad y una agradable sensación campestre. Ubicada a la entrada de Sogamoso a solo 5 minutos del centro y 10 minutos de Tibasosa o Nobsa. Espacio acogedor, ideal para descanso, viajes de trabajo o estudio. Sus ambientes luminosos y zona exterior ofrecen comodidad y tranquilidad después de una jornada laboral o un día de turismo. Perfecta para parejas y familias. Ubicada en condominio tranquilo y seguro.",
    amenities: [
      'Parqueadero privado al ingreso de la casa',
      'Internet de alta velocidad con fibra óptica',
      'Smart TV',
      'Cocina totalmente equipada',
      'Electrodomésticos menores listos para usar',
      'Sala y comedor amplios',
      'Excelente iluminación natural durante el día',
      'Conexión directa a zona exterior privada',
      '3 habitaciones amplias y bien iluminadas',
      'Cama doble en cada habitación',
      'Colchones ortopédicos',
      'Ropa de cama de alta calidad',
      'Clósets amplios',
      'Cortinas y persianas blackout',
      '2 baños completos',
      'Baño privado en habitación principal',
      'Calentador de agua a gas',
      'Zona verde privada ideal para desayunos al aire libre o un café en la tarde',
      'Ambiente tranquilo y seguro',
      'Condominio con seguridad 24/7',
      'Senderos peatonales para caminar o pasear con tu mascota',
      'Zona comercial cercana: tiendas, restaurantes, cafeterías, gimnasio, pilates, peluquería, salón de belleza',
      'Se permiten mascotas',
      'Apto para fumadores',
      'Llegada autónoma con cerradura de teclado',
      'Patio trasero privado',
      'Mobiliario exterior',
      'Zona de comida al aire libre',
      'Tumbonas',
      'Estacionamiento gratuito en las instalaciones y en la calle',
      'Gimnasio compartido cerca',
      'Cámaras de seguridad en la parte exterior',
      'Wifi',
      'Refrigerador',
      'Utensilios básicos para cocinar',
      'Ollas y sartenes, aceite, sal y pimienta',
      'Platos y cubiertos',
      'Estufa de gas de acero inoxidable',
      'Horno doble de acero inoxidable',
      'Cafetera de filtro',
      'Copas de vino',
      'Licuadora',
      'Mesa del comedor',
      'Productos de limpieza',
      'Jabón corporal',
      'Agua caliente',
      'Gel de ducha',
      'Ganchos para la ropa',
      'Sábanas de algodón',
      'Plancha',
      'Tendedero de ropa',
      'TV',
      'Entrada independiente',
      'Entrada por otra calle o edificio',
      'No disponible: Lavadora',
      'No disponible: Secadora',
      'No disponible: Aire acondicionado',
      'No disponible: Servicios básicos',
      'No disponible: Detector de humo',
      'No disponible: Calefacción',
    ],
    images: [
      { url: R_Exterior, title: 'Fachada', caption: 'Vista Exterior' },
      { url: R_Sala, title: 'Sala de estar', caption: 'Sala principal' },
      { url: R_Comedor, title: 'Comedor', caption: 'Comedor principal' },
      { url: R_Cocina, title: 'Cocina', caption: 'Cocina equipada' },
      { url: R_Hab1, title: 'Habitación 1', caption: 'Cama doble' },
      { url: R_Hab2, title: 'Habitación 2', caption: 'Habitación secundaria' },
      { url: R_Hab3, title: 'Habitación 3', caption: 'Habitación' },
      { url: R_Bano1, title: 'Baño', caption: 'Baño principal' },
      { url: R_Bano2, title: 'Medio baño', caption: 'Baño de visitas' },
      { url: R_Patio, title: 'Exterior', caption: 'Patio trasero' },
      { url: R_Exterior2, title: 'Exterior', caption: 'Otra vista exterior' },
    ],
    reviewsList: [
      {
        id: 'r1-paula',
        author: 'Paula',
        location: 'Colombia',
        rating: 5,
        date: 'Hace 2 días',
        context: 'Con niños',
        text: 'Casa con un ambiente muy acogedor, tranquilo y muy limpio.',
        avatar: null
      }
    ]
  },
  {
    id: 2,
    title: "Duplex La Villa -Sogamoso Centro",
    location: "Sogamoso, Boyacá, Colombia",
    coordinates: [5.7147, -72.9331],
    price: "COP 169.360/night",
    maxGuests: 5,
    rating: 4.9,
    reviews: 49,
    hostImage: AnfitrionImg,
    category: "duplex",
    featured: true,
    description: "Acerca de este espacio\nDúplex moderno de 80 m² en el centro de Sogamoso, cerca de la Plaza de la Villa y la Plaza 6 de Septiembre. Totalmente equipado, combina diseño contemporáneo y esencia local. Ubicado en el corazón de la ciudad, es un lugar muy tranquilo, ideal para descansar o trabajar. Cuenta con cocina equipada, luz natural y todos los servicios para una estadía cómoda.\nPerfecto para explorar la ciudad caminando, disfrutar su historia y relajarte en un espacio amplio y acogedor.\n\nEl espacio\nCuenta con estacionamiento privado y en su interior espacios amplios y luminosos, cocina equipada, Wi-Fi, Smart TV y todas las comodidades necesarias para una estadía placentera, ya sea de trabajo o descanso. Sus tres habitaciones bien distribuidas ofrecen descanso ideal para familias, parejas o grupos pequeños.\n\nAcceso de los huéspedes\nEstacionamiento privado",
    amenities: [
      'Baño',
      'Productos de limpieza',
      'Champú',
      'Agua caliente',
      'Gel de ducha',
      'Dormitorio y lavadero',
      'Servicios básicos',
      'Toallas, sábanas, jabón y papel higiénico',
      'Ganchos para la ropa',
      'Persianas o cortinas opacas',
      'Tendedero de ropa',
      'Espacio para guardar ropa: armario',
      'Entretenimiento',
      'TV',
      'Familia',
      'Seguros para ventanas',
      'Seguridad en el hogar',
      'Cámaras de seguridad en la parte exterior de la propiedad',
      'El edificio cuenta con CCTV en todas las zonas comunas, ingreso y hall de entrada.',
      'Extintor de incendios',
      'Botiquín de primeros auxilios',
      'Internet y oficina',
      'Wifi',
      'Utensilios y vajilla',
      'Cocina',
      'Los huéspedes pueden cocinar en este espacio',
      'Refrigerador',
      'Utensilios básicos para cocinar',
      'Ollas y sartenes, aceite, sal y pimienta',
      'Platos y cubiertos',
      'Bols, palitos chinos, platos, tazas, etc.',
      'Congelador',
      'Estufa de gas de acero inoxidable',
      'Horno de acero inoxidable',
      'Cafetera: Máquina de café expreso',
      'Licuadora',
      'Mesa del comedor',
      'Café',
      'Características de la ubicación',
      'Lavandería cercana',
      'Estacionamiento e instalaciones',
      'Estacionamiento gratis en las instalaciones: 1 puesto',
      'Estacionamiento de pago en las instalaciones',
      'Servicios',
      'Se permiten mascotas',
      'No hay restricciones respecto los animales de asistencia',
      'Servicio de limpieza disponible: 2 horas al día, 3 días a la semana, costo: disponible por un costo adicional',
      'El anfitrión te va a recibir',
      'No incluidos',
      'No disponible: Lavadora',
      'No disponible: Secadora',
      'No disponible: Aire acondicionado',
      'No disponible: Detector de humo',
      'No disponible: Detector de monóxido de carbono',
      'No disponible: Calefacción',
    ],
    images: [
      { url: D_Cocina, title: 'Cocina completa', caption: 'Cocina completa' },
      { url: D_Comedor, title: 'Comedor', caption: 'Comedor' },
      { url: D_Alcoba1, title: 'Habitación 1', caption: 'Habitación 1' },
      { url: D_Alcoba2, title: 'Habitación 2', caption: 'Habitación 2' },
      { url: D_Alcoba3, title: 'Habitación 3', caption: 'Habitación 3' },
      { url: D_Bano1, title: 'Baño completo 1', caption: 'Baño completo 1' },
      { url: D_Bano2, title: 'Baño completo 2', caption: 'Baño completo 2' },
      { url: D_Oficina, title: 'Oficina', caption: 'Oficina' },
    ],
    reviewsList: [
      {
        id: 'd-r1',
        author: 'Xiomara Alexandra',
        location: 'Villavicencio, Colombia',
        rating: 5,
        date: 'diciembre de 2025',
        context: 'Con mascota',
        text: 'Andrés es una persona muy hospitalaria y amable. Estuvo pendiente de nosotros todo el tiempo y nos brindó la información turística para el recorrido de alumbrado navideño y la pasadía en Tibasosa. El apartamento está ubicado en una zona central, tranquila y segura. Además con un letrero de recibimiento y decoración navideña. Recomendado para viajes en familia con mascotas.',
        avatar: null
      },
      {
        id: 'd-r2',
        author: 'Camilo Augusto',
        location: 'Bogotá, Colombia',
        rating: 4,
        date: 'diciembre de 2025',
        context: 'Con niños',
        text: 'Primero quiero resaltar que Andrés es una persona muy amable y proactiva para resolver cualquier situación que se presenta. El apartamento es cómodo y es una buena opción en Sogamoso si vienes en familia. El apartamento cuenta con un parqueadero seguro y amplio.',
        avatar: null
      },
      {
        id: 'd-r3',
        author: 'Diana Patricia',
        location: 'Colombia',
        rating: 5,
        date: 'octubre de 2025',
        context: 'Con niños',
        text: 'Definitivamente un lugar muy muy lindo, el edificio en general limpio, tranquilo, gente amable; el apartamento cuando entramos se sintió un ambiente acogedor, cálido, el apto es hermosísimo, su decoración me encantó, las habitaciones súper cómodas y la ubicación espectacular, central y seguro!!! ¡volveríamos nos encantó!!!',
        avatar: null
      },
      {
        id: 'd-r4',
        author: 'Oscar',
        location: 'Bogotá, Colombia',
        rating: 5,
        date: 'diciembre de 2025',
        context: 'Estadía de varias noches',
        text: 'La propiedad es exactamente como las fotos. Es un departamento espacioso y limpio. El anfitrión estuvo pendiente de la estadía. En cuanto a la ubicación está a pasos del parque central. ¡Lo recomiendo!',
        avatar: null
      },
      {
        id: 'd-r5',
        author: 'María José',
        location: 'Medellín, Colombia',
        rating: 5,
        date: 'noviembre de 2025',
        context: 'Con pareja',
        text: 'Hermoso apartamento en el centro de Sogamoso. Muy bien decorado, limpio y acogedor. Andrés es un anfitrión excepcional, muy atento y siempre disponible. Definitivamente volveríamos.',
        avatar: null
      },
      {
        id: 'd-r6',
        author: 'Carlos',
        location: 'Tunja, Colombia',
        rating: 5,
        date: 'noviembre de 2025',
        context: 'Viaje de trabajo',
        text: 'Muy buen apartamento para estadías de trabajo. Buena conexión a internet, espacio de oficina cómodo y excelente ubicación. El anfitrión siempre respondió de forma rápida.',
        avatar: null
      },
      {
        id: 'd-r7',
        author: 'Valentina',
        location: 'Cali, Colombia',
        rating: 5,
        date: 'octubre de 2025',
        context: 'Con familia',
        text: 'Increíble experiencia. El apartamento es amplio, limpio y está perfectamente equipado. La ubicación es ideal para recorrer Sogamoso a pie. Andrés es un anfitrión muy atento.',
        avatar: null
      },
      {
        id: 'd-r8',
        author: 'Luisa Fernanda',
        location: 'Colombia',
        rating: 5,
        date: 'septiembre de 2025',
        context: 'Con niños',
        text: 'Excelente opción para familias. Amplio, cómodo y muy bien ubicado. El anfitrión muy atento en todo momento. Regresaremos sin duda.',
        avatar: null
      },
      {
        id: 'd-r9',
        author: 'Felipe',
        location: 'Bogotá, Colombia',
        rating: 5,
        date: 'octubre de 2025',
        context: 'Estadía de varias noches',
        text: 'Todo estuvo perfecto. El apartamento es tal cual las fotos. Muy bien ubicado y el anfitrión muy amable y servicial. Sin duda lo recomiendo.',
        avatar: null
      },
      {
        id: 'd-r10',
        author: 'Andrés F.',
        location: 'Colombia',
        rating: 5,
        date: 'septiembre de 2025',
        context: 'Estadía de varias noches',
        text: 'Excelente lugar, muy limpio y cómodo. El anfitrión muy atento y servicial. La ubicación es perfecta, cerca de todo. Lo recomiendo completamente.',
        avatar: null
      }
    ]
  }
];