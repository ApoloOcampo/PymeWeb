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
          $('#tablaEliminarProductos').append(
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
                    <button type="button" class="btn btn-danger btnEliminarProducto">ELIMINAR</button>
                  </div>
                </td>
            </tr>`)
        })
      }
    })
  };

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
        url: `${API_URL}/producto`,
        type: 'DELETE',
        dataType: 'json',
        data: {
          Id_producto : prod_id
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

//boton CANCELAR EDICION
$("#btnCancelarEditar").click(function () {
  limpiarFormulario();
  $('#btnCancelarEditar').hide();
  $('#btnModificarProducto').hide();
  $('#btnAgregarProducto').show();
});


//entregar ultimo id
ultimoId = () =>{
  let ultimoId = $("#tablaEliminarProductos tr:last th").text();
  let value = parseInt(ultimoId) + 1;
  if (isNaN(value)){
    value=1
  }
  return value;
};

//actualizar
function actualizarTabla() {
  $('#tablaEliminarProductos tbody').empty();
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