TECNOLOGÍAS:

HTML/BOOTSTRAP/JAVASCRIPT/JQUERY/NODE.JS/EXPRESS


PRUEBA:


🔴🔴🔴  https://social-web-cr1337.herokuapp.com 🔴🔴🔴





🟡 Controllers 🟡

    🟣 Home 🟣
    
    Controlador encargado de renderizar el template de home, pasarle parametros de las imagenes, formulario de subida de 
    imagenes y sidebar (El sidebar es general en toda la pagina)
    
    🟣 Images 🟣
    
        🟠 Index 🟠   
        Encargado de renderizar la imagen a la que se ingresó, muestra los comentarios de la imagen, la sidebar
        y además agrega visualizaciones a la imagen
        
        🟠 Create 🟠        
        Contiene la lógica de la creación del modeo del a foto y la subida al servidor, además despues de subir la imagen 
        se redirige al usuario a esta 
        
        🟠 Like 🟠
        Simplemente se encarga de manejar los likes, el like es simbólico, solo suma cantidades
        
        🟠 Comment 🟠
        Encargado de crear el comentario y mostrarlo en la página de la foto, además de asignar el comentario
        a esa foto en particular
        
        🟠 Remove 🟠
        Lógica detrás de la eliminación de fotos, acompañado de un archivo Javascript con jQuery en el lado del cliente.
        
🟡 Helperes 🟡

    🟣 Image & Stats 🟣
        Son dos archivos js encargados de realizar promesas a la DB que devuelven la cantidad de comentarios, fotos, 
        likes, fotos con más likes, etc y envía todos estos datos a la sidebar
        
      🟣 Sidebar 🟣
          La sidebar que se ve al costado de la web, renderiza todos los datos de image y stats
          
🟡 Models 🟡

    🟣 Comment 🟣
        Modelo que consta de un image_id (que sirve para relacionar el comentario a la imagen), y tambien datos del usuarios tales como:
        Email, nombre y el texto que quiere enviar. Además de agregar un timestamp automático.
        
    🟣 Image 🟣
        Contiene un título y una descripción, un filename con el que se hace referencia al archivo en la DB. Tiene una cantidad de 
        likes que se agregan manualmente y views que se suman cada vez que se ingresa a la imagen. Además de un timestamp 
        
🟡 Public 🟡

    Carpeta con los usuarios estáticos, js, css y la carpeta upload donde se suben todas las imágenes.
    
🟡 Config 🟡

    🟣 Helpers 🟣
        Acá se almacena el helper de hbs utilizado para mostrar el tiempo de publicado de una imagen en ese formato.

