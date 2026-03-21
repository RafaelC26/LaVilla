export const translations = {
  es: {
    navbar: {
      logo: "La Villa",
      home: "Inicio",
      homes: "Alojamientos",
      host: "Sobre mí",
      booking: "Reservas",
      contact: "Contacto / Reservar",
      login: "Iniciar sesion",
      register: "Registrarse",
      authActionsLabel: "Acciones de autenticacion",
      bookNow: "Reservar ahora",
      searchPlaceholder: "Buscar destinos..."
    },
    userMenu: {
      openLabel: "Abrir menu de usuario",
      actionsLabel: "Acciones de usuario",
      options: [
        { key: "profile", label: "Administrar perfil" },
        { key: "bookings", label: "Mis reservas" },
        { key: "saved", label: "Estancias guardadas" },
        { key: "settings", label: "Configuracion de cuenta" },
        { key: "help", label: "Centro de ayuda" },
        { key: "logout", label: "Cerrar sesion" }
      ],
      hostOptions: [
        { key: "profile", label: "Panel de anfitrión" },
        { key: "bookings", label: "Reservas recibidas" },
        { key: "saved", label: "Mis propiedades" },
        { key: "settings", label: "Editar información de anfitrión" },
        { key: "logout", label: "Cerrar sesión" }
      ]
    },
    authDialog: {
      badge: "Acceso requerido",
      title: "Inicia sesion para reservar",
      message: "Para continuar con Reservar ahora necesitas una cuenta activa en La Villa.",
      cancel: "Cancelar",
      confirm: "Iniciar sesion"
    },
    reserveDialog: {
      badge: "Reserva confirmada",
      title: "Reservado",
      message: "Tu estancia fue reservada con exito. Prepara tu proxima escapada.",
      confirm: "Aceptar"
    },
    reserveCheckoutDialog: {
      badge: "Finalizar reserva",
      title: "Confirma los datos de tu reserva",
      subtitle: "Verifica tu informacion personal y elige la tarjeta registrada para completar tu reserva.",
      customerTitle: "Datos del cliente",
      paymentTitle: "Metodo de pago",
      paymentHint: "Selecciona una tarjeta registrada en tu perfil.",
      labels: {
        name: "Nombre",
        email: "Correo",
        phone: "Telefono"
      },
      cancel: "Cancelar",
      confirm: "Aceptar y reservar"
    },
    waReservation: {
      badge: "Finalizar en WhatsApp",
      title: "Confirmar reserva",
      subtitle: "Ingresa tus datos para generar el mensaje de reserva directa al anfitrión.",
      labels: {
        name: "Tu nombre completo",
        phone: "Teléfono de WhatsApp",
        guests: "Huéspedes",
        comments: "Comentarios o dudas adicionales"
      },
      placeholders: {
        name: "Ej: Juan Perez",
        phone: "Ej: +57 321 0000000",
        comments: "Ej: Llego después de las 3pm..."
      },
      summary: {
        stay: "Estancia",
        dates: "Fechas",
        nightly: "Noche",
        total: "Total estimado"
      },
      submit: "Enviar a WhatsApp",
      whatsappMessage: "¡Hola! Quisiera reservar *{listing}*.\n\n*Detalles de mi estancia:*\n📅 *Fechas:* {dates}\n👥 *Huéspedes:* {guests}\n💰 *Monto total:* {total}\n\n*Mis datos:*\n👤 *Nombre:* {name}\n\n{comments}\n\nQuedo atento(a) a tu confirmación. ¡Muchas gracias!"
    },
    hero: {
      title: "Descubre el lugar perfecto para tu próxima estancia",
      subtitle: "Encuentra alojamientos únicos, con ubicaciones tranquilas, comodidad y vistas inolvidables.",
      viewStaysBtn: "Ver alojamientos",
      bookNowBtn: "Reservar ahora",
      altTitle: "Escápate a lo Extraordinario",
      altSubtitle: "Refugios rurales seleccionados, desde villas en montañas neblinosas hasta fincas en viñedos soleados",
      location: "Destino",
      locationPlaceholder: "Ciudad",
      date: "Entrada",
      searchBtn: "Buscar",
      checkInLabel: "Fecha de entrada",
      checkOutLabel: "Fecha de salida",
      guestsLabel: "Personas",
      guestsPlaceholder: "¿Cuántos?",
      selectCheckInBtn: "Check-in",
      selectCheckOutBtn: "Check-out",
      calendarBack: "Back",
      calendarApply: "Apply",
      showListingsBtn: "Mostrar alojamientos",
      closeAvailabilityModal: "Cerrar aviso de disponibilidad",
      checkAvailabilityBtn: "Comprobar disponibilidad",
      availableTitle: "Hay disponibilidad",
      availableMessage: "Encontramos {count} alojamientos para esas fechas.",
      availableSearchMessage: "Encontramos {count} coincidencias para tu busqueda.",
      unavailableTitle: "No hay disponibilidad",
      unavailableMessage: "No encontramos alojamientos para ese rango.",
      unavailableCityMessage: "No tenemos disponibilidad en esta ciudad por el momento.",
      unavailableGuestsMessage: "La cantidad de personas supera la capacidad maxima permitida para los alojamientos disponibles.",
      invalidRangeTitle: "Rango de fechas inválido",
      invalidRangeMessage: "La fecha de salida debe ser posterior a la fecha de entrada.",
      missingFiltersTitle: "Faltan filtros",
      missingFiltersMessage: "Ingresa al menos una ubicacion o un rango de fechas para buscar.",
      missingDatesTitle: "Faltan fechas",
      missingDatesMessage: "Selecciona fecha de entrada y salida para consultar disponibilidad.",
      upcomingDatesLabel: "Próximas fechas disponibles"
    },
    collections: {
      label: "EL PORTAFOLIO",
      title: "Colecciones",
      viewAll: "Ver todos los Alojamientos →",
      mountain: "Escapadas de Montaña",
      lake: "Serenidad frente al Lago",
      forest: "Refugios en el Bosque"
    },
    experiences: {
      title: "Acerca de Andrés",
      subtitle: "Gestión directa y dedicada para garantizar la excelencia en cada estancia.",
      tag: "Anfitrión Verificado",
      name: "Andrés",
      role: "CTO · Docente · Anfitrión",
      bio: "Soy apasionado por la tecnología, el diseño funcional y los pequeños detalles, así que me esfuerzo para que tu estadía sea cómoda, práctica y agradable. Si necesitas recomendaciones locales, ¡estaré encantado de ayudarte!",
      trustHighlights: ["Identidad Verificada", "Valoración Excelente (4.9/5)", "Check-in Guiado y Personalizado"],
      profileImageAlt: "Andrés - Anfitrión de La Villa",
      stats: {
        reviews: "66",
        rating: "4.9",
        months: "11",
        properties: "2",
        superhostLabel: "Superanfitrión",
        reviewsLabel: "Reseñas",
        ratingLabel: "Calificación",
        monthsLabel: "Meses",
        propertiesLabel: "Propiedades"
      },
      personalFacts: [
        { icon: "work", text: "A qué me dedico: CTO - Docente" },
        { icon: "skill", text: "Mi habilidad menos útil: Memorizar diálogos de películas" },
        { icon: "star", text: "Porqué mi alojamiento es único: Muy acogedor y cómodo" },
        { icon: "pet", text: "Mascotas: Drago, Horus, Orión y Bonnie le cat" },
        { icon: "time", text: "A qué le dedico mucho tiempo: Ejercicio, runner, Gym" },
        { icon: "music", text: "Mi canción favorita en la secundaria: I don't want to miss a thing - Aerosmith" },
        { icon: "love", text: "Amo: Planearlo todo" },
        { icon: "language", text: "Habla español e inglés" },
        { icon: "location", text: "Vive en Colombia, Colombia" }
      ]
    },
    reviews: {
      title: "Lo que dicen los huéspedes",
      overview: "66 reseñas",
      overviewLabel: "En total",
      guestCount: "50",
      guestsLabel: "De huéspedes",
      hostCount: "16",
      hostCountLabel: "De anfitriones",
      items: [
        {
          id: 1,
          name: "Paula",
          location: "Huésped ocasional",
          gender: "female",
          rating: 5,
          date: "Hace 2 días",
          comment: "Casa con un ambiente muy acogedor, tranquilo y muy limpio",
          avatar: "https://i.pravatar.cc/150?u=paula"
        },
        {
          id: 2,
          name: "Ricardo Luis",
          location: "Bogotá, Colombia",
          gender: "male",
          rating: 5,
          date: "Enero de 2026",
          comment: "Un sector muy tranquilo, muy comodo el apartamento",
          avatar: "https://i.pravatar.cc/150?u=ricardoluis"
        },
        {
          id: 3,
          name: "Paola",
          location: "Visitante de Negocios",
          gender: "female",
          rating: 4,
          date: "Enero de 2026",
          comment: "Un sitio agradable con los elementos necesarios para una estancia cómoda. Ubicado en pleno centro de Sogamoso, con mucha oferta de almacenes cerca.",
          avatar: "https://i.pravatar.cc/150?u=paola2"
        },
        {
          id: 4,
          name: "Viviana Andrea",
          location: "Turista Familiar",
          gender: "female",
          rating: 5,
          date: "Enero de 2026",
          comment: "Es un buen espacio para alojarse, es limpio, cómodo y de fácil acceso. Andres como anfitrión es excelente, amable y siempre atento a cualquier cosa. Súper recomendado!!!",
          avatar: "https://i.pravatar.cc/150?u=viviana"
        },
        {
          id: 5,
          name: "Julián Alejandro",
          location: "Palmira, Colombia",
          gender: "male",
          rating: 5,
          date: "Enero de 2026",
          comment: "Un hospedaje muy ameno y súper recomendado. Es cómodo, amplio, limpio y organizado. El anfitrión estuvo muy atento a todo.",
          avatar: "https://i.pravatar.cc/150?u=julian"
        },
        {
          id: 6,
          name: "Sandra",
          location: "Bogotá, Colombia",
          gender: "female",
          rating: 5,
          date: "Enero de 2026",
          comment: "Andres es muy amable y servicial; esta siempre atento a las inquietudes de los huéspedes. El lugar es genial. Aseado, cómodo y bien ubicado.",
          avatar: "https://i.pravatar.cc/150?u=sandra"
        },
        {
          id: 7,
          name: "Victor Hugo",
          location: "Bogotá, Colombia",
          gender: "male",
          rating: 5,
          date: "Diciembre de 2025",
          comment: "Andrés es un excelente anfitrión.",
          avatar: "https://i.pravatar.cc/150?u=victorh"
        },
        {
          id: 8,
          name: "Xiomara Alexandra",
          location: "Villavicencio, Colombia",
          gender: "female",
          rating: 5,
          date: "Diciembre de 2025",
          comment: "Andrés es una persona muy hospitalaria y amable. Estuvo pendiente de nosotros todo el tiempo y nos brindó la información turística. Recomendado para viajes en familia con mascotas.",
          avatar: "https://i.pravatar.cc/150?u=xiomara"
        },
        {
          id: 9,
          name: "Johanna",
          location: "Viajera Solitaria",
          gender: "female",
          rating: 5,
          date: "Diciembre de 2025",
          comment: "Andrés, es muy amable. Me encantó el hospedaje sin duda volveré. Muchas gracias!!",
          avatar: "https://i.pravatar.cc/150?u=johanna"
        },
        {
          id: 10,
          name: "Víctor",
          location: "Turista Regional",
          gender: "male",
          rating: 4,
          date: "Diciembre de 2025",
          comment: "Apto muy bonito, cómodo. Buena ubicación, todo queda muy cerca.",
          avatar: "https://i.pravatar.cc/150?u=victor"
        },
        {
          id: 11,
          name: "Luz Yenny",
          location: "Gachetá, Colombia",
          gender: "female",
          rating: 4,
          date: "Diciembre de 2025",
          comment: "Estuvo bien solo le recomendaría una remodelación a los baños ya que están un poco deteriorados.",
          avatar: "https://i.pravatar.cc/150?u=luz"
        },
        {
          id: 12,
          name: "Camilo Augusto",
          location: "Bogotá, Colombia",
          gender: "male",
          rating: 4,
          date: "Diciembre de 2025",
          comment: "Andrés es una persona muy amable y proactiva. El apartamento es cómodo y es una buena opción en Sogamoso si vienes en familia.",
          avatar: "https://i.pravatar.cc/150?u=camilo"
        },
        {
          id: 13,
          name: "Oscar",
          location: "Bogotá, Colombia",
          gender: "male",
          rating: 5,
          date: "Diciembre de 2025",
          comment: "Andrés fué un excelente anfitrión. El apartamento es agradable y queda ubicado cerca a todo el comercio necesario.",
          avatar: "https://i.pravatar.cc/150?u=oscar"
        },
        {
          id: 14,
          name: "Olga",
          location: "Bogotá, Colombia",
          gender: "female",
          rating: 5,
          date: "Diciembre de 2025",
          comment: "Excelente anfitrión, el apartamento muy acogedor, tranquilo, limpio, muy central, parqueadero privado.",
          avatar: "https://i.pravatar.cc/150?u=olga"
        },
        {
          id: 15,
          name: "Daniel",
          location: "Viajero Reincidente",
          rating: 5,
          date: "Diciembre de 2025",
          comment: "Excelente lugar para hospedarse, volvería a quedarme aquí. Andrés muy amable y atento a todo.",
          avatar: "https://i.pravatar.cc/150?u=daniel"
        }
      ]
    },
    categoriesPage: {
      title: "Explorar Todas las Categorías",
      subtitle: "Descubre alojamientos según tu estilo de viaje",
      tag: "Experiencia",
      propertiesCount: "128 propiedades",
      cards: [
        "Cabañas A-Frame",
        "Fincas en Viñedos",
        "Refugios en el Bosque",
        "Casas en la Playa",
        "Escapadas en la Montaña",
        "Glamping",
        "Cabañas Rústicas",
        "Villas Modernas",
        "Cabañas en el Lago"
      ]
    },
    profileDashboard: {
      nav: {
        design: "Diseño",
        experiences: "Experiencias",
        about: "Sobre nosotros",
        searchPlaceholder: "Buscar destinos...",
        notificationsLabel: "Notificaciones",
        backLabel: "Volver"
      },
      user: {
        name: "Andres",
        badge: "Miembro premium"
      },
      title: "Mis Viajes",
      subtitle: "Consulta y gestiona tus escapadas rurales exclusivas y estancias en fincas.",
      sidebarItems: [
        { key: "personal", label: "Informacion personal", active: false },
        { key: "security", label: "Seguridad", active: false },
        { key: "payments", label: "Pagos", active: false },
        { key: "trips", label: "Mis Viajes", active: true },
        { key: "favorites", label: "Favoritos", active: false }
      ],
      newStayButton: "Reservar nueva estancia",
      tabs: [
        { key: "upcoming", label: "Proximos" },
        { key: "past", label: "Viajes pasados" },
        { key: "cancelled", label: "Cancelados" }
      ],
      trips: [
        {
          listingId: 1,
          status: "upcoming",
          location: "Duitama, Boyaca",
          title: "The Stone Barn Farmhouse",
          date: "Oct 12 - Oct 15, 2023",
          guests: "4 huespedes",
          image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80"
        },
        {
          listingId: 6,
          status: "upcoming",
          location: "Nobsa, Boyaca",
          title: "Olive Grove Villa and Vineyard",
          date: "Nov 02 - Nov 10, 2023",
          guests: "2 huespedes",
          image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=900&q=80"
        },
        {
          listingId: 2,
          status: "past",
          location: "Villa de Leyva, Boyaca",
          title: "Cliffside Escape",
          date: "Aug 04 - Aug 09, 2023",
          guests: "2 huespedes",
          image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80"
        },
        {
          listingId: 3,
          status: "cancelled",
          location: "Tunja, Boyaca",
          title: "Loft Apartment",
          date: "Jul 15 - Jul 20, 2023",
          guests: "3 huespedes",
          image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80"
        }
      ],
      editButton: "Modificar",
      detailsButton: "Ver Detalles",
      recommendedTitle: "Seleccionado para ti",
      recommendedLink: "Explorar todas las experiencias",
      recommendedStays: [
        {
          country: "Norway",
          title: "The Midnight Pine Cabin",
          price: "COP 210.000 / noche",
          categoryKey: "forest",
          image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=80"
        },
        {
          country: "Switzerland",
          title: "Alps Echo Manor",
          price: "COP 255.000 / noche",
          categoryKey: "mountain",
          image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80"
        },
        {
          country: "France",
          title: "Provence Lavender Mill",
          price: "COP 185.000 / noche",
          categoryKey: "vineyards",
          image: "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&w=700&q=80"
        }
      ],
      recommendedImages: [
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&w=700&q=80"
      ],
      personalInfo: {
        title: "Informacion personal",
        subtitle: "Gestiona la informacion de tu cuenta y lo que pueden ver otros usuarios.",
        profileSectionTitle: "Perfil",
        profileSectionHint: "Es posible que otros usuarios puedan ver parte de esta informacion al usar los servicios.",
        contactSectionTitle: "Informacion de contacto",
        enableEditButton: "Habilitar edicion",
        genderOptions: ["Mujer", "Hombre", "No binario", "Prefiero no decirlo"],
        labels: {
          photo: "Foto",
          name: "Nombre",
          birthDate: "Fecha de nacimiento",
          gender: "Sexo",
          idDocument: "Documento",
          password: "Contrasena",
          firstName: "Nombre",
          lastName: "Apellido",
          email: "Correo electronico",
          phone: "Telefono",
          address: "Direccion",
          city: "Ciudad",
          country: "Pais",
          bio: "Biografia"
        },
        cancelButton: "Cancelar",
        saveButton: "Guardar cambios",
        initialValues: {
          photo: "Anade una foto para personalizar tu cuenta",
          firstName: "Andres",
          lastName: "",
          birthDate: "22 de agosto de 1996",
          gender: "Mujer",
          idDocument: "DNI 74283915",
          passwordStatus: "Ultima modificacion: 6 jul. 2016",
          email: "andres@lavilla.com",
          phone: "+34 600 123 456",
          address: "Calle Aribau 128",
          city: "Barcelona",
          country: "España",
          bio: "Amante de las escapadas rurales y de la arquitectura sostenible."
        }
      },
      security: {
        title: "Seguridad",
        subtitle: "Protege tu cuenta con autenticacion adicional y controles de acceso.",
        initialValues: {
          twoStepEnabled: false,
          alertsByEmail: true
        },
        twoStep: {
          title: "Verificacion en dos pasos",
          description: "Solicita un codigo adicional al iniciar sesion desde dispositivos nuevos.",
          toggleLabel: "Activar verificacion en dos pasos",
          enabledHint: "Tu cuenta esta protegida con un segundo factor de autenticacion."
        },
        activeSessionsTitle: "Sesiones activas",
        sessions: [
          { device: "MacBook Pro - Chrome", lastAccess: "Activo ahora" },
          { device: "iPhone 14 - Safari", lastAccess: "Hace 1 hora" },
          { device: "iPad - App Horizon", lastAccess: "Hace 2 dias" }
        ],
        closeOthersButton: "Cerrar otras sesiones",
        alertsTitle: "Alertas y recuperacion",
        alertsByEmailLabel: "Recibir alertas de seguridad por correo",
        recoveryCodeLabel: "Codigo de recuperacion",
        generateCodeButton: "Generar codigo"
      },
      payments: {
        title: "Pagos",
        subtitle: "Administra tus metodos de pago, facturas y configuraciones de cobro.",
        methodsTitle: "Metodos de pago",
        addMethodButton: "Agregar metodo",
        setDefaultButton: "Definir principal",
        defaultLabel: "Principal",
        billingTitle: "Facturacion",
        autopayLabel: "Pago automatico para reservas confirmadas",
        downloadButton: "Descargar",
        initialValues: {
          autopayEnabled: true,
          selectedMethodId: "card_visa"
        },
        methods: [
          { id: "card_visa", brand: "Visa", maskedNumber: "**** 1942", holder: "Andres" },
          { id: "card_master", brand: "Mastercard", maskedNumber: "**** 4481", holder: "Andres" }
        ],
        invoices: [
          { id: "inv_001", period: "Ene 2026", amount: "$420", status: "Pagada" },
          { id: "inv_002", period: "Dic 2025", amount: "$310", status: "Pagada" },
          { id: "inv_003", period: "Nov 2025", amount: "$285", status: "Pagada" }
        ]
      },
      favorites: {
        title: "Favoritos",
        subtitle: "Aqui veras los alojamientos marcados con corazon.",
        emptyMessage: "Aun no has agregado alojamientos a favoritos.",
        exploreButton: "Explorar alojamientos",
        removeButton: "Quitar",
        viewButton: "Ver detalles",
        removeFavoriteLabel: "Quitar de favoritos"
      },
      footer: {
        links: [
          { label: "Politica de Privacidad", path: "/legal/privacy" },
          { label: "Terminos de Servicio", path: "/legal/terms" },
          { label: "Soporte", path: "/legal/support" }
        ],
        rights: "© 2026 La Villa. Todos los derechos reservados.",
        digitalCredit: "Experiencia digital por  Horizon"
      }
    },
    legalPages: {
      privacy: {
        badge: "Legal",
        title: "Política de Privacidad",
        lastUpdated: "Última actualización: 12 de enero de 2026",
        intro: "En La Villa valoramos tu privacidad. Este documento explica cómo recopilamos, usamos y protegemos tu información personal cuando utilizas nuestra plataforma.",
        sections: [
          { title: "1. Información que recopilamos", body: "Recopilamos información que nos proporcionas directamente al crear una cuenta, realizar una reserva o comunicarte con nosotros. Esto incluye nombre, correo electrónico, número de teléfono, información de pago y preferencias de viaje." },
          { title: "2. Uso de la información", body: "Utilizamos tu información para gestionar reservas, personalizar tu experiencia, enviarte confirmaciones y actualizaciones relevantes, y mejorar nuestros servicios. No vendemos tu información a terceros." },
          { title: "3. Cookies", body: "Utilizamos cookies y tecnologías similares para mejorar la funcionalidad de la plataforma, recordar tus preferencias y analizar el tráfico. Puedes controlar el uso de cookies desde la configuración de tu navegador." },
          { title: "4. Seguridad de los datos", body: "Implementamos medidas técnicas y organizativas apropiadas para proteger tu información contra accesos no autorizados, alteración, divulgación o destrucción." },
          { title: "5. Tus derechos", body: "Tienes derecho a acceder, corregir o eliminar tu información personal en cualquier momento desde la configuración de tu cuenta. También puedes solicitar la portabilidad de tus datos contactándonos directamente." },
          { title: "6. Cambios a esta política", body: "Podemos actualizar esta política periódicamente. Te notificaremos por correo electrónico ante cambios significativos. El uso continuo de la plataforma implica tu aceptación." },
          { title: "7. Contacto", body: "Para preguntas relacionadas con tu privacidad escríbenos a privacidad@lavilla.com o usa el formulario de contacto en la sección de Soporte." }
        ]
      },
      terms: {
        badge: "Legal",
        title: "Términos de Servicio",
        lastUpdated: "Última actualización: 12 de enero de 2026",
        intro: "Al acceder o utilizar la plataforma de La Villa, aceptas estar vinculado por estos Términos de Servicio. Léelos detenidamente antes de realizar cualquier reserva.",
        sections: [
          { title: "1. Aceptación de los términos", body: "Al registrarte o utilizar nuestros servicios, confirmas que tienes al menos 18 años y que aceptas plenamente estos términos. Si no estás de acuerdo, no debes utilizar la plataforma." },
          { title: "2. Uso del servicio", body: "La Villa es una plataforma de alojamiento rural y premium en Boyacá. Los usuarios pueden buscar, consultar y reservar propiedades disponibles. El uso de la plataforma con fines fraudulentos o ilegales está estrictamente prohibido." },
          { title: "3. Reservas y pagos", body: "Las reservas se confirman únicamente tras completar el proceso de pago. Los precios incluyen todos los impuestos aplicables. Nos reservamos el derecho de cancelar reservas en casos de fraude o error de precios." },
          { title: "4. Cancelaciones", body: "Las cancelaciones realizadas con más de 7 días de antelación recibirán un reembolso completo. Las cancelaciones con menos de 7 días pueden estar sujetas a penalizaciones según la propiedad seleccionada." },
          { title: "5. Responsabilidad", body: "La Villa actúa como intermediario entre huéspedes y propiedades. No seremos responsables de daños o pérdidas que ocurran durante la estancia más allá de lo estipulado en cada reserva." },
          { title: "6. Modificaciones", body: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán comunicados con al menos 15 días de anticipación a través del correo registrado en tu cuenta." }
        ]
      },
      support: {
        badge: "Soporte",
        title: "Centro de Ayuda",
        subtitle: "Estamos aquí para ayudarte en cada paso de tu estancia.",
        contactTitle: "Canales de contacto",
        contactOptions: [
          { icon: "💬", label: "WhatsApp", description: "Respuesta inmediata", value: "+57 310 000 0000" },
          { icon: "✉️", label: "Correo", description: "Respuesta en menos de 2 horas", value: "hola@lavilla.com" },
          { icon: "📸", label: "Instagram", description: "Mensajes directos", value: "@lavilla" }
        ],
        faqTitle: "Preguntas frecuentes",
        faqItems: [
          { question: "¿Cómo realizo una reserva?", answer: "Selecciona el alojamiento, elige tus fechas y número de huéspedes, luego haz clic en 'Reservar ahora'. Deberás estar registrado para completar el pago." },
          { question: "¿Puedo cancelar mi reserva?", answer: "Sí. Puedes cancelar desde 'Mis viajes' en tu perfil. Las cancelaciones con más de 7 días de antelación son completamente gratuitas." },
          { question: "¿El check-in es presencial?", answer: "Sí, ofrecemos check-in guiado por el anfitrión. Recibirás instrucciones detalladas por correo y WhatsApp al confirmar tu reserva." },
          { question: "¿Qué incluye el precio por noche?", answer: "El precio incluye todos los servicios indicados en la descripción del alojamiento: ropa de cama, wifi, servicios básicos y los amenities listados." },
          { question: "¿Puedo llevar mascotas?", answer: "Depende del alojamiento. Cada propiedad especifica si acepta mascotas. Consulta antes de reservar." }
        ]
      }
    },
    stats: {
      properties: "Propiedades",
      propertiesValue: "500+",
      destinations: "Destinos",
      destinationsValue: "25",
      satisfaction: "Satisfacción",
      satisfactionValue: "99%",
      owners: "Propietarios de Prestigio",
      ownersValue: "24"
    },
    listings: {
      featuredAccommodations: "Alojamientos Destacados",
      additionalStays: "Alojamientos Disponibles",
      noResults: "No encontramos alojamientos con esos filtros",
      perNight: "noche"
    },
    catalog: {
      breadcrumb: "Inicio / Alojamientos en Boyaca",
      title: "Alojamientos disponibles",
      subtitle: "Encuentra y reserva el alojamiento perfecto para tus fechas",
      showMap: "Mostrar mapa",
      closeLabel: "Cerrar vista de alojamientos",
      dateHint: "12/04/24",
      placeholders: {
        destination: "Destinos",
        date: "Fecha"
      },
      filters: {
        destination: "Destinos",
        date: "Fecha",
        price: "Precio",
        minPrice: "Precio maximo",
        rooms: "Habitaciones",
        serviceOptions: [
          { key: "wifi", label: "Wi-Fi" },
          { key: "pool", label: "Piscina" },
          { key: "kitchen", label: "Cocina" },
          { key: "parking", label: "Estacionamiento" }
        ]
      }
    },
    detail: {
      breadcrumbPrefix: "Inicio",
      reviews: "(132 reseñas)",
      entirePlace: "Alojamiento entero",
      beds: "5 camas",
      guests: "huespedes",
      hostTitle: "Descripcion del alojamiento",
      perLabel: "por",
      noCharge: "No se cobrara nada aun",
      duration: "Duracion",
      nights: "noches",
      totalBeforeTax: "Total antes de impuestos",
      whatThisPlaceOffers: "Lo que ofrece este lugar",
      nightlyRate: "Tarifa por noche",
      serviceFee: "Cargo por servicio",
      selectDates: "Selecciona fechas",
      totalLabel: "Total:",
      totalBeforeTax: "Total antes de impuestos",
      mapLink: "Mostrar mapa",
      tabs: ["Detalles", "Disponibilidad", "Reseñas", "Ubicación"],
      monthLabel: "Mayo 2024",
      chooseDates: "Elige tus fechas, reserva y activa una confirmacion instantanea.",
      contactHost: "Contactar anfitrión",
      airbnbLink: "Ver en Airbnb",
      hostBadge: "Superanfitrion",
      hostName: "Andres",
      hostSince: "Anfitrión desde 2018",
      hostBio: "Apasionado por crear experiencias memorables en montaña y naturaleza.",
      hostDialog: {
        name: "Andrés",
        badge: "Anfitrión Premium",
        properties: "8 propiedades exclusivas",
        bio: "Hola, soy Andrés. Mi objetivo es que vivas Boyacá de una manera única. Estoy aquí para personalizar tu estancia y asegurar que cada momento en nuestras propiedades sea excepcional.",
        contactButton: "Conversar con Andrés",
        profileButton: "Ver Perfil Profesional",
        image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=320&h=320&fit=crop&crop=face",
        stats: [
          { icon: "★", value: "4.9", label: "Calificación" },
          { icon: "👥", value: "66", label: "Reseñas" },
          { icon: "◷", value: "11 Meses", label: "Experiencia" }
        ]
      },
      hostChat: {
        title: "Chat con anfitrion",
        status: "En linea",
        placeholder: "Escribe un mensaje...",
        sendLabel: "Enviar mensaje",
        minimizeLabel: "Minimizar chat",
        expandLabel: "Expandir chat",
        collapseLabel: "Contraer chat",
        hideLabel: "Esconder chat",
        showLabel: "Mostrar chat",
        closeLabel: "Cerrar chat",
        youLabel: "(Tu)",
        testPreviewName: "Chat de prueba",
        testPreviewTime: "7:12",
        testPreviewSnippet: "✓✓ Asi se veria otra conversacion mini.",
        messages: [
          {
            id: "host-1",
            sender: "host",
            text: "Hola, soy Andres. Estoy aqui para ayudarte con tu reserva.",
            time: "25min"
          },
          {
            id: "guest-1",
            sender: "guest",
            text: "Hola, estoy planificando un fin de semana para dos a finales de mayo.",
            time: "20min"
          },
          {
            id: "host-2",
            sender: "host",
            text: "Excelente, esas fechas suelen estar disponibles. Si quieres te comparto actividades cercanas.",
            time: "15min"
          }
        ]
      },
      hostProfileTitle: "Perfil del anfitrión",
      hostSpecialtyOne: "Respuesta rápida y personalizada",
      hostSpecialtyTwo: "Consejos locales de montaña",
      hostSpecialtyThree: "Atención premium durante toda la estadía",
      trustTitle: "Tu seguridad es nuestra prioridad",
      mapPreviewAlt: "Vista previa del mapa",
      trustItems: ["Mantienes datos cifrados", "Validamos anfitriones", "Proteccion contra fraudes", "Soporte 24/7"],
      reviewSummary: "4.9 / 5 (132 reseñas)",
      reviewWord: "reseñas",
      whereYouWillSleep: "Dónde dormirás",
      quickHighlights: ["Alojamiento entero", "Limpieza impecable", "Ubicación espectacular", "Atención premium"],
      sleepFeatures: [
        { title: "Alojamiento entero", description: "Lo ocupas por completo." },
        { title: "Una taza escenarios encantadores", description: "Espacios pensados para descansar." },
        { title: "Limpieza impecable", description: "Evaluación superior de huéspedes." },
        { title: "Estacionamiento privado gratuito", description: "A minutos del acceso principal." }
      ],
      listingOverrides: {
        "1": {
          description: "Cabana tranquila junto al fiordo con vistas a la montaña, interiores acogedores y terraza privada.",
          amenities: ["Wifi", "Chimenea", "Vista al lago", "Cocina"]
        },
        "2": {
          description: "Retiro luminoso sobre el acantilado con brisa marina, terraza al atardecer y decoracion minimalista.",
          amenities: ["Vista al mar", "Desayuno", "Aire acondicionado", "Piscina"]
        },
        "5": {
          description: "Estudio compacto cerca de la costa, con luz natural y barrios locales caminables.",
          amenities: ["Wifi", "Kitchenette", "Balcón con brisa marina", "Self check-in"]
        },
        "3": {
          description: "Loft moderno en una zona tranquila cerca de templos, cafeterías y rincones gastronómicos locales.",
          amenities: ["Wifi rapido", "Balcon", "Espacio de trabajo", "Lavadora"]
        },
        "4": {
          description: "Loft refinado con materiales premium, amplio salon y una atmosfera elegante de ciudad.",
          amenities: ["Conserje", "Smart TV", "Cocina premium", "Ropa de cama premium"]
        }
      }
    },
    footer: {
      description: "Descubre casas seleccionadas y atendidas personalmente para una estancia tranquila y memorable.",
      supportTitle: "Tu estancia",
      supportLinks: ["Como reservar", "Check-in y check-out", "Normas de la casa", "Politica de cancelacion"],
      connectTitle: "Contacto",
      connectLinks: ["WhatsApp", "Correo", "Instagram", "Ubicacion"],
      brandLine: "© 2026 Horizon.",
      rights: "Todos los derechos reservados"
    }
  },
  en: {
    navbar: {
      logo: "La Villa",
      home: "Home",
      homes: "Accommodations",
      host: "About me",
      booking: "Bookings",
      contact: "Contact / Book",
      login: "Sign in",
      register: "Register",
      authActionsLabel: "Authentication actions",
      bookNow: "Book Now",
      searchPlaceholder: "Search destinations..."
    },
    userMenu: {
      openLabel: "Open user menu",
      actionsLabel: "User actions",
      options: [
        { key: "profile", label: "Manage profile" },
        { key: "bookings", label: "My bookings" },
        { key: "saved", label: "Saved stays" },
        { key: "settings", label: "Account settings" },
        { key: "help", label: "Help center" },
        { key: "logout", label: "Sign out" }
      ]
    },
    authDialog: {
      badge: "Access required",
      title: "Sign in to reserve",
      message: "To continue with Book Now you need an active La Villa account.",
      cancel: "Cancel",
      confirm: "Sign in"
    },
    reserveDialog: {
      badge: "Reservation confirmed",
      title: "Reserved",
      message: "Your stay was booked successfully. Get ready for your next getaway.",
      confirm: "Great"
    },
    reserveCheckoutDialog: {
      badge: "Complete reservation",
      title: "Confirm your reservation details",
      subtitle: "Review your customer information and choose a saved card to complete your booking.",
      customerTitle: "Customer details",
      paymentTitle: "Payment method",
      paymentHint: "Choose a card saved in your profile.",
      labels: {
        name: "Name",
        email: "Email",
        phone: "Phone"
      },
      cancel: "Cancel",
      confirm: "Accept and reserve"
    },
    waReservation: {
      badge: "Finish on WhatsApp",
      title: "Confirm Booking",
      subtitle: "Enter your details to generate a direct booking message for the host.",
      labels: {
        name: "Full name",
        phone: "WhatsApp number",
        guests: "Guests",
        comments: "Comments or questions"
      },
      placeholders: {
        name: "Ex: John Doe",
        phone: "Ex: +1 555 000 0000",
        comments: "Ex: Arriving after 3pm..."
      },
      summary: {
        stay: "Stay",
        dates: "Dates",
        nightly: "Nightly",
        total: "Estimated total"
      },
      submit: "Send to WhatsApp",
      whatsappMessage: "Hi! I would like to book *{listing}*.\n\n*My stay details:*\n📅 *Dates:* {dates}\n👥 *Guests:* {guests}\n💰 *Total amount:* {total}\n\n*My details:*\n👤 *Name:* {name}\n\n{comments}\n\nI look forward to your confirmation. Thank you!"
    },
    hero: {
      title: "Discover the perfect place for your next stay.",
      subtitle: "Find unique accommodations with quiet locations, comfort, and unforgettable views.",
      viewStaysBtn: "View accommodations",
      bookNowBtn: "Book now",
      altTitle: "Escape to the Extraordinary",
      altSubtitle: "Selected rural refuges, from villas in misty mountains to estates in sunny vineyards",
      location: "Location",
      locationPlaceholder: "City",
      date: "Check-in",
      searchBtn: "Search",
      checkInLabel: "Check-in date",
      checkOutLabel: "Check-out date",
      guestsLabel: "Guests",
      guestsPlaceholder: "How many?",
      selectCheckInBtn: "Choose check-in",
      selectCheckOutBtn: "Choose check-out",
      calendarBack: "Back",
      calendarApply: "Apply",
      showListingsBtn: "Show stays",
      closeAvailabilityModal: "Close availability notice",
      checkAvailabilityBtn: "Check availability",
      availableTitle: "Availability found",
      availableMessage: "We found {count} stays for those dates.",
      availableSearchMessage: "We found {count} matches for your search.",
      unavailableTitle: "No availability",
      unavailableMessage: "No stays found for that range.",
      unavailableCityMessage: "We do not have availability in this city at the moment.",
      unavailableGuestsMessage: "The number of guests exceeds the maximum allowed capacity for the available stays.",
      invalidRangeTitle: "Invalid date range",
      invalidRangeMessage: "Check-out date must be after check-in date.",
      missingFiltersTitle: "Missing filters",
      missingFiltersMessage: "Enter at least a location or a full date range to search.",
      missingDatesTitle: "Missing dates",
      missingDatesMessage: "Select check-in and check-out to check availability.",
      upcomingDatesLabel: "Upcoming available dates"
    },
    collections: {
      label: "THE PORTFOLIO",
      title: "Collections",
      viewAll: "View all accommodations →",
      mountain: "Mountain Escapes",
      lake: "Lakeside Serenity",
      forest: "Forest Retreats"
    },
    experiences: {
      title: "About Andrés",
      subtitle: "Direct and dedicated management to ensure excellence in every stay.",
      tag: "Verified Host",
      name: "Andrés",
      role: "CTO · Teacher · Host",
      bio: "I am passionate about technology, functional design and the small details, so I strive to make your stay comfortable, practical and pleasant. If you need local recommendations, I will be happy to help you!",
      trustHighlights: ["Verified Identity", "Excellent Rating (4.9/5)", "In-Person Guided Check-in"],
      profileImageAlt: "Andrés - La Villa Host",
      stats: {
        reviews: "66",
        rating: "4.9",
        months: "11",
        properties: "2",
        superhostLabel: "Superhost",
        reviewsLabel: "Reviews",
        ratingLabel: "Rating",
        monthsLabel: "Months",
        propertiesLabel: "Properties"
      },
      personalFacts: [
        { icon: "work", text: "What I do: CTO - Teacher" },
        { icon: "skill", text: "My least useful skill: Memorizing movie dialogues" },
        { icon: "star", text: "Why my place is unique: Very cozy and comfortable" },
        { icon: "pet", text: "Pets: Drago, Horus, Orion and Bonnie le cat" },
        { icon: "time", text: "What I spend a lot of time on: Exercise, runner, Gym" },
        { icon: "music", text: "My favorite song in High School: I don't want to miss a thing - Aerosmith" },
        { icon: "love", text: "I love: Planning everything" },
        { icon: "language", text: "Speaks Spanish and English" },
        { icon: "location", text: "Lives in Colombia, Colombia" }
      ]
    },
    reviews: {
      title: "What guests are saying",
      overview: "66 reviews",
      overviewLabel: "In total",
      guestCount: "50",
      guestsLabel: "From guests",
      hostCount: "16",
      hostCountLabel: "From hosts",
      items: [
        {
          id: 1,
          name: "Paula",
          location: "Occasional Guest",
          gender: "female",
          rating: 5,
          date: "2 days ago",
          comment: "House with a very cozy, quiet and very clean environment",
          avatar: "https://i.pravatar.cc/150?u=paula"
        },
        {
          id: 2,
          name: "Ricardo Luis",
          location: "Bogotá, Colombia",
          gender: "male",
          rating: 5,
          date: "January 2026",
          comment: "A very quiet area, very comfortable apartment",
          avatar: "https://i.pravatar.cc/150?u=ricardoluis"
        },
        {
          id: 3,
          name: "Paola",
          location: "Business Visitor",
          gender: "female",
          rating: 4,
          date: "January 2026",
          comment: "A pleasant place with the necessary elements for a comfortable stay. located in the heart of Sogamoso, with a lot of shops nearby",
          avatar: "https://i.pravatar.cc/150?u=paola2"
        },
        {
          id: 4,
          name: "Viviana Andrea",
          location: "Family Tourist",
          gender: "female",
          rating: 5,
          date: "January 2026",
          comment: "It is a good space to stay, it is clean, comfortable and easy to access. Andres as a host is excellent, friendly and always attentive to anything. Super recommended!!!",
          avatar: "https://i.pravatar.cc/150?u=viviana"
        },
        {
          id: 5,
          name: "Julián Alejandro",
          location: "Palmira, Colombia",
          gender: "male",
          rating: 5,
          date: "January 2026",
          comment: "A very pleasant stay and super recommended. It is comfortable, spacious, clean and organized. The host was very attentive to everything.",
          avatar: "https://i.pravatar.cc/150?u=julian"
        },
        {
          id: 6,
          name: "Sandra",
          location: "Bogotá, Colombia",
          gender: "female",
          rating: 5,
          date: "January 2026",
          comment: "Andres is very kind and helpful; is always attentive to the concerns of the guests. The place is great. Neat, comfortable and well located.",
          avatar: "https://i.pravatar.cc/150?u=sandra"
        },
        {
          id: 7,
          name: "Victor Hugo",
          location: "Bogotá, Colombia",
          gender: "male",
          rating: 5,
          date: "December 2025",
          comment: "Andrés is an excellent host.",
          avatar: "https://i.pravatar.cc/150?u=victorh"
        },
        {
          id: 8,
          name: "Xiomara Alexandra",
          location: "Villavicencio, Colombia",
          gender: "female",
          rating: 5,
          date: "December 2025",
          comment: "Andrés is a very hospitable and kind person. He was aware of us all the time and provided us with tourist information. Recommended for family trips with pets.",
          avatar: "https://i.pravatar.cc/150?u=xiomara"
        },
        {
          id: 9,
          name: "Johanna",
          location: "Solo Traveler",
          gender: "female",
          rating: 5,
          date: "December 2025",
          comment: "Andrés, is very kind. I loved the lodging without a doubt I will return. Thank you very much!!",
          avatar: "https://i.pravatar.cc/150?u=johanna"
        },
        {
          id: 10,
          name: "Víctor",
          location: "Regional Tourist",
          gender: "male",
          rating: 4,
          date: "December 2025",
          comment: "Very nice, comfortable apartment. Good location, everything is very close.",
          avatar: "https://i.pravatar.cc/150?u=victor"
        },
        {
          id: 11,
          name: "Luz Yenny",
          location: "Gachetá, Colombia",
          gender: "female",
          rating: 4,
          date: "December 2025",
          comment: "It was fine I would only recommend a remodel to the bathrooms as they are a bit deteriorated.",
          avatar: "https://i.pravatar.cc/150?u=luz"
        },
        {
          id: 12,
          name: "Camilo Augusto",
          location: "Bogotá, Colombia",
          gender: "male",
          rating: 4,
          date: "December 2025",
          comment: "Andrés is a very kind and proactive person. The apartment is comfortable and is a good option in Sogamoso if you come with family.",
          avatar: "https://i.pravatar.cc/150?u=camilo"
        },
        {
          id: 13,
          name: "Oscar",
          location: "Bogotá, Colombia",
          gender: "male",
          rating: 5,
          date: "December 2025",
          comment: "Andrés was an excellent host. The apartment is pleasant and is located close to all necessary commerce.",
          avatar: "https://i.pravatar.cc/150?u=oscar"
        },
        {
          id: 14,
          name: "Olga",
          location: "Bogotá, Colombia",
          gender: "female",
          rating: 5,
          date: "December 2025",
          comment: "Excellent host, the apartment very cozy, quiet, clean, very central, private parking.",
          avatar: "https://i.pravatar.cc/150?u=olga"
        },
        {
          id: 15,
          name: "Daniel",
          location: "Returning Traveler",
          rating: 5,
          date: "December 2025",
          comment: "Excellent place to stay, I would stay here again. Andrés very kind and attentive to everything.",
          avatar: "https://i.pravatar.cc/150?u=daniel"
        }
      ]
    },
    categoriesPage: {
      title: "Explore All Categories",
      subtitle: "Discover stays based on your travel style",
      tag: "Experience",
      propertiesCount: "128 properties",
      cards: [
        "A-Frame Cabins",
        "Vineyard Estates",
        "Forest Retreats",
        "Beach Homes",
        "Mountain Escapes",
        "Glamping",
        "Rustic Cabins",
        "Modern Villas",
        "Lake Cabins"
      ]
    },
    profileDashboard: {
      nav: {
        design: "Design",
        experiences: "Experiences",
        about: "About us",
        searchPlaceholder: "Search destinations...",
        notificationsLabel: "Notifications",
        backLabel: "Go back"
      },
      user: {
        name: "Andres",
        badge: "Premium member"
      },
      title: "My Trips",
      subtitle: "Review and manage your exclusive rural getaways and country stays.",
      sidebarItems: [
        { key: "personal", label: "Personal information", active: false },
        { key: "security", label: "Security", active: false },
        { key: "payments", label: "Payments", active: false },
        { key: "trips", label: "My Trips", active: true },
        { key: "favorites", label: "Favorites", active: false }
      ],
      newStayButton: "Book new stay",
      tabs: [
        { key: "upcoming", label: "Upcoming" },
        { key: "past", label: "Past trips" },
        { key: "cancelled", label: "Cancelled" }
      ],
      trips: [
        {
          listingId: 1,
          status: "upcoming",
          location: "Duitama, Boyaca",
          title: "The Stone Barn Farmhouse",
          date: "Oct 12 - Oct 15, 2023",
          guests: "4 guests",
          image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80"
        },
        {
          listingId: 6,
          status: "upcoming",
          location: "Nobsa, Boyaca",
          title: "Olive Grove Villa and Vineyard",
          date: "Nov 02 - Nov 10, 2023",
          guests: "2 guests",
          image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=900&q=80"
        },
        {
          listingId: 2,
          status: "past",
          location: "Villa de Leyva, Boyaca",
          title: "Cliffside Escape",
          date: "Aug 04 - Aug 09, 2023",
          guests: "2 guests",
          image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80"
        },
        {
          listingId: 3,
          status: "cancelled",
          location: "Tunja, Boyaca",
          title: "Loft Apartment",
          date: "Jul 15 - Jul 20, 2023",
          guests: "3 guests",
          image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80"
        }
      ],
      editButton: "Edit",
      detailsButton: "View details",
      recommendedTitle: "Selected for you",
      recommendedLink: "Explore all experiences",
      recommendedStays: [
        {
          country: "Norway",
          title: "The Midnight Pine Cabin",
          price: "COP 210,000 / night",
          categoryKey: "forest",
          image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=80"
        },
        {
          country: "Switzerland",
          title: "Alps Echo Manor",
          price: "COP 255,000 / night",
          categoryKey: "mountain",
          image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80"
        },
        {
          country: "France",
          title: "Provence Lavender Mill",
          price: "COP 185,000 / night",
          categoryKey: "vineyards",
          image: "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&w=700&q=80"
        }
      ],
      recommendedImages: [
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&w=700&q=80"
      ],
      personalInfo: {
        title: "Personal information",
        subtitle: "Manage your account information and what other users can see.",
        profileSectionTitle: "Profile",
        profileSectionHint: "Other users may be able to see parts of this information when using services.",
        contactSectionTitle: "Contact information",
        enableEditButton: "Enable editing",
        genderOptions: ["Female", "Male", "Non-binary", "Prefer not to say"],
        labels: {
          photo: "Photo",
          name: "Name",
          birthDate: "Birth date",
          gender: "Gender",
          idDocument: "Document",
          password: "Password",
          firstName: "First name",
          lastName: "Last name",
          email: "Email",
          phone: "Phone",
          address: "Address",
          city: "City",
          country: "Country",
          bio: "Bio"
        },
        cancelButton: "Cancel",
        saveButton: "Save changes",
        initialValues: {
          photo: "Add a photo to personalize your account",
          firstName: "Andres",
          lastName: "",
          birthDate: "August 22, 1996",
          gender: "Female",
          idDocument: "ID 74283915",
          passwordStatus: "Last changed: Jul 6, 2016",
          email: "andres@lavilla.com",
          phone: "+34 600 123 456",
          address: "128 Aribau Street",
          city: "Barcelona",
          country: "Spain",
          bio: "Loves rural escapes and sustainable architecture experiences."
        }
      },
      security: {
        title: "Security",
        subtitle: "Protect your account with additional authentication and access controls.",
        initialValues: {
          twoStepEnabled: false,
          alertsByEmail: true
        },
        twoStep: {
          title: "Two-step verification",
          description: "Require an extra code when signing in from new devices.",
          toggleLabel: "Enable two-step verification",
          enabledHint: "Your account is protected with a second authentication factor."
        },
        activeSessionsTitle: "Active sessions",
        sessions: [
          { device: "MacBook Pro - Chrome", lastAccess: "Active now" },
          { device: "iPhone 14 - Safari", lastAccess: "1 hour ago" },
          { device: "iPad - Horizon app", lastAccess: "2 days ago" }
        ],
        closeOthersButton: "Close other sessions",
        alertsTitle: "Alerts and recovery",
        alertsByEmailLabel: "Receive security alerts by email",
        recoveryCodeLabel: "Recovery code",
        generateCodeButton: "Generate code"
      },
      payments: {
        title: "Payments",
        subtitle: "Manage your payment methods, invoices, and billing settings.",
        methodsTitle: "Payment methods",
        addMethodButton: "Add method",
        setDefaultButton: "Set default",
        defaultLabel: "Default",
        billingTitle: "Billing",
        autopayLabel: "Autopay for confirmed bookings",
        downloadButton: "Download",
        initialValues: {
          autopayEnabled: true,
          selectedMethodId: "card_visa"
        },
        methods: [
          { id: "card_visa", brand: "Visa", maskedNumber: "**** 1942", holder: "Andres" },
          { id: "card_master", brand: "Mastercard", maskedNumber: "**** 4481", holder: "Andres" }
        ],
        invoices: [
          { id: "inv_001", period: "Jan 2026", amount: "$420", status: "Paid" },
          { id: "inv_002", period: "Dec 2025", amount: "$310", status: "Paid" },
          { id: "inv_003", period: "Nov 2025", amount: "$285", status: "Paid" }
        ]
      },
      favorites: {
        title: "Favorites",
        subtitle: "Here you can see stays marked with hearts.",
        emptyMessage: "You have not added favorite stays yet.",
        exploreButton: "Explore stays",
        removeButton: "Remove",
        viewButton: "View details",
        removeFavoriteLabel: "Remove from favorites"
      },
      footer: {
        links: [
          { label: "Privacy Policy", path: "/legal/privacy" },
          { label: "Terms of Service", path: "/legal/terms" },
          { label: "Support", path: "/legal/support" }
        ],
        rights: "© 2026 La Villa. All rights reserved.",
        digitalCredit: "Digital experience by Horizon"
      }
    },
    legalPages: {
      privacy: {
        badge: "Legal",
        title: "Privacy Policy",
        lastUpdated: "Last updated: January 12, 2026",
        intro: "At La Villa we value your privacy. This document explains how we collect, use and protect your personal information when you use our platform.",
        sections: [
          { title: "1. Information We Collect", body: "We collect information you provide directly when creating an account, making a booking or contacting us. This includes name, email address, phone number, payment information and travel preferences." },
          { title: "2. Use of Information", body: "We use your information to manage bookings, personalize your experience, send relevant confirmations and updates, and improve our services. We do not sell your information to third parties." },
          { title: "3. Cookies", body: "We use cookies and similar technologies to improve platform functionality, remember your preferences and analyze traffic. You can control cookie usage from your browser settings." },
          { title: "4. Data Security", body: "We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure or destruction." },
          { title: "5. Your Rights", body: "You have the right to access, correct or delete your personal information at any time from your account settings. You may also request data portability by contacting us directly." },
          { title: "6. Policy Changes", body: "We may update this policy periodically. We will notify you by email of significant changes. Continued use of the platform after updates implies your acceptance." },
          { title: "7. Contact", body: "For privacy-related questions you can write to us at privacy@lavilla.com or use the contact form in the Support section." }
        ]
      },
      terms: {
        badge: "Legal",
        title: "Terms of Service",
        lastUpdated: "Last updated: January 12, 2026",
        intro: "By accessing or using the La Villa platform, you agree to be bound by these Terms of Service. Please read them carefully before making any booking.",
        sections: [
          { title: "1. Acceptance of Terms", body: "By registering or using our services, you confirm that you are at least 18 years old and fully accept these terms. If you disagree, you should not use the platform." },
          { title: "2. Use of the Service", body: "La Villa is a rural and premium accommodation platform in Boyacá. Users can search, browse and book available properties. Use of the platform for fraudulent or illegal purposes is strictly prohibited." },
          { title: "3. Bookings and Payments", body: "Bookings are confirmed only after completing the payment process. Prices include all applicable taxes. We reserve the right to cancel bookings in cases of fraud or pricing errors." },
          { title: "4. Cancellations", body: "Cancellations made more than 7 days in advance will receive a full refund. Cancellations within 7 days may be subject to penalties depending on the selected property." },
          { title: "5. Liability", body: "La Villa acts as an intermediary between guests and properties. We will not be liable for damages or losses occurring during the stay beyond what is stipulated in each booking." },
          { title: "6. Modifications", body: "We reserve the right to modify these terms at any time. Changes will be communicated at least 15 days in advance via the email registered in your account." }
        ]
      },
      support: {
        badge: "Support",
        title: "Help Center",
        subtitle: "We are here to help you at every step of your stay.",
        contactTitle: "Contact channels",
        contactOptions: [
          { icon: "💬", label: "WhatsApp", description: "Immediate response", value: "+57 310 000 0000" },
          { icon: "✉️", label: "Email", description: "Response within 2 hours", value: "hello@lavilla.com" },
          { icon: "📸", label: "Instagram", description: "Direct messages", value: "@lavilla" }
        ],
        faqTitle: "Frequently asked questions",
        faqItems: [
          { question: "How do I make a booking?", answer: "Select a stay, choose your dates and number of guests, then click 'Book now'. You will need to be registered to complete payment." },
          { question: "Can I cancel my booking?", answer: "Yes. You can cancel from 'My trips' in your profile. Cancellations made more than 7 days in advance are completely free." },
          { question: "Is check-in in person?", answer: "Yes, we offer host-guided check-in. You will receive detailed instructions by email and WhatsApp upon confirming your booking." },
          { question: "What does the nightly price include?", answer: "The price includes all services listed in the stay description: bed linen, wifi, basic services and the listed amenities." },
          { question: "Can I bring pets?", answer: "It depends on the property. Each property specifies whether pets are allowed. Please check before booking." }
        ]
      }
    },
    stats: {
      properties: "Properties",
      propertiesValue: "500+",
      destinations: "Destinations",
      destinationsValue: "25",
      satisfaction: "Satisfaction",
      satisfactionValue: "99%",
      owners: "Prestigious Owners",
      ownersValue: "24"
    },
    listings: {
      featuredAccommodations: "Featured Accommodations",
      additionalStays: "More Available Stays",
      noResults: "We couldn't find stays matching those filters",
      perNight: "night"
    },
    catalog: {
      breadcrumb: "Home / Stays in Boyaca",
      title: "Available stays",
      subtitle: "Find and book the perfect stay for your dates",
      showMap: "Show map",
      closeLabel: "Close stays view",
      dateHint: "04/12/24",
      placeholders: {
        destination: "Destinations",
        date: "Date"
      },
      filters: {
        destination: "Destinations",
        date: "Date",
        price: "Price",
        minPrice: "Max price",
        rooms: "Bedrooms",
        serviceOptions: [
          { key: "wifi", label: "Wi-Fi" },
          { key: "pool", label: "Pool" },
          { key: "kitchen", label: "Kitchen" },
          { key: "parking", label: "Parking" }
        ]
      }
    },
    detail: {
      breadcrumbPrefix: "Home",
      entirePlace: "Entire place",
      beds: "5 beds",
      guests: "guests",
      hostTitle: "About this stay",
      perLabel: "per",
      noCharge: "You will not be charged yet",
      duration: "Duration",
      nights: "nights",
      totalBeforeTax: "Total before taxes",
      whatThisPlaceOffers: "What this place offers",
      nightlyRate: "Nightly rate",
      serviceFee: "Service fee",
      selectDates: "Select dates",
      totalLabel: "Total:",
      mapLink: "Show map",
      tabs: ["Details", "Availability", "Reviews", "Location"],
      monthLabel: "May 2024",
      chooseDates: "Pick your dates, book, and enable instant confirmation.",
      contactHost: "Contact host",
      airbnbLink: "Book on Airbnb",
      hostChat: {
        title: "Host chat",
        status: "Online",
        placeholder: "Type a message...",
        sendLabel: "Send message",
        minimizeLabel: "Minimize chat",
        expandLabel: "Expand chat",
        collapseLabel: "Collapse chat",
        hideLabel: "Hide chat",
        showLabel: "Show chat",
        closeLabel: "Close chat",
        youLabel: "(You)",
        testPreviewName: "Test chat",
        testPreviewTime: "7:12",
        testPreviewSnippet: "✓✓ This is how another mini conversation would look.",
        messages: [
          {
            id: "host-1",
            sender: "host",
            text: "Hi, I am Andres. I am here to help with your booking.",
            time: "25min"
          },
          {
            id: "guest-1",
            sender: "guest",
            text: "Hi, I am planning a weekend getaway for two at the end of May.",
            time: "20min"
          },
          {
            id: "host-2",
            sender: "host",
            text: "Great choice, those dates are usually available. I can also share nearby activities.",
            time: "15min"
          }
        ]
      },
      trustTitle: "Your safety is our priority",
      mapPreviewAlt: "Map preview",
      trustItems: ["Your data stays encrypted", "Hosts are verified", "Fraud protection included", "24/7 support"],
      whereYouWillSleep: "Where you'll sleep",
      quickHighlights: ["Entire place", "Spotless cleaning", "Scenic location", "Premium host care"],
      sleepFeatures: [
        { title: "Entire place", description: "You get the full property." },
        { title: "Cozy sleeping scenes", description: "Rest-ready spaces with mountain feel." },
        { title: "Spotless cleaning", description: "Top-rated by recent guests." },
        { title: "Free private parking", description: "Minutes from main access." }
      ],
      listingOverrides: {
        "1": {
          description: "A tranquil cabin by the fjord with mountain views, cozy interiors and private deck.",
          amenities: ["Wifi", "Fireplace", "Lake view", "Kitchen"]
        },
        "2": {
          description: "A bright retreat on the cliff with sea breeze, sunset terrace and minimalist decor.",
          amenities: ["Ocean view", "Breakfast", "Air conditioning", "Pool"]
        },
        "5": {
          description: "Compact studio near the coast with natural light and walkable local neighborhoods.",
          amenities: ["Wifi", "Kitchenette", "Sea breeze balcony", "Self check-in"]
        },
        "3": {
          description: "Modern loft in a quiet area close to temples, cafes and local food spots.",
          amenities: ["Fast wifi", "Balcony", "Workspace", "Washer"]
        },
        "4": {
          description: "Refined loft with premium materials, spacious lounge and elegant city atmosphere.",
          amenities: ["Concierge", "Smart TV", "Chef kitchen", "Premium bedding"]
        }
      }
    },
    footer: {
      description: "Discover handpicked homes personally hosted for calm, memorable stays.",
      supportTitle: "Your stay",
      supportLinks: ["How to book", "Check-in and check-out", "House rules", "Cancellation policy"],
      connectTitle: "Contact",
      connectLinks: ["WhatsApp", "Email", "Instagram", "Location"],
      brandLine: "© 2026 Horizon.",
      rights: "All rights reserved"
    }
  }
};

export const getTranslation = (lang, keys) => {
  return keys.reduce((obj, key) => obj?.[key], translations[lang]);
};
