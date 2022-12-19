const quantity_adultSl = document.getElementById("quantity_adultSl");
const quantity_childSl = document.getElementById("quantity_childSl");
const quantity_adultForeign = document.getElementById("quantity_adultForeign");
const quantity_childForeign = document.getElementById("quantity_childForeign");
const quantity_infant = document.getElementById("quantity_infant");

let adultSl_tkts,childSl_tkts,adultForeign_tkts,childForeign_tkts,infant_tkts;


// function upAll(quant, max){
//   if (parseInt(quant.value) === max) {
//     quant.value = 0;
//   } else {
//     quant.value = parseInt(quant.value) + 1;
//     console.log(quant.value);
//   }
// }

// function up(max){
//  quantity_adultSl.value = updown(quantity_adultSl.value, "up", max);
// }

// function down(min){
//   quantity_adultSl.value = updown(quantity_adultSl.value, "down", min);
// }


function upDownAll(type, upOrdown, val) {
  switch (type) {
    case "adultSl":
      adultSl_tkts = updown(quantity_adultSl.value, upOrdown, val);
      quantity_adultSl.value = adultSl_tkts;
      break;
    case "childSl":
      childSl_tkts = updown(quantity_childSl.value, upOrdown, val);
      quantity_childSl.value = childSl_tkts;
      break;
    case "adultForeign":
      adultForeign_tkts = updown(
        quantity_adultForeign.value,
        upOrdown,
        val
      );
      quantity_adultForeign.value = adultForeign_tkts
      break;
    case "childForeign":
      childForeign_tkts = updown(
        quantity_childForeign.value,
        upOrdown,
        val
      );
      quantity_childForeign.value = childForeign_tkts
      break;
    case "infant":
      infant_tkts = updown(quantity_infant.value, upOrdown, val);
      quantity_infant.value = infant_tkts;
      break;
  }
}

function updown(quant, upOrdown, val) {
  switch (upOrdown) {
    case "up":
      console.log(quant);
      if (parseInt(quant) === val) {
        quant = val;
      } else {
        quant = parseInt(quant) + 1;
        console.log(quant);
      }
      return quant;
    case "down":
      console.log(quant);
      if (parseInt(quant) === val) {
        quant = val;
      } else {
        quant = parseInt(quant) - 1;
        console.log(quant);
      }
      return quant;
  }
}

// function down(min){
//   if (parseInt(quantity.value) === min){
//     quantity.value = 0;
//   }else{
//     quantity.value = parseInt(quantity.value) - 1;
//     console.log(quantity.value);
//   }
// }
