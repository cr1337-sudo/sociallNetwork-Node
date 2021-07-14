alert("Por favor no subas imagenes con mucha calidad, debido a que uso una base de datos gratis la velocidad de subida y bajada es limitada, y con imagenes muy pesadas se daña todo :(")


/* Like */
$('#btn-like').click(function (e) {
   e.preventDefault();
   let imgId = $(this).data('id');
   console.log(imgId)
   $.post('/images/' + imgId + '/like')
      .done(data => {
         console.log(data);
         $(".likes-count").text(data.likes)
      });
});



/* Delete */
$('#btn-delete').click(function (e) {
   e.preventDefault();
   let $this = $(this);
   const response = confirm('Are you sure you want to delete this image?');
   if (response) {
      let imgId = $(this).data('id');
      $.ajax({
         url: '/images/' + imgId,
         type: 'DELETE'
      })
         .done(function (result) {
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            $this.append('<span>Deleted!</span>');
         });
   };
   location.href = "/"
}
);
