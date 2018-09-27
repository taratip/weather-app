
let url = 'https://learnwebcode.github.io/json-example/animals-1.json';

// create multiple rows for array
function createMultipleRows(data) {
  let rowComp = "";
  for (let item of data.likes) {
    rowComp += `<span class="like">Likes:</span> ${item}<br>`;
  }

  for (let item of data.dislikes) {
    rowComp += `<span class="dislike">Dislikes:</span> ${item}<br>`;
  }
  return rowComp;
}

function showAnimals(response) {
  let headers = Object.keys(response[0]);

  // variables to initialize html elements
  let header_html = '<tr><th scope="col">#</th>';
  let row_html = "";

  // create header with the keys
  for (let header of headers) {
    header_html += `<th scope="col">${header}</th>`;
  }
  header_html += "</tr>";

  // create rows with data
  let row = 1;
  for (let data of response) {
    row_html += '<tr>';
    row_html += `<th scope="row">${row}</th>`;
    row_html += `<td>${data.name}</td>`;
    row_html += `<td>${data.species}</td>`;
    row_html += '<td>'
    row_html += createMultipleRows(data.foods);
    row_html += '</td></tr>';
    row += 1;
  }

  $("#table-header").html(header_html);
  $("#table-body").html(row_html);
}

$.get(url, showAnimals);
