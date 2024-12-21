# PROYECTO FINAL FULL STACK 

- Alumna: Vokac Shirley Cristina	
- Email: vokacshirley@gmail.com 


Proyecto desarrollado: Clon de WhatsApp Web. 

LINKS:
Vercel Frontend: https://frontend-whatsapp-git-main-shirley-vokacs-projects.vercel.app/
Vercel Backend: https://backend-whatsapp-five.vercel.app/
Git Hub Frontend: https://github.com/shirley-dw/frontend-whatsapp.git
Git Hub Backend: https://github.com/shirley-dw/backend-whatsapp.git

# Librerías:
react / react-router-dom / react-icons / react-modal 

# Frameworks:
Node.js / Express 

# Dependencias:
bcrypt / cors / dotenv / jsonwebtoken / mongoose / nodemailer

Continuación del proyecto desarrollado para el final de Frontend, agregando el backend funcional del mismo.
Agregados: Registro de nuevo usuario, verificación de email, login, recuperación de contraseña, cierre de sesión,
Función para agregar y eliminar contacto, envió de mensajes.

# Descripcion del proyecto:
· Almacenamiento local con SessionStorage para guardar token de acceso que contiene la información del usuario (access-token, user_id, name), esto permite que solo el usuario que ha iniciado sesión pueda acceder a la pantalla tanto de contactos como de mensajes.

· useState y useEffect para la lógica y los estados de los componentes desarrollados.

· Enrutamiento realizado con react-router-dom y useParams para realizar parámetros de búsqueda.

· Formularios con validaciones en los componentes login y register.

· Middleware en mi backend aplicado a contact.route.js y message.route.js, este valida que el usuario contenga token para permitirle el 
  acceso a los contactos del usuario y los mensajes.

· Seguridad:  Manejo de contraseñas con bcrypt para registro y login, uso de tokens JWT para autenticar el usuario y variables de entorno a través de  .env, utilizado en el backend y el frontend.

· Base de datos seleccionada MongoDB para persistencia de datos

· Proyecto es responsivo desde 280px a 2000px.
