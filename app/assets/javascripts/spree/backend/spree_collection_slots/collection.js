$(document).ready(function(){
  $('select.select_shipping_rates').on('change', function(){
    $('.select_collection_slot').hide();
    $('.select_collection_slot_' + $(this).val()).show();
  });

  $('.select_collection_slot').hide();
  $('.select_collection_slot_' + $('select.select_shipping_rates').val()).show();

  $('.toggle_target').on('click', function(){
    if($(this).prop('checked')) {
      $($(this).data('target')).show();
    } else {
      $($(this).data('target')).hide();
    }
  });

  $('[data-hook=admin_shipment_form] a.save-shipment-method').on('click', function (event) {
    event.preventDefault();

    var link = $(this);
    var shipment_number = link.data('shipment-number');
    var selected_shipping_rate_id = link.parents('tbody').find("select#selected_shipping_rate_id[data-shipment-number='" + shipment_number + "']").val();
    var collection_slot_id = link.parents('tbody').find("select#collection_slot_id[data-shipment-number='" + shipment_number + "']:visible").val();
    var unlock = link.parents('tbody').find("input[name='open_adjustment'][data-shipment-number='" + shipment_number + "']:checked").val();
    var url = Spree.url(Spree.routes.shipments_api + '/' + shipment_number + '.json');

    $.ajax({
      type: 'PUT',
      url: url,
      data: {
        shipment: {
          selected_shipping_rate_id: selected_shipping_rate_id,
          collection_slot_id: collection_slot_id,
          unlock: unlock
        },
        token: Spree.api_key
      }
    }).done(function () {
      window.location.reload();
    }).error(function (msg) {
      console.log(msg);
    });
  });

});
