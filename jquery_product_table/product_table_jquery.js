var array_table = [
  {
    sku: 101,
    name: "Product 101",
    price: "150",
    quantity: 50,
  },
  {
    sku: 102,
    name: "Product 102",
    price: "100",
    quantity: 20,
  },
];
var index;
$(document).ready(function () {
  // alert("ready");
  $(".success").hide();
  $(".error").hide();
  print_array();
  // console.table(array_table);
  $("input[type=text]").on("keyup", function () {
    field_color();
  });
  $("#add_product").on("click", add_product);
  $("#product_list").on("click", ".edit", edit_array_table);
  $("#product_list").on("click", ".delete", delete_array_table);
  $(".close").on("click", function () {
    $(this).closest("div").hide();
  });
});

function edit_array_table() {
  // alert("edit");
  var edit_product_sku_value = $(this).closest("tr").children().eq(0).text();
  // alert(edit_product_sku_value);
  index = find_index(edit_product_sku_value);
  // alert(index);
  $("input[name = product_sku]").val(array_table[index].sku);
  $("input[name = product_name]").val(array_table[index].name);
  $("input[name = product_price]").val(array_table[index].price);
  $("input[name = product_quantity]").val(array_table[index].quantity);
  $("#add_product").val("Update");
  $("#add_product").off("click");
  $("#add_product").on("click", update_array_table);
}

function update_array_table() {
  // alert("update");
  //    alert(index);
  array_table[index].sku = $("input[name = product_sku]").val();
  array_table[index].name = $("input[name = product_name]").val();
  array_table[index].price = $("input[name = product_price]").val();
  array_table[index].quantity = $("input[name = product_quantity]").val();
  if (check_input()) {
    print_array();
    $(".success").show();
    $(".error").hide();
    $("#add_product").val("Add Product");
    $("#add_product").off("click");
    $("#add_product").on("click", add_product);
  } else {
    $(".error").show();
    $(".success").hide();
    $("#add_product").on("click", update_array_table);
  }
}

function find_index(value) {
  // alert(value);
  for (var i = 0; i < array_table.length; i++) {
    if (array_table[i].sku == value) return i;
  }
}

function delete_array_table() {
  // alert('delete');
  var warning = confirm("are you sure you want to delete this?");
  if (warning) {
    var To_delete_row = $(this).closest("tr").children().eq(0).text();
    // alert(To_delete_row);
    var delete_index = find_index(To_delete_row);
    array_table.splice(delete_index, 1);
    print_array();
  }
}

function add_product() {
  // alert("add_product");
  if (check_input()) {
    var product_sku = $("input[name = product_sku]").val();
    // alert(product_sku);
    var product_name = $("input[name = product_name]").val();
    var product_price = $("input[name = product_price]").val();
    var product_quantity = $("input[name = product_quantity]").val();

    var array_product = {
      sku: product_sku,
      name: product_name,
      price: product_price,
      quantity: product_quantity,
    };
    array_table.push(array_product);
    print_array();
    $(".success").show();
    $(".error").hide();
  } else {
    $(".error").show();
    $(".success").hide();
  }
}

// function field_color(){

// }

function closeit() {
  $(".error").hide();
}
function change(){
  $(".error").hide();
  $(".success").hide();
}

function check_input() {
  let sku = $("#product_sku").val();
  let name = $("#product_name").val();
  let price = $("#product_price").val();
  let quantity = $("#product_quantity").val();
  if (sku == "" || isNaN(sku)) {
    if (sku == "") {
      $(".error").html(
        `SKu field is empty<a onClick=closeit() href="#" class="close">X</a>`
      );
    } else
      $(".error").html(
        `SKU field should be an integer<a onClick=closeit() href="#" class="close">X</a>`
      );
    // $("#product_sku").focus();
    $("#product_sku").css("border", "2px solid red");
    return false;
  } else if (sku != "" && !isNaN(sku)) {
    $("#product_sku").css("border", "1px solid black");
  }
  if (name == "" || !isNaN(name)) {
    if (name == "")
      $(".error").html(
        `Name field is empty<a onClick=closeit() href="#" class="close">X</a>`
      );
    else
      $(".error").html(
        `Name field should be string<a onClick=closeit() href="#" class="close">X</a>`
      );
    $("#product_name").css("border", "2px solid red");
    return false;
  } else if (name != "" && isNaN(name)) {
    $("#product_name").css("border", "1px solid black");
  }

  if (price == "" || isNaN(price)) {
    if (price == "")
      $(".error").html(
        `Price field is empty<a onClick=closeit() href="#" class="close">X</a>`
      );
    else
      $(".error").html(
        `Price field should be an integer<a onClick=closeit() href="#" class="close">X</a>`
      );
    $("#product_price").css("border", "2px solid red");
    return false;
  } else if (price != "" && !isNaN(price)) {
    $("#product_price").css("border", "1px solid black");
  }

  if (quantity == "" || isNaN(quantity)) {
    if (quantity == "")
      $(".error").html(
        `Quantity field is empty<a onClick=closeit() href="#" class="close">X</a>`
      );
    else
      $(".error").html(
        `Quantity field should be an integer<a onClick=closeit() href="#" class="close">X</a>`
      );
    $("#product_Quantity").css("border", "2px solid red");
    return false;
  } else if (quantity != "" && !isNaN(quantity)) {
    $("#product_quantity").css("border", "1px solid black");
  }
  return true;
}

function print_array() {
  var text = "<table>";
  text += "<tr>";
  text += "<th>SKU</th>";
  text += "<th>Name</th>";
  text += "<th>Price</th>";
  text += "<th>Quantity</th>";
  text += "<th>Action</th>";
  text += "</tr>";
  for (var i = 0; i < array_table.length; i++) {
    text += "<tr>";

    text += "<td>" + array_table[i].sku + "</td>";
    text += "<td>" + array_table[i].name + "</td>";
    text += "<td>$" + array_table[i].price + "</td>";
    text += "<td>" + array_table[i].quantity + "</td>";
    text +=
      '<td><a href="#" class="edit">Edit</a><a href="#" class="delete">Delete</a></td>';
    text += "</tr>";
  }
  text += "</table>";
  // console.table(text);
  $("#product_list").html(text);
}
