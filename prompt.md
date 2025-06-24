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

---

Consigna: 
Crear un middleware llamado workspaceMiddleware, va a validar que el workspace exista a partir de el parametro de busqueda 'workspace_id', para verificar esto llamara a findById de WorkspaceRepository y si no lo encuentra lanzara un error con status 404 y mensaje ('Workspace not found'). Si lo encuentra validara que el id del cliente (lo podra buscar en request.user) es el id del un miembro del workspace, sino lanzara un error con status 403 y mensaje ('You are not a member of this workspace'). Para saber si un usuario es miembro del workspace se llamara al metodo getMemberByUserIdAndWorkspaceId de WorkspaceRepository y en caso de todo estar bien guardaremos el workspace seleccionado en la propiedad workspace de request.

---

Consigna:
Crear un middleware llamado channelMiddleware, que validara que el channel exista a partir de el parametro de busqueda 'channel_id', para verificar si existe podes usar al metodo findById de channel_repository, si no encuetra el canal deberas lazar un error 404 con mensaje 'Channel not found'.
Tambien validara que ese channel_id sea parte del workspace de la request y si no lo es lanzara un error 403 con mensaje 'This channel is not part of this workspace'.
En caso de estar todo OK, guardara el channel seleccionado en la propiedad channel de request.


