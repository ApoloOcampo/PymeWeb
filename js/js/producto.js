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
          $('#tablaProductos').append(
            `<tr>
                <th scope="row">${ultimoId()}</th>
                <td> ${value.nombre == null ? "" : value.nombre} 
                                <input type="hidden" name="id_rol" value="${value.Id_producto}">
                <td>${value.tipo}</td>
                <td>${value.marca}</td>
                <td>${value.descripcion}</td>
                <td>${value.precio}</td>
                <td>${value.stock}</td>
                <td>${value.volumen}</td>
                <td>${value.imagen}</td>
            </tr>`)
        })
      }
    })
  };



//botones invisibles
  $('#btnCancelarEditar').hide();
  $('#btnModificarProducto').hide();



//funcionalidad para agregar los usuarios a la tabla
  $("#agregarProducto").click(function (e) {
    e.preventDefault();
  
    var Nombre = $("#inputNombre").val();
    var Tipo = $("#inputTipo").val();
    var Marca = $("#inputMarca").val();
    var Descripcion = $("#inputDescripcion").val();
    var Precio = $("#inputPrecio").val();
    var Stock = $("#inputStock").val();
    var Volumen = $("#inputVolumen").val();
    var Imagen = $("#inputImagen").val();
  
    var productoData = {
      Nombre: Nombre,
      Tipo: Tipo,
      Marca: Marca,
      Descripcion: Descripcion,
      Precio: Precio,
      Stock: Stock,
      Volumen: Volumen,
      Imagen: Imagen
    };
  
    $.ajax({
      url: `${API_URL}/producto`,
      type: 'POST',
      //ataType: 'json',
      data: productoData,
      success: function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Producto registrado correctamente.'
        }).then(() => {
          // Limpiar los campos del formulario
          limpiarFormulario();

          // Actualizar la tabla de usuarios
          actualizarTabla();

        });
      },
      error: function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el producto. Por favor, intenta nuevamente.'
        });
      }
    });
  });


//botón BORRAR
  $(document).on("click", ".btnEliminarProducto", function (e) {
    e.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estás seguro que lo quieres eliminar?.',
      text: "El producto se eliminará permanentemente!.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!.',
      cancelButtonText: 'No, Cancelar!.',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        var IdProducto = $(this).closest('tr').find('td');
        var prod_id = IdProducto.eq(0).find('input').val();
        console.log(IdProducto);
        console.log(prod_id);


        $.ajax({
          url: `${API_URL}/AdminProducto`,
          type: 'DELETE',
          dataType: 'json',
          data: {
            ID_PRODUCTOS : prod_id
        },
        success: function(respuesta){
            console.log('Producto Eliminado')
        }
        
    })
        swalWithBootstrapButtons.fire(
          'Producto eliminado!.',
          'presione ok para finalizar.',
          'success'
        )
        actualizarTabla();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado.',
          'El Producto está a salvo! :D .',
          'error'
        )
      }
    })
  });

//editar producto de la tabla
  $(document).on('click', '.btnEditarProducto', function (e) {
    e.preventDefault();
    // Obtener los datos del producto desde la fila de la tabla
    var producto = $(this).closest('tr').find('td');
    
    var idProducto = producto.eq(0).find('input').val();
    var Nombre = producto.eq(0).text().trim();
    var Valor = producto.eq(1).text();
    var Stock = producto.eq(2).text();
    var Promocion = producto.eq(3).find('input').val();
    var Especie = producto.eq(4).find('input').val();
    var Imagen = producto.eq(5).text();

    $("#inputIdProducto").val(idProducto);
    $("#inputNombreProducto").val(Nombre);
    $("#inputValorProducto").val(Valor);
    $("#inputStockProducto").val(Stock);
    $("#inputPromocionProducto").val(Promocion);
    $("#inputEspecieProducto").val(Especie);
    $("#inputImagenProducto").val(Imagen);

    console.log(idProducto);
    console.log(Nombre);
    console.log(Valor);
    console.log(Stock);
    console.log(Promocion);
    console.log(Especie);
    
  // esconder botones 
    $('#btnCancelarEditar').show();
    $('#btnModificarProducto').show();
    $('#btnAgregarProducto').hide();        

  });
  
  // Botón editar del formulario
  $("#btnModificarProducto").click(function (e) {

    // Obtener los datos del formulario
    var idProducto = $("#inputIdProducto").val();
    var Nombre = $("#inputNombreProducto").val();
    var Valor = $("#inputValorProducto").val();
    var Stock = $("#inputStockProducto").val();
    var Imagen = $("#inputImagenProducto").val();
    var Promocion = $("#inputPromocionProducto").val();
    var Especie = $("#inputEspecieProducto").val();


    // Crear el objeto con los datos del usuario
    var ProductoData = {
      ID_PRODUCTOS: idProducto,
      NOMBRE: Nombre,
      VALOR: Valor,
      STOCK: Stock,
      IMAGEN: Imagen,
      PROMOCIONES_ID_PROMOCIONES: Promocion,
      ESPECIES_ID_ESPECIES: Especie
    };

  // Enviar la solicitud de actualización
    $.ajax({
      url: `${API_URL}/AdminProducto`,
      type: 'PATCH',
      data: ProductoData,
      success: function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response
        }).then(() => {
          // Limpiar los campos del formulario
          limpiarFormulario();

          // Actualizar la tabla de producto
          $("#tablaProductos").empty(); // Vaciar la tabla
          getProductos(); // Volver a cargar los usuarios
          // desaparecer botones
          $('#btnCancelarEditar').hide();
          $('#btnModificarProducto').hide();
          $('#btnAgregarProducto').show();
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


//boton CANCELAR EDICION
  $("#btnCancelarEditar").click(function () {
    limpiarFormulario();
    $('#btnCancelarEditar').hide();
    $('#btnModificarProducto').hide();
    $('#btnAgregarProducto').show();
  });


//entregar ultimo id
ultimoId = () =>{
    let ultimoId = $("#tablaProductos tr:last th").text();
    let value = parseInt(ultimoId) + 1;
    if (isNaN(value)){
      value=1
    }
    return value;
  };

//actualizar
  function actualizarTabla() {
    // $('#tablaProductos tbody').empty();
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
  };