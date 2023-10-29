// crear ajax para cargar las cards
$(document).ready(function(){
    $.ajax({
      url: `${API_URL}/producto/sin_alcohol`,
      type: "GET",
      dataType: "json",
      success: function(data){
        console.log(data);
        // recorrer el arreglo de productos
        $.each(data, function(index, value){
          // crear la card
          var card = '<div class="card mb-3 mt-5 mr-3 ml-3" style="width: 18rem;">';
          card += '<img src="' + value.imagen + '" class="card-img-top" alt="..." style="width: 18rem; height: 18rem;">';
          card += '<div class="card-body">';
          card += '<h5 class="card-title"><strong>Nombre:</strong> '+ value.nombre + '</h5>';
          card += '<p class="card-text"><strong>Tipo:</strong> '+ value.tipo +'</p>';
          card += '<p class="card-text"><strong>Marca:</strong> '+ value.marca +'</p>';
          card += '<p class="card-text"><strong>Volumen:</strong> '+ value.volumen +'ml</p>';
          card += '<p class="card-text"><strong>Stock:</strong> '+ value.stock +'</p>';
          card += '<p class="card-text"><strong>Descripción:</strong> '+ value.descripcion +'</p>';
          card += '<h5 class="card-text">Precio: $' + value.precio +'</h5>';
          card += '</div>';
          card += '</div>';
          // agregar la card al contenedor
          $('#tablaProducto').append(card);
        });
      },
      error: function(error){
        console.log(error);
      }
    });
  });
  