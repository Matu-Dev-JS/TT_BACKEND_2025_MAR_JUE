RESUELTO: 
Consigna:  
Necesito que crees la clase ChannelRepository que tendra un metodo asincrono (con async y await) llamado create que recibira el id del workspace y el nombre del canal como parametro y lo guardara en la coleccion de canales, para eso usaremos el model Channel

---

Consigna: 
Necesito que crees una clase llamada ChannelService que tenga un metodo asincrono llamdo create que reciba el id del workspace ( va a validar que este exista, sino lanzara un error con mensaje ('Workspace not found'), status 404). Tambien recibira el nombre del canal como parametro y vamos a instanciar el metodo create de ChannelRepository para crear el canal.

---

Consigna: Crea un metodo en ChannelRepository que se llame findByName que reciba el nombre del canal como parametro y el id del workspace y lo busque en la coleccion de canales y lo devuelva.

---

Consigna: Mejora el metodo create en ChannelService para que cumpla con la validacion de nombre (debe ser string con menos de 12 caracteres) y que no sea un nombre repetido. Para checkear si un canal ya existe usaremos el metodo findByName de ChannelRepository