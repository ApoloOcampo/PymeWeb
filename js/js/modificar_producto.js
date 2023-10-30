//buscar las promociones en la api
$(document).ready(function() {

    getProductos();
  });

//buscar los productos en la api
  getProductos = () =>{
    $.ajax({
      url: `${API_URL}/producto`,
      type: 'GET',
      dataType: 'json',
      success: function(data){
        $.each(data, function(index,value){
          $('#tablaModificarProducto').append(
            `<tr>
                <th scope="row">${ultimoId()}</th>
                <td> ${value.nombre == null ? "" : value.nombre} 
                                <input type="hidden" name="id_rol" value="${value.id_producto}">
                <td>${value.tipo}</td>
                <td>${value.marca}</td>
                <td>${value.descripcion}</td>
                <td>${value.precio}</td>
                <td>${value.stock}</td>
                <td>${value.volumen}</td>
                <td>${value.imagen}</td>
                <td>
                <button type="button" class="btn btn-success btnEditarProducto">MODIFICAR</button>
              </div>
            </td>
            </tr>`)
        })
      }
    })
  };


//editar producto de la tabla
  $(document).on('click', '.btnEditarProducto', function (e) {
    e.preventDefault();
    // Obtener los datos del producto desde la fila de la tabla
    var producto = $(this).closest('tr').find('td');
    
    var id_producto = producto.eq(0).find('input').val();
    var Nombre = producto.eq(0).text().trim();
    var Tipo = producto.eq(1).text();
    var Marca = producto.eq(2).text();
    var Descripcion = producto.eq(3).text();
    var Precio = producto.eq(4).text();
    var Stock = producto.eq(5).text();
    var Volumen = producto.eq(6).text();
    var Imagen = producto.eq(7).text();

    $("#inputIdProducto").val(id_producto);
    $("#inputNombre").val(Nombre);
    $("#inputTipo").val(Tipo);
    $("#inputMarca").val(Marca);
    $("#inputDescripcion").val(Descripcion);
    $("#inputPrecio").val(Precio);
    $("#inputStock").val(Stock);
    $("#inputVolumen").val(Volumen);
    $("#inputImagen").val(Imagen);

    console.log(id_producto);
    console.log(Nombre);
    console.log(Tipo);
    console.log(Marca);
    console.log(Descripcion);
    console.log(Precio);
    console.log(Stock);
    console.log(Volumen);
    console.log(Imagen);
    
  });
  
  // Botón editar del formulario
  $("#ModificarProducto").click(function (e) {

    // Obtener los datos del formulario
    var idProducto = $("#inputIdProducto").val();
    var Nombre = $("#inputNombre").val();
    var Tipo = $("#inputTipo").val();
    var Marca = $("#inputMarca").val();
    var Descripcion = $("#inputDescripcion").val();
    var Precio = $("#inputPrecio").val();
    var Stock = $("#inputStock").val();
    var Volumen = $("#inputVolumen").val();
    var Imagen = $("#inputImagen").val();


    // Crear el objeto con los datos del usuario
    var ProductoData = {
      Id_producto: idProducto,
      Nombre: Nombre,
      Tipo: Tipo,
      Marca: Marca,
      Descripcion: Descripcion,
      Precio: Precio,
      Stock: Stock,
      Volumen: Volumen,
      Imagen: Imagen
    };

  // Enviar la solicitud de actualización
    $.ajax({
      url: `${API_URL}/producto`,
      type: 'PATCH',
      data: ProductoData,
      success: function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response
        }).then(() => {
            console.log(idProducto);
            console.log(Nombre);
            console.log(Tipo);
            console.log(Marca);
            console.log(Descripcion);
            console.log(Precio);
            console.log(Stock);
            console.log(Volumen);
            console.log(Imagen);
          // Limpiar los campos del formulario
          limpiarFormulario();
          
          actualizarTabla()
        });
      },
      error: function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el producto. Por favor, intenta nuevamente.'
        });
      }
    });
  });

//entregar ultimo id
ultimoId = () =>{
    let ultimoId = $("#tablaModificarProducto tr:last th").text();
    let value = parseInt(ultimoId) + 1;
    if (isNaN(value)){
      value=1
    }
    return value;
  };

//actualizar
  function actualizarTabla() {
    $('#tablaModificarProducto tbody').empty();
    getProductos();
  };


//limpiar formulario
  function limpiarFormulario() {
    $("#inputNombre").val('');
    $("#inputTipo").val('');
    $("#inputMarca").val('');
    $("#inputDescripcion").val('');
    $("#inputPrecio").val('');
    $("#inputStock").val('');
    $("#inputVolumen").val('');
    $("#inputImagen").val('');
  };