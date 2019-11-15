$(document).on('click','.mod_row',function(event) {
  var row = $(this).parents('tr');
  var td0 = row.find('td').eq(0);
  var td1 = row.find('td').eq(1);
  var td2 = row.find('td').eq(2);
  var td0_string = td0.text();
  var td1_string = td1.text();
  var td2_string = td2.text();
  // var td3_string = $(this).parents('tr').find('td').eq(3).text();  //이렇게 사용할수도있다
  var input_tag0 = $('<input type="text" />');
  td0.html(input_tag0);
  input_tag0.val(td0_string);
  var input_tag1 = $('<input type="text" />');
  td1.html(input_tag1);
  input_tag1.val(td1_string);
  var input_tag2 = $('<input type="text" />');
  td2.html(input_tag2);
  input_tag2.val(td2_string);

  var td3 = $(this).parents('tr').find('td').eq(3);
  // var td3 = $(this).parents('tr').find('.mod_row').parents('td')
  td3.find('.mod_row').hide();
  td3.find('.mod_done').show();

})
